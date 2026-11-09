import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

// Run after a production build to verify emitted tags, including layout inheritance.
const built = existsSync('.next/server/app/index.html');
const paths = ['', 'portfolio', 'private-label', 'manufacturing', 'about', 'contact', 'request-a-quote'];
const origin = 'https://www.mahikaar.com';
const read = (name) => readFileSync(`.next/server/app/${name}`, 'utf8');
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));

test('seven built pages emit unique metadata, canonical and consistent social URLs', { skip: !built }, () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const path of paths) {
    const html = read(`${path || 'index'}.html`);
    const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
    const meta = (name) => metas.find((item) => item.name === name || item.property === name)?.content;
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title?.endsWith(' | Mahikaar'), path);
    assert.ok(meta('description')?.length > 80, path);
    titles.add(title);
    descriptions.add(meta('description'));
    assert.deepEqual(links.filter((item) => item.rel === 'canonical').map((item) => new URL(item.href).href), [`${origin}/${path}`]);
    assert.equal(new URL(meta('og:url')).href, `${origin}/${path}`);
    assert.equal(meta('og:title'), title);
    assert.equal(meta('og:description'), meta('description'));
    assert.equal(meta('twitter:card'), 'summary_large_image');
    const image = meta('og:image');
    assert.ok(image?.startsWith(origin));
    assert.ok(existsSync(`public${new URL(image).pathname}`));
    assert.ok(!meta('robots')?.includes('noindex'));
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert.equal(scripts.length, 1);
    const graph = JSON.parse(scripts[0][1])['@graph'];
    assert.deepEqual(graph.map((item) => item['@type']), ['Organization', 'WebSite']);
    assert.equal(graph[0].url, `${origin}/`);
  }
  assert.equal(titles.size, 7);
  assert.equal(descriptions.size, 7);
});

test('discovery files list exactly seven public canonicals and no query or utility URLs', { skip: !built }, () => {
  const sitemap = read('sitemap.xml.body');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls.sort(), paths.map((path) => `${origin}/${path}`).sort());
  assert.ok(!sitemap.includes('<lastmod>'));
  const robots = read('robots.txt.body');
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(!robots.includes('Disallow: /portfolio'));
  const config = JSON.parse(readFileSync('.next/routes-manifest.json', 'utf8'));
  for (const source of ['/api/:path*', '/enquiry-files/:path*']) {
    assert.ok(config.headers.some((rule) => rule.source === source && rule.headers.some((header) => header.key === 'X-Robots-Tag' && header.value.includes('noindex'))));
  }
});
