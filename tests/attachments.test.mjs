import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID, createHash } from 'node:crypto';
import policy from '../.enquiry-tests/lib/attachments/policy.js';
import content from '../.enquiry-tests/lib/attachments/content.js';
import security from '../.enquiry-tests/lib/attachments/security.js';
import services from '../.enquiry-tests/lib/attachments/service.js';
import http from '../.enquiry-tests/lib/attachments/http.js';
import scanner from '../.enquiry-tests/lib/attachments/scanner.js';
import enquiries from '../.enquiry-tests/lib/enquiries/server.js';
import client from '../.enquiry-tests/lib/attachments/client.js';
import { MemoryStore, png, pdf, env } from './attachment-helpers.mjs';
const { validateManifest, sanitizeFilename, MAX_TOTAL_BYTES, DAY, RETENTION, AttachmentError } = policy;
const { AttachmentService, parseReference } = services;
const { hash, createOwner, ownerFromRequest, readCapability, signCapability, attachmentsAvailable } = security;
const { handleAttachment } = http;
const descriptor = (bytes=png(),name='design.png',contentType='image/png') => ({name,size:bytes.length,contentType});
function fixture(scan) {
  const store=new MemoryStore(); let clock=1_800_000_000_000; let scans=0;
  const service=new AttachmentService(store, scan??(async bytes=>{scans++;return {id:'scan-verified',digest:hash(bytes)};}),()=>clock);
  return {store,service,get scans(){return scans;},now:()=>clock,advance:ms=>{clock+=ms;}};
}
async function uploaded(f=fixture(), descriptions=[descriptor()]) {
  const status=await f.service.create(descriptions,'owner');
  const stored=await f.store.load(status.sessionId);
  for(const file of stored.value.files) await f.store.putFile(file.uploadPath,file.contentType==='image/png'?png():pdf(),file.contentType);
  return {...f,status,ref:{sessionId:status.sessionId,fileIds:status.files.map(file=>file.id)}};
}
async function verified(f=fixture()) {
  const setup=await uploaded(f);
  for(const file of setup.status.files) await f.service.verify(setup.status.sessionId,file.id,'owner');
  return setup;
}
function request(action,body,headers={}) {return new Request('https://example.com/api/enquiries/attachments/'+action,{method:'POST',headers:{origin:'https://example.com','content-type':'application/json',...headers},body:JSON.stringify(body)});}
const deps=f=>({env,store:f.store,scan:async bytes=>({id:'scan',digest:hash(bytes)}),rateLimit:async()=>false,now:f.now,uploadUrl:async()=> 'https://private.invalid/signed-upload',downloadUrl:async()=> 'https://private.invalid/signed-download'});
const throwsStatus = status => error => error instanceof AttachmentError && error.status===status;

test('policy accepts PDF/PNG, sanitizes metadata and enforces exact total/count boundaries',()=>{
  assert.equal(validateManifest([descriptor(),descriptor(pdf(),'brief.pdf','application/pdf')]).length,2);
  assert.equal(sanitizeFilename('  design<one>.png  '),'design_one_.png');
  assert.equal(validateManifest([{name:'x.pdf',contentType:'application/pdf',size:MAX_TOTAL_BYTES}])[0].size,MAX_TOTAL_BYTES);
  for(const input of [[],Array.from({length:6},()=>descriptor()),[{...descriptor(),size:0}],[{...descriptor(),size:MAX_TOTAL_BYTES+1}],[{...descriptor(),size:MAX_TOTAL_BYTES},descriptor()],[descriptor(png(),'x.zip','application/zip')],[descriptor(png(),'x.pdf')],[{...descriptor(),name:'../private.png'}],[{...descriptor(),name:'a／b.png'}],[{...descriptor(),name:'x\n.png'}],[{...descriptor(),size:1.5}]]) assert.throws(()=>validateManifest(input));
});
test('content checks reject spoofed, corrupted, encrypted or active documents',()=>{
  content.validateContent(png(),'image/png');content.validateContent(pdf(),'application/pdf');
  const corrupted=png();corrupted[40]^=1;
  for(const [bytes,type] of [[Buffer.from('not PNG'),'image/png'],[corrupted,'image/png'],[Buffer.concat([png(),Buffer.from('trailing script')]),'image/png'],[Buffer.from('%PDF-1.4\ninvalid'),'application/pdf'],[Buffer.from(pdf().toString().replace('trailer','/Encrypt trailer')),'application/pdf'],[Buffer.from(pdf().toString().replace('trailer','/JavaScript trailer')),'application/pdf']])assert.throws(()=>content.validateContent(bytes,type));
});
test('availability is server controlled and fails closed for scanner, storage pin and cleanup config',async()=>{
  assert.equal(attachmentsAvailable(env),true);
  for(const change of [{ATTACHMENTS_ENABLED:'false'},{SCANII_API_KEY:''},{SCANII_REGION:'unknown'},{ATTACHMENT_EXPECTED_STORE_ID:'other'},{VERCEL_OIDC_TOKEN:''},{CRON_SECRET:''},{ATTACHMENT_BASE_URL:'http://example.com'}]) {
    assert.equal(attachmentsAvailable({...env,...change}),false);
    const f=fixture();const r=await handleAttachment(request('sessions',{files:[descriptor()],website:''}),'session',{...deps(f),env:{...env,...change}});
    assert.equal(r.status,503);assert.equal(f.store.sessionsMap.size,0);
  }
});
test('owner capabilities reject forgery, expiry and different purposes',()=>{
  const now=1_800_000_000_000;const owner=createOwner(env,now);const cookie=owner.cookie.split(';')[0];
  const req=request('status',{}, {cookie});assert.equal(ownerFromRequest(req,env,now),owner.ownerHash);
  assert.throws(()=>ownerFromRequest(req,env,now+DAY));
  const token=cookie.split('=')[1];assert.throws(()=>readCapability(token+'x','owner',env,now));assert.throws(()=>readCapability(token,'download',env,now));
});
test('HTTP session creation uses HttpOnly owner cookie and never returns storage paths or credentials',async()=>{
  const f=fixture();const r=await handleAttachment(request('sessions',{files:[descriptor()],website:''}),'session',deps(f));
  assert.equal(r.status,201);assert.match(r.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Strict/);
  const text=await r.text();for(const value of ['uploadPath','cleanPath',env.VERCEL_OIDC_TOKEN,env.ATTACHMENT_UPLOAD_SIGNING_SECRET])assert.ok(!text.includes(value));
  const s=JSON.parse(text);const unauthorized=await handleAttachment(request('upload',{sessionId:s.sessionId,fileId:s.files[0].id}),'upload',deps(f));assert.equal(unauthorized.status,403);
});
test('HTTP origin, honeypot, unknown fields and platform protection reject unsafe session creation',async()=>{
  for(const [body,headers,overrides,expected] of [[{files:[descriptor()],website:'bot'}, {}, {},403],[{files:[descriptor()],website:'',pathname:'arbitrary'}, {}, {},400],[{files:[descriptor()],website:''},{origin:'https://evil.invalid'},{},403],[{files:[descriptor()],website:''},{},{rateLimit:async()=>true},429],[{files:[descriptor()],website:''},{},{rateLimit:async()=>{throw Error();}},503]]){
    const f=fixture();assert.equal((await handleAttachment(request('sessions',body,headers),'session',{...deps(f),...overrides})).status,expected);assert.equal(f.store.sessionsMap.size,0);
  }
});
test('HTTP upload authorization is session owned and cannot select another path or operation',async()=>{
  const f=fixture();const created=await handleAttachment(request('sessions',{files:[descriptor()],website:''}),'session',deps(f));const cookie=created.headers.get('set-cookie').split(';')[0];const s=await created.json();
  const body={sessionId:s.sessionId,fileId:s.files[0].id};
  assert.equal((await handleAttachment(request('upload',body,{cookie}),'upload',deps(f))).status,200);
  for(const extra of [{pathname:'other'},{operation:'get'},{access:'public'}])assert.equal((await handleAttachment(request('upload',{...body,...extra},{cookie}),'upload',deps(f))).status,400);
  const other=createOwner(env,f.now()).cookie.split(';')[0];assert.equal((await handleAttachment(request('upload',body,{cookie:other}),'upload',deps(f))).status,403);
});
test('sessions reserve randomized immutable paths and enforce expiry and exact membership',async()=>{
  const f=fixture();const s=await f.service.create([descriptor()],'owner');const row=await f.store.load(s.sessionId);const file=row.value.files[0];
  assert.ok(!file.uploadPath.includes(file.name));assert.notEqual(file.cleanPath,file.uploadPath);
  await assert.rejects(f.service.upload(s.sessionId,randomUUID(),'owner'),throwsStatus(403));
  await assert.rejects(f.service.upload(s.sessionId,file.id,'other'),throwsStatus(403));
  f.advance(DAY);await assert.rejects(f.service.upload(s.sessionId,file.id,'owner'),throwsStatus(410));
});
test('interrupted uploads remain pending; completed uploads are reused without overwriting',async()=>{
  const f=fixture();const s=await f.service.create([descriptor()],'owner');const file=(await f.store.load(s.sessionId)).value.files[0];
  assert.equal((await f.service.upload(s.sessionId,file.id,'owner')).uploaded,false);
  await assert.rejects(f.service.verify(s.sessionId,file.id,'owner'),throwsStatus(404));
  assert.equal((await f.store.load(s.sessionId)).value.files[0].status,'pending');
  await f.store.putFile(file.uploadPath,png(),'image/png');
  assert.equal((await f.service.upload(s.sessionId,file.id,'owner')).uploaded,true);
  await assert.rejects(f.store.putFile(file.uploadPath,png(),'image/png'),throwsStatus(409));
});
test('actual stored size and type mismatches are rejected and promptly deleted',async()=>{
  for(const [bytes,type] of [[Buffer.from('wrong'),'image/png'],[png(),'text/html']]){
    const f=fixture();const s=await f.service.create([descriptor()],'owner');const file=(await f.store.load(s.sessionId)).value.files[0];await f.store.putFile(file.uploadPath,bytes,type);
    await assert.rejects(f.service.verify(s.sessionId,file.id,'owner'));
    assert.equal((await f.store.load(s.sessionId)).value.files[0].status,'rejected');assert.equal(f.store.objects.size,0);
  }
});
test('scan success publishes only scanned bytes; later source mutation cannot change verified content',async()=>{
  const f=fixture(async bytes=>{for(const file of f.store.objects.values())file.bytes=Buffer.from('changed quarantine bytes');return {id:'scan',digest:hash(bytes)};});
  const setup=await uploaded(f);await f.service.verify(setup.status.sessionId,setup.status.files[0].id,'owner');const file=(await f.store.load(setup.status.sessionId)).value.files[0];
  assert.equal(file.status,'ready');assert.deepEqual((await f.store.read(file.cleanPath,file.size)).bytes,png());assert.equal(file.verified.digest,hash(png()));
});
test('malware findings reject/delete; unavailable scans remain quarantined and cannot be submitted',async()=>{
  for(const status of [422,503]){
    const f=fixture(async()=>{throw new AttachmentError('mock scanner outcome',status);});const setup=await uploaded(f);
    await assert.rejects(f.service.verify(setup.status.sessionId,setup.status.files[0].id,'owner'),throwsStatus(status));
    const s=(await f.store.load(setup.status.sessionId)).value;assert.equal(s.files[0].status,status===422?'rejected':'pending');assert.equal(f.store.objects.has(s.files[0].cleanPath),false);
    await assert.rejects(f.service.claim(setup.ref,'owner',randomUUID(),'digest'),throwsStatus(409));
  }
});
test('scanner digest mismatch never approves a file; clean files do not require duplicate scans',async()=>{
  const f=fixture(async()=>({id:'bad',digest:'0'.repeat(64)}));const s=await uploaded(f);await assert.rejects(f.service.verify(s.status.sessionId,s.status.files[0].id,'owner'),throwsStatus(503));
  const good=fixture();const ready=await uploaded(good);await good.service.verify(ready.status.sessionId,ready.status.files[0].id,'owner');await good.service.verify(ready.status.sessionId,ready.status.files[0].id,'owner');assert.equal(good.scans,1);
});
test('scan leases serialize concurrent verification and block cleanup while work is active',async()=>{
  let release;const gate=new Promise(resolve=>{release=resolve;});const f=fixture(async bytes=>{await gate;return{id:'scan',digest:hash(bytes)};});const s=await uploaded(f);
  const first=f.service.verify(s.status.sessionId,s.status.files[0].id,'owner');
  await new Promise(resolve=>setImmediate(resolve));
  await assert.rejects(f.service.verify(s.status.sessionId,s.status.files[0].id,'owner'),throwsStatus(409));
  release();await first;
});
test('forged, duplicated, foreign-session and reused references fail',async()=>{
  const f=fixture();const s=await verified(f);const other=await f.service.create([descriptor()],'owner');
  for(const ref of [{...s.ref,fileIds:[s.ref.fileIds[0],s.ref.fileIds[0]]},{...s.ref,fileIds:[randomUUID()]},{sessionId:other.sessionId,fileIds:s.ref.fileIds},{...s.ref,pathname:'arbitrary'}])await assert.rejects(f.service.claim(ref,'owner',randomUUID(),'digest'));
  assert.throws(()=>parseReference({sessionId:'../secret',fileIds:[]}));
  await assert.rejects(f.service.claim(s.ref,'other',randomUUID(),'digest'),throwsStatus(403));
  const id=randomUUID();await f.service.claim(s.ref,'owner',id,'digest');
  await assert.rejects(f.service.claim(s.ref,'owner',id,'digest'),throwsStatus(409));
  await f.service.finish(s.status.sessionId,id);
  await assert.rejects(f.service.claim(s.ref,'owner',randomUUID(),'digest'),throwsStatus(409));
  await assert.rejects(f.service.claim(s.ref,'owner',id,'changed'),throwsStatus(409));
});
test('submission failures permit same-attempt retries; acceptance is idempotent',async()=>{
  const f=fixture();const s=await verified(f);const id=randomUUID();
  await f.service.claim(s.ref,'owner',id,'digest');await f.service.finish(s.status.sessionId,id);
  assert.equal((await f.service.claim(s.ref,'owner',id,'digest')).alreadyAccepted,false);
  await f.service.finish(s.status.sessionId,id,'provider-id');assert.equal((await f.service.claim(s.ref,'owner',id,'digest')).alreadyAccepted,true);
});
test('modified verified objects invalidate submission and downloads',async()=>{
  const f=fixture();const s=await verified(f);const file=(await f.store.load(s.status.sessionId)).value.files[0];f.store.objects.get(file.cleanPath).etag='modified';
  await assert.rejects(f.service.claim(s.ref,'owner',randomUUID(),'digest'),throwsStatus(409));
});
test('download bearer links are enquiry scoped, expire in seven days and reject path manipulation',async()=>{
  const f=fixture();const s=await verified(f);const id=randomUUID();const claim=await f.service.claim(s.ref,'owner',id,'digest');const link=f.service.businessLink(claim.session,env);const token=new URL(link).hash.slice('#access='.length);
  await assert.rejects(f.service.downloadAccess(token,undefined,env),throwsStatus(403));
  await f.service.finish(s.status.sessionId,id,'provider');
  assert.equal((await f.service.downloadAccess(token,undefined,env)).files[0].name,'design.png');
  assert.ok((await f.service.downloadAccess(token,s.ref.fileIds[0],env)).file);
  await assert.rejects(f.service.downloadAccess(token,'../private',env),throwsStatus(403));
  await assert.rejects(f.service.downloadAccess(token+'x',undefined,env),throwsStatus(403));
  const foreign=signCapability({kind:'download',sessionId:s.status.sessionId,submissionId:randomUUID(),exp:claim.session.submission.accessExpires},env);await assert.rejects(f.service.downloadAccess(foreign,undefined,env),throwsStatus(403));
  const file=(await f.store.load(s.status.sessionId)).value.files[0];f.store.objects.get(file.cleanPath).etag='changed';await assert.rejects(f.service.downloadAccess(token,file.id,env),throwsStatus(409));
  f.advance(7*DAY);await assert.rejects(f.service.downloadAccess(token,undefined,env),throwsStatus(403));
});
test('cleanup deletes abandoned uploads after 24h and accepted files after 30d, preserving unrelated data',async()=>{
  const f=fixture();const abandoned=await uploaded(f);await f.store.putFile('unrelated-private-file',Buffer.from('keep'),'text/plain');
  assert.equal((await f.service.cleanup()).removed,0);f.advance(DAY);assert.equal((await f.service.cleanup()).removed,1);assert.equal(await f.store.load(abandoned.status.sessionId),null);assert.equal(f.store.objects.size,1);
  const accepted=await verified(f);const id=randomUUID();await f.service.claim(accepted.ref,'owner',id,'digest');await f.service.finish(accepted.status.sessionId,id,'provider');f.advance(RETENTION-1);assert.equal((await f.service.cleanup()).removed,0);f.advance(1);assert.equal((await f.service.cleanup()).removed,1);assert.equal(f.store.objects.size,1);
});
test('cleanup failures preserve a deleting manifest for retry and never delete a manipulated path',async()=>{
  const f=fixture();const s=await uploaded(f);f.advance(DAY);f.store.failDelete=true;
  const original=console.error;const events=[];console.error=(...args)=>events.push(args);
  try {assert.equal((await f.service.cleanup()).failed,1);} finally {console.error=original;}
  assert.equal((await f.store.load(s.status.sessionId)).value.state,'deleting');assert.equal(events[0][0],'attachment_cleanup_failed');
  f.store.failDelete=false;assert.equal((await f.service.cleanup()).removed,1);
  const bad=await f.service.create([descriptor()],'owner');const row=f.store.sessionsMap.get(bad.sessionId);row.value.files[0].uploadPath='production/other-file';f.advance(DAY);
  console.error=()=>{};try{assert.equal((await f.service.cleanup()).failed,1);}finally{console.error=original;}assert.ok(!f.store.deletes.includes('production/other-file'));
});
test('cleanup requires authenticated execution even when feature is disabled',async()=>{
  const f=fixture();const req=new Request('https://example.com/api/internal/attachments/cleanup');assert.equal((await handleAttachment(req,'cleanup',deps(f))).status,401);
  const authorized=new Request(req,{headers:{authorization:'Bearer '+env.CRON_SECRET}});assert.equal((await handleAttachment(authorized,'cleanup',{...deps(f),env:{...env,ATTACHMENTS_ENABLED:'false'}})).status,200);
});
test('Scanii verifies real response checksum, length, type and findings; transport never receives original filename',async()=>{
  const bytes=png();let calls=0;
  const clean={id:'provider-result',checksum:createHash('sha1').update(bytes).digest('hex'),content_length:bytes.length,content_type:'image/png',findings:[]};
  const result=await scanner.scaniiScanner(env,async(url,options)=>{calls++;assert.equal(url,'https://api-eu1.scanii.com/v2.2/files');assert.equal(options.redirect,'error');assert.equal(options.body.get('file').name,'upload.png');return Response.json(clean);})(bytes,'image/png');assert.equal(result.digest,hash(bytes));assert.equal(calls,1);
  for(const response of [{...clean,checksum:'wrong'},{...clean,content_length:bytes.length+1},{...clean,content_type:'text/html'},{...clean,findings:null},{}])await assert.rejects(scanner.scaniiScanner(env,async()=>Response.json(response))(bytes,'image/png'),throwsStatus(503));
  await assert.rejects(scanner.scaniiScanner(env,async()=>Response.json({...clean,findings:['malware']}))(bytes,'image/png'),throwsStatus(422));
  for(const transport of [async()=>new Response('',{status:503}),async()=>{throw new Error('network');}])await assert.rejects(scanner.scaniiScanner(env,transport)(bytes,'image/png'),throwsStatus(503));
  await assert.rejects(scanner.scaniiScanner({...env,SCANII_API_KEY:''})(bytes,'image/png'),throwsStatus(503));
});
test('enquiry API includes only verified attachments and preserves recipient, Reply-To and idempotency',async()=>{
  const f=fixture();const s=await verified(f);let sends=0;
  const payload={source:'Request a Quote',fullName:'Buyer',companyName:'Brand',businessEmail:'buyer@example.com',territory:'UK',website:'',submissionId:randomUUID(),attachments:s.ref};
  const factory=()=>({service:f.service,owner:'owner',digest:value=>hash(JSON.stringify(value))});
  const requestEnquiry=()=>new Request('https://example.com/api/enquiries',{method:'POST',headers:{origin:'https://example.com','content-type':'application/json'},body:JSON.stringify(payload)});
  const options={env,rateLimit:async()=>false,attachmentsFactory:factory,fetch:async(_,options)=>{sends++;const body=JSON.parse(options.body);assert.equal(body.reply_to,payload.businessEmail);assert.deepEqual(body.to,[env.ENQUIRY_TO_EMAIL]);assert.match(body.text,/design.png/);assert.match(body.text,/#access=/);return Response.json({id:'mock-email'});}};
  assert.equal((await enquiries.handleEnquiry(requestEnquiry(),options)).status,200);assert.equal((await enquiries.handleEnquiry(requestEnquiry(),options)).status,200);assert.equal(sends,1);
});
test('provider failure preserves attachments for retry; disabled attachments do not break email-only enquiries',async()=>{
  const f=fixture();const s=await verified(f);const body={source:'Request a Quote',fullName:'Buyer',companyName:'Brand',businessEmail:'buyer@example.com',territory:'UK',website:'',submissionId:randomUUID(),attachments:s.ref};
  const req=()=>new Request('https://example.com/api/enquiries',{method:'POST',headers:{origin:'https://example.com','content-type':'application/json'},body:JSON.stringify(body)});
  const dependencies={env,rateLimit:async()=>false,attachmentsFactory:()=>({service:f.service,owner:'owner',digest:value=>hash(JSON.stringify(value))})};
  assert.equal((await enquiries.handleEnquiry(req(),{...dependencies,fetch:async()=>new Response('',{status:503})})).status,502);
  assert.ok((await f.store.load(s.status.sessionId)).value.files.every(file=>file.status==='ready'));
  assert.equal((await enquiries.handleEnquiry(req(),{...dependencies,fetch:async()=>Response.json({id:'accepted'})})).status,200);
  delete body.attachments;let calls=0;const response=await enquiries.handleEnquiry(req(),{env:{...env,ATTACHMENTS_ENABLED:'false'},rateLimit:async()=>false,attachmentsFactory:()=>{throw Error('must not access storage');},fetch:async()=>{calls++;return Response.json({id:'email-only'});}});assert.equal(response.status,200);assert.equal(calls,1);
});
test('client upload reports progress and failures without automatic duplicate PUTs',async()=>{
  const file=new File([png()],'design.png',{type:'image/png'});let sent=0;const progress=[];
  const fake=mode=>({upload:{},open(method){assert.equal(method,'PUT');},setRequestHeader(key,value){assert.equal(key,'Content-Type');assert.equal(value,'image/png');},status:mode==='success'?200:503,send(){sent++;queueMicrotask(()=>{this.upload.onprogress({lengthComputable:true,loaded:1,total:2});if(mode==='network')this.onerror();else if(mode==='timeout')this.ontimeout();else this.onload();});},abort(){this.onabort();}});
  await client.uploadFile('https://private.invalid/upload',file,n=>progress.push(n),undefined,()=>fake('success'));assert.deepEqual(progress,[50]);
  for(const mode of ['http','network','timeout'])await assert.rejects(client.uploadFile('https://private.invalid/upload',file,()=>{},undefined,()=>fake(mode)));
  assert.equal(sent,4);
  const cancelled=new AbortController();cancelled.abort();await assert.rejects(client.uploadFile('https://private.invalid/upload',file,()=>{},cancelled.signal,()=>fake('success')));assert.equal(sent,4);
});

test('customer Blob adapter pins refreshed OIDC, exact private PUT restrictions and five-minute read-only downloads',async()=>{
  const {default:adapter}=await import('../.enquiry-tests/lib/attachments/blob-store.js');
  const issued=[];const signed=[];const sdk={oidc:async()=> 'refreshed-mock-oidc',issue:async options=>{issued.push(options);return{delegationToken:'mock',clientSigningToken:'private-mock',validUntil:options.validUntil};},presign:async(token,options)=>{signed.push(options);return{presignedUrl:'https://mock.private.blob.vercel-storage.com/file?signature=mock'};}};
  const file={uploadPath:'attachments/v2/quarantine/'+randomUUID()+'/'+randomUUID()+'.png',size:png().length,contentType:'image/png'};
  const now=Date.now();await adapter.privateUploadUrl(file,now+DAY,env,sdk);
  assert.deepEqual(issued[0].operations,['put']);assert.equal(issued[0].pathname,file.uploadPath);assert.equal(issued[0].maximumSizeInBytes,file.size);assert.equal(issued[0].oidcToken,'refreshed-mock-oidc');assert.equal(issued[0].token,undefined);
  assert.equal(signed[0].access,'private');assert.equal(signed[0].allowOverwrite,false);assert.equal(signed[0].addRandomSuffix,false);assert.ok(signed[0].validUntil<=Date.now()+60000);
  const url=await adapter.privateDownloadUrl('attachments/v2/verified/file.png',now+7*DAY,env,sdk);assert.deepEqual(issued[1].operations,['get']);assert.equal(signed[1].access,'private');assert.ok(signed[1].validUntil<=Date.now()+300000);assert.equal(new URL(url).searchParams.get('download'),'1');
  await assert.rejects(adapter.privateUploadUrl(file,now-1,env,sdk),throwsStatus(403));
  await assert.rejects(adapter.privateDownloadUrl('file',now-1,env,sdk),throwsStatus(403));
  await assert.rejects(adapter.privateUploadUrl(file,now+DAY,env,{...sdk,oidc:async()=>{throw Error('expired token');}}),throwsStatus(503));
});

test('cleanup reconciles abandoned late-completion orphans but never arbitrary storage paths',async()=>{
  const f=fixture();const orphan=`attachments/v2/quarantine/${randomUUID()}/${randomUUID()}.png`;
  await f.store.putFile(orphan,png(),'image/png');await f.store.putFile('production/original.png',png(),'image/png');
  f.store.orphanObjects=async()=>({objects:[{pathname:orphan,uploadedAt:f.now()-DAY},{pathname:'production/original.png',uploadedAt:0}],cursor:undefined});
  assert.equal((await f.service.cleanup()).removed,1);assert.equal(f.store.objects.has(orphan),false);assert.equal(f.store.objects.has('production/original.png'),true);
});

test('download endpoint never issues a URL before acceptance or for a forged bearer token',async()=>{
  const f=fixture();const s=await verified(f);const id=randomUUID();const claim=await f.service.claim(s.ref,'owner',id,'digest');const token=new URL(f.service.businessLink(claim.session,env)).hash.slice(8);let urls=0;
  const d={...deps(f),downloadUrl:async()=>{urls++;return 'https://private.invalid/download';}};
  assert.equal((await handleAttachment(request('download',{access:token,fileId:s.ref.fileIds[0]}),'download',d)).status,403);assert.equal(urls,0);
  await f.service.finish(s.status.sessionId,id,'accepted');
  assert.equal((await handleAttachment(request('download',{access:token,fileId:s.ref.fileIds[0]}),'download',d)).status,200);assert.equal(urls,1);
  assert.equal((await handleAttachment(request('download',{access:'forged',fileId:s.ref.fileIds[0]}),'download',d)).status,403);assert.equal(urls,1);
});
