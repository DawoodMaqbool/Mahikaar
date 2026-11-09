import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';

const output = mkdtempSync(join(tmpdir(), 'mahikaar-catalogue-'));
execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', 'src/data/portfolio.ts', '--outDir', output, '--module', 'commonjs', '--target', 'es2022', '--skipLibCheck']);
const { portfolioSpecimens, styleCategories, variantsForCategory, catalogueHref, resolveCatalogueSelection } = createRequire(import.meta.url)(join(output, 'portfolio.js'));
after(() => rmSync(output, { recursive: true, force: true }));
const resolve = (href) => resolveCatalogueSelection(new URL(href, 'https://mahikaar.test').searchParams);

test('every existing style and colourway round-trips without using display references', () => {
  assert.equal(new Set(portfolioSpecimens.map((item) => item.slug)).size, portfolioSpecimens.length);
  for (const category of styleCategories) {
    const variants = variantsForCategory(category.id);
    assert.equal(new Set(variants.map((item) => `${item.product}/${item.colourway ?? ''}`)).size, variants.length);
    for (const variant of variants) {
      const { view, selected } = resolve(catalogueHref(category.id, variant.product, variant.colourway));
      assert.equal(view.id, category.id);
      assert.deepEqual(selected, variant);
    }
  }
});

test('category links preserve taxonomy and closing a product leaves its category', () => {
  assert.equal(resolve(catalogueHref('semi-brogue')).view, null);
  assert.equal(resolve(catalogueHref('spectator', 'semi-brogue-cap-toe')).view.id, 'spectator');
  for (const category of styleCategories.filter((item) => item.numbers.length)) {
    const state = resolve(catalogueHref(category.id));
    assert.equal(state.view.id, category.id);
    assert.equal(state.selected, null);
  }
});

test('invalid and stale parameters fall back to an understandable catalogue state', () => {
  assert.deepEqual(resolve('/portfolio?category=missing&product=missing'), { view: null, selected: null });
  assert.equal(resolve('/portfolio?category=boots&product=missing').view.id, 'boots');
  const state = resolve('/portfolio?category=boots&product=spectator-brogue&colourway=obsolete');
  assert.equal(state.view.id, 'spectator');
  assert.equal(state.selected.colourway, 'white-black');
  assert.equal(resolve('/portfolio?product=woven-loafer').selected.product, 'woven-loafer');
});
