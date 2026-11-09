"use client";

import Script from "next/script";
import Link from "next/link";
import { privacyFeaturesEnabled } from "@/lib/privacy-features";
import { routes } from "@/lib/site";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  analyticsConfigured, consentKey, measurementId, readConsent, setConsent,
  startAnalytics, trackPageView, disableAnalytics,
} from "@/lib/analytics";

function subscribe(callback: () => void) {
  window.addEventListener('mahikaar-consent', callback);
  return () => window.removeEventListener('mahikaar-consent', callback);
}
const noSubscribe = () => () => {};

export function AnalyticsConsent() {
  const pathname = usePathname();
  const preference = useSyncExternalStore(subscribe, readConsent, () => null);
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!analyticsConfigured) {
      disableAnalytics();
      return;
    }
    function sync(event: StorageEvent) {
      if (event.key === consentKey || event.key === null) {
        // Reconcile consent and discard any previously loaded analytics runtime.
        if (readConsent() !== 'accepted') setConsent('rejected');
        window.location.reload();
      }
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (preference !== 'accepted' || !analyticsConfigured) return;
    startAnalytics();
    trackPageView(pathname);
  }, [preference, pathname]);

  if (!analyticsConfigured) return null;
  function choose(value: 'accepted' | 'rejected') {
    setConsent(value);
    window.dispatchEvent(new Event("mahikaar-consent"));
    setEditing(false);
  }

  return (
    <>
      <button type="button" onClick={() => setEditing(true)} className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
        Analytics preferences
      </button>
      {ready && (preference === null || editing) && (
        <section aria-label="Optional analytics preferences" className="fixed bottom-0 inset-x-0 z-50 border-t border-outline bg-surface text-on-surface page-gutters py-5 shadow-sm">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 space-y-2">
              <h2 className="type-headline-sm">Optional analytics</h2>
              <p className="type-body-sm text-on-surface-variant max-w-3xl">
                With your permission, Google Analytics uses cookies to measure website visits and successful enquiries.
                Rejecting does not prevent enquiries. You can change your choice using Analytics preferences in the footer.
                Withdrawing an earlier acceptance reloads this page to stop analytics.
                {privacyFeaturesEnabled && <> {" "}<Link href={routes.privacyPolicy} className="editorial-link">Read our Privacy Policy</Link>.</>}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="action-secondary" onClick={() => choose('rejected')}>Reject analytics</button>
              <button type="button" className="action-secondary" onClick={() => choose('accepted')}>Accept analytics</button>
              {editing && preference !== null && <button type="button" className="action-secondary" onClick={() => setEditing(false)}>Close</button>}
            </div>
          </div>
        </section>
      )}
      {preference === 'accepted' && <Script id="mahikaar-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />}
    </>
  );
}
