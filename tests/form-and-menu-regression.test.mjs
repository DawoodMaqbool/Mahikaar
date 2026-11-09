import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { runInThisContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function componentLoader(stubs = {}) {
  const cache = new Map();
  function load(name, parent = root) {
    if (Object.hasOwn(stubs, name)) return stubs[name];
    if (!name.startsWith('.') && !name.startsWith('@/') && !name.startsWith('/')) return require(name);
    const base = name.startsWith('@/') ? resolve(root, 'src', name.slice(2)) : resolve(parent, name);
    const file = [base, `${base}.tsx`, `${base}.ts`].find(path => existsSync(path) && /\.tsx?$/.test(path));
    if (!file) throw new Error(`Unable to resolve ${name}`);
    if (cache.has(file)) return cache.get(file).exports;
    const loaded = { exports: {} };
    cache.set(file, loaded);
    const code = ts.transpileModule(readFileSync(file, 'utf8'), {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    runInThisContext(`(function(require, module, exports) { ${code}\n})`, { filename: file })(
      dependency => load(dependency, dirname(file)), loaded, loaded.exports,
    );
    return loaded.exports;
  }
  return name => load(name);
}


function attachmentController(available, checkingAvailability) {
  return { available, checkingAvailability, files: [], selectionError: '', select() {}, remove() {}, clear() {}, async prepare() {} };
}

// Minimal hook runtime so the real components' handlers can run without a DOM.
function hookHarness(render) {
  const slots = []; let i = 0; let tree;
  const fake = {
    ...React,
    useState(init) { const k = i++; if (!(k in slots)) slots[k] = init; return [slots[k], v => { slots[k] = typeof v === 'function' ? v(slots[k]) : v; }]; },
    useRef(init) { const k = i++; if (!(k in slots)) slots[k] = { current: init }; return slots[k]; },
    useEffect() {}, useId: () => 'id', useCallback: fn => fn,
  };
  return { fake, render() { i = 0; tree = render(); return tree; } };
}
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach(n => walk(n, visit));
  if (node.props) { visit(node); walk(node.props.children, visit); }
}
const find = (tree, pred) => { let hit; walk(tree, n => { if (!hit && pred(n)) hit = n; }); return hit; };

function quoteHarness(submitEnquiry) {
  const calls = [];
  const h = hookHarness(() => QuoteForm());
  const load = componentLoader({
    react: h.fake,
    './useQuoteAttachments': { useQuoteAttachments: () => ({ ...attachmentController(false, false), clear: () => calls.push('clear'), prepare: async () => null }) },
    '@/lib/enquiries/client': { enquiryFields: () => ({ fullName: 'A' }), submitEnquiry },
  });
  const { QuoteForm } = load('@/components/quote/QuoteForm');
  return { h, calls, form: () => find(h.render(), n => n.type === 'form') };
}
const submitEvent = () => ({ preventDefault() {}, currentTarget: {} });

test('quote form: confirmed success blocks resubmission until a new enquiry is started', async () => {
  let sent = 0;
  const q = quoteHarness(async () => { sent++; });
  await q.form().props.onSubmit(submitEvent());
  assert.equal(sent, 1);
  let tree = q.h.render();
  assert.ok(find(tree, n => n.props.children === 'Start New Enquiry'));
  assert.equal(find(tree, n => n.type === 'button' && n.props.type === 'submit').props.disabled, true);
  await q.form().props.onSubmit(submitEvent());
  assert.equal(sent, 1, 'second submit after success must not be sent');
  const start = find(q.h.render(), n => n.props.children === 'Start New Enquiry');
  start.props.onClick();
  tree = q.h.render();
  assert.equal(find(tree, n => n.props.children === 'Start New Enquiry'), undefined);
  await q.form().props.onSubmit(submitEvent());
  assert.equal(sent, 2);
});

test('quote form: failure keeps form retryable, never shows success and error together', async () => {
  let fail = true; let ids = [];
  const q = quoteHarness(async p => { ids.push(p.submissionId); if (fail) throw new Error('Server said no'); });
  await q.form().props.onSubmit(submitEvent());
  let tree = q.h.render();
  assert.ok(find(tree, n => n.props.role === 'alert'));
  assert.equal(find(tree, n => n.props.children === 'Start New Enquiry'), undefined);
  assert.equal(find(tree, n => n.type === 'button' && n.props.type === 'submit').props.disabled, false);
  fail = false;
  await q.form().props.onSubmit(submitEvent());
  tree = q.h.render();
  assert.equal(find(tree, n => n.props.role === 'alert'), undefined);
  assert.ok(find(tree, n => n.props.children === 'Start New Enquiry'));
  assert.equal(ids[0], ids[1], 'retry of identical body reuses the idempotency key');
});

test('quote form: duplicate submissions are ignored while a request is pending', async () => {
  let sent = 0; let release;
  const q = quoteHarness(() => { sent++; return new Promise(r => { release = r; }); });
  const first = q.form().props.onSubmit(submitEvent());
  await new Promise(r => setImmediate(r));
  await q.form().props.onSubmit(submitEvent());
  assert.equal(sent, 1);
  release(); await first;
});

test('mobile menu: Escape closes the panel and restores focus to the trigger', () => {
  const listeners = []; let cleanup;
  let focused = 0;
  const h = hookHarness(() => SiteHeader());
  h.fake.useRef = () => ({ current: { focus() { focused++; } } });
  h.fake.useEffect = fn => { cleanup?.(); cleanup = fn(); };
  const load = componentLoader({
    react: h.fake,
    'next/navigation': { usePathname: () => '/' },
    'next/image': { default: () => null }, 'next/link': { default: () => null },
  });
  globalThis.document = { addEventListener: (t, fn) => listeners.push([t, fn]), removeEventListener() {} };
  const { SiteHeader } = load('@/components/layout/SiteHeader');
  let tree = h.render();
  const toggle = () => find(tree, n => n.type === 'button' && n.props['aria-controls'] === 'mobile-nav');
  assert.equal(toggle().props['aria-expanded'], false);
  toggle().props.onClick(); tree = h.render();
  assert.equal(toggle().props['aria-expanded'], true);
  assert.equal(toggle().props['aria-label'], 'Close menu');
  const keydown = listeners.find(([t]) => t === 'keydown')[1];
  keydown({ key: 'Enter' }); tree = h.render();
  assert.equal(toggle().props['aria-expanded'], true);
  keydown({ key: 'Escape' }); tree = h.render();
  assert.equal(toggle().props['aria-expanded'], false);
  assert.equal(toggle().props['aria-label'], 'Open menu');
  assert.equal(focused, 1);
  delete globalThis.document;
});
