/** Optional analytics only. Never pass enquiry payloads to this module. */
export const consentKey = 'mahikaar.analytics-consent.v1';
export type AnalyticsConsent = 'accepted' | 'rejected' | null;
export const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
// Enable only after Enhanced Measurement has been disabled in the GA4 stream.
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId)
  && process.env.NEXT_PUBLIC_GA_MANUAL_TRACKING_READY === 'true';
const publicPaths = new Set(['/', '/about', '/portfolio', '/private-label', '/manufacturing', '/contact', '/request-a-quote']);
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
let preference: AnalyticsConsent = null;
let memoryOnly = false;
let started = false;
let previousPath: string | null = null;
let quoteFromContact = false;
const completed = new Set<string>();

export function readConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return null;
  if (memoryOnly) return preference;
  try {
    const value = window.localStorage.getItem(consentKey);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch { return preference; }
}

export function clearAnalyticsCookies() {
  // Delete only GA cookies on host and parent domains; never touch enquiry cookies.
  const domains = window.location.hostname.split('.');
  const paths = new Set(['/', ...window.location.pathname.split('/').map((_, index, parts) => parts.slice(0, index + 1).join('/') || '/')]);
  for (const entry of document.cookie.split(';')) {
    const name = entry.trim().split('=')[0];
    if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue;
    for (const path of paths) {
      const expired = `${name}=; Max-Age=0; path=${path}; SameSite=Lax`;
      document.cookie = expired;
      for (let index = 0; index < domains.length - 1; index++) {
        document.cookie = `${expired}; domain=${domains.slice(index).join('.')}`;
      }
    }
  }
}

export function setConsent(value: Exclude<AnalyticsConsent, null>) {
  preference = value;
  try { window.localStorage.setItem(consentKey, value); memoryOnly = false; } catch { memoryOnly = true; }
  if (value === 'rejected') {
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
    clearAnalyticsCookies();
    // Unmounting a script cannot unload its history listeners or timers.
    // Disable immediately, then reload to remove the running Google library entirely.
    // If persistence is blocked, retain the in-memory rejection instead of
    // reloading into a stale stored acceptance. The disable flag still stops GA.
    if (started && !memoryOnly) window.location.reload();
  }
}

export function startAnalytics() {
  if (!analyticsConfigured || readConsent() !== 'accepted' || started) return false;
  started = true;
  const target = window as AnalyticsWindow;
  (target as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = false;
  target.dataLayer = target.dataLayer || [];
  target.gtag = function () {
    // Google's command queue uses the standard gtag arguments-object format.
    // eslint-disable-next-line prefer-rest-params
    target.dataLayer?.push(arguments);
  };
  target.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  target.gtag('js', new Date());
  target.gtag('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: 'https://www.mahikaar.com' + (publicPaths.has(window.location.pathname) ? window.location.pathname : '/'),
    page_referrer: '',
  });
  return true;
}

export function trackPageView(path: string) {
  if (!started || readConsent() !== 'accepted') return;
  if (!publicPaths.has(path)) { previousPath = null; return; }
  if (path === previousPath) return;
  quoteFromContact = path === '/request-a-quote' && previousPath === '/contact';
  previousPath = path;
  try {
    const gtag = (window as AnalyticsWindow).gtag;
    const location = `https://www.mahikaar.com${path}`;
    // Global defaults also keep lead/engagement events free of query strings and fragments.
    gtag?.('set', { page_location: location, page_referrer: '' });
    gtag?.('event', 'page_view', { page_location: location, page_referrer: '', send_to: measurementId });
  } catch { /* Analytics must never affect navigation. */ }
}

const sources: Record<string, string> = {
  'Request a Quote': 'request_a_quote', Contact: 'contact', Portfolio: 'portfolio', 'Private Label': 'private_label',
};
export function trackSuccessfulEnquiry(source: unknown, submissionId: unknown) {
  try {
    if (typeof submissionId !== 'string' || !submissionId || completed.has(submissionId)) return;
    // Remember successful submissions even when consent is declined; never replay them later.
    completed.add(submissionId);
    const key = 'mahikaar.analytics-leads.v1';
    let stored: string[] = [];
    try {
      const value: unknown = JSON.parse(window.sessionStorage.getItem(key) || '[]');
      if (Array.isArray(value)) stored = value.filter((id): id is string => typeof id === 'string');
      if (stored.includes(submissionId)) return;
      window.sessionStorage.setItem(key, JSON.stringify([...stored, submissionId]));
    } catch { /* In-memory deduplication remains available. */ }
    const resolvedSource = source === 'Request a Quote' && quoteFromContact ? 'Contact' : source;
    const formSource = typeof resolvedSource === 'string' && Object.hasOwn(sources, resolvedSource) ? sources[resolvedSource] : undefined;
    if (!formSource || !started || readConsent() !== 'accepted' || !publicPaths.has(window.location.pathname)) return;
    (window as AnalyticsWindow).gtag?.('event', 'generate_lead', { form_source: formSource, send_to: measurementId });
  } catch { /* Blockers and storage failures must not affect accepted enquiries. */ }
}
