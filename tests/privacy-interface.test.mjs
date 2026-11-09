import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { runInThisContext } from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Render actual TSX without adding a test framework. Only browser state and the
// availability hook are stubbed; the form, upload panel, footer and notice are real.
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

for (const [available, checkingAvailability] of [[false, false], [false, true], [true, true]]) {
  test(`quote form hides upload UI when available=${available}, checking=${checkingAvailability}`, () => {
    const controller = attachmentController(available, checkingAvailability);
    const load = componentLoader({ './useQuoteAttachments': { useQuoteAttachments: () => controller } });
    const { QuoteForm } = load('@/components/quote/QuoteForm');
    const html = renderToStaticMarkup(React.createElement(QuoteForm));
    assert.doesNotMatch(html, /type="file"|attach|upload|design files|PDF|PNG|25 MB|No documents/i);
    assert.match(html, /Project Specifications/);
    for (const name of ['fullName', 'companyName', 'businessEmail', 'territory', 'projectDescription', 'specNotes']) {
      assert.ok(html.includes(`name="${name}"`));
    }
    assert.match(html, /type="submit"[^>]*>.*?Send Enquiry/s);
  });
}

test('approved availability restores existing upload controls and copy', () => {
  const controller = attachmentController(true, false);
  const load = componentLoader({ './useQuoteAttachments': { useQuoteAttachments: () => controller } });
  const { QuoteForm } = load('@/components/quote/QuoteForm');
  const html = renderToStaticMarkup(React.createElement(QuoteForm));
  assert.match(html, /type="file"/);
  assert.match(html, /Design Files &amp; Specifications/);
  assert.match(html, /PDF and PNG only/);
  assert.match(html, /Click to select or drag files here/);
});

test('privacy page renders draft disclosure and existing contact address; footer links to it', () => {
  const load = componentLoader({ '@/lib/privacy-features': { privacyFeaturesEnabled: true } });
  const { default: Page, metadata } = load('@/app/privacy-policy/page');
  const html = renderToStaticMarkup(React.createElement(Page));
  assert.equal(metadata.alternates.canonical, 'https://www.mahikaar.com/privacy-policy');
  assert.match(html, /<h1[^>]*>Privacy Policy<\/h1>/);
  for (const wording of ['awaiting business-owner review', 'Resend', 'Vercel', 'Google Analytics', 'retention period', 'legal bases', 'transfer arrangements', 'Customer file uploads are currently disabled']) {
    assert.ok(html.includes(wording), wording);
  }
  assert.match(html, /href="mailto:b2b@mahikaratelier.com"/);
  const { SiteFooter } = load('@/components/layout/SiteFooter');
  assert.match(renderToStaticMarkup(React.createElement(SiteFooter)), /href="\/privacy-policy"[^>]*>Privacy Policy<\/a>/);
});

test('open consent interface links to privacy notice and retains Accept and Reject controls', () => {
  const load = componentLoader({
    '@/lib/privacy-features': { privacyFeaturesEnabled: true },
    react: { ...React, useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot() },
    'next/navigation': { usePathname: () => '/' },
    '@/lib/analytics': { analyticsConfigured: true, readConsent: () => null },
  });
  const { AnalyticsConsent } = load('@/components/analytics/AnalyticsConsent');
  const html = renderToStaticMarkup(React.createElement(AnalyticsConsent));
  assert.match(html, /href="\/privacy-policy"[^>]*>Read our Privacy Policy<\/a>/);
  assert.match(html, /Accept analytics/);
  assert.match(html, /Reject analytics/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
});


test('temporary hold returns notFound and hides policy links and all consent UI', () => {
  const load = componentLoader({
    '@/lib/privacy-features': { privacyFeaturesEnabled: false },
    '@/lib/analytics': { analyticsConfigured: false, readConsent: () => 'accepted' },
    'next/navigation': { usePathname: () => '/', notFound: () => { throw new Error('404'); } },
  });
  const { default: Page } = load('@/app/privacy-policy/page');
  assert.throws(() => renderToStaticMarkup(React.createElement(Page)), /404/);
  const { SiteFooter } = load('@/components/layout/SiteFooter');
  const html = renderToStaticMarkup(React.createElement(SiteFooter));
  assert.doesNotMatch(html, /privacy-policy|Privacy Policy|Analytics preferences|Accept analytics|googletagmanager/);
  const { default: sitemap } = load('@/app/sitemap');
  assert.equal(sitemap().length, 7);
  assert.ok(sitemap().every(entry => !entry.url.includes('/privacy-policy')));
});
