# Technical SEO

Canonical origin: https://www.mahikaar.com. Page metadata and verified business structured data live in `src/lib/seo.ts`. All seven public routes export their own metadata. The root layout sets metadataBase and the title template.

## Portfolio indexing

`category`, `product` and `colourway` select client-rendered catalogue views and a shared dialog. They do not provide independent server-rendered detail pages. Every state therefore declares https://www.mahikaar.com/portfolio as its canonical and social URL. Shareable links and browser history continue to work. Query states are omitted from the sitemap, but remain crawlable so crawlers can see the canonical. No parameter-based robots block or conflicting noindex directive is applied.

## Discovery and structured data

`/robots.txt` allows public pages, excludes API crawling and advertises `/sitemap.xml`. The sitemap includes exactly the seven public canonical routes, with no invented modification dates. API and private enquiry-file responses receive X-Robots-Tag: noindex, nofollow. This is indexing control, not access control.

Organization and WebSite JSON-LD describe only existing business facts. No prices, reviews, ratings, certifications, production capacity or retail offers are asserted. Social previews use an existing photograph of the full brogue sample. No external social profiles are claimed.

## Deployment checks

After deployment, confirm all seven canonical URLs, robots.txt, sitemap.xml and the social image return successfully on the production domain. Confirm hosting permanently redirects HTTP and the non-www hostname to HTTPS www while preserving path and query parameters; hosting/domain configuration is not managed by this repository. Check that production has no platform-level noindex header or authentication barrier.

Submit https://www.mahikaar.com/sitemap.xml in the verified Google Search Console property. Use URL Inspection on the homepage and portfolio, Google's Rich Results Test and Schema Markup Validator on the deployed site, and social preview inspectors if needed. Verification requires the owner's Search Console access; do not fabricate a verification token. Deployment and sitemap submission do not guarantee indexing or rankings.

## Local verification

Run `npx tsc --noEmit`, ESLint on changed files, `npx next build --webpack`, then `node --test tests/seo-output.test.mjs`. The output test inspects generated HTML and discovery files rather than only metadata source objects. Webpack avoids this environment's Turbopack port-binding restriction.
