// TODO: wire up once a real GA4 Measurement ID is provided by the client.
//
// Planned implementation:
// 1. Read the ID from process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; render nothing if it's unset.
// 2. Before loading gtag.js, initialize `window.dataLayer` and call
//    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ... })
//    — Google Consent Mode v2 requires denying by default until the user opts in.
// 3. Load gtag.js via `next/script` (strategy="afterInteractive") and call
//    gtag('config', GA_MEASUREMENT_ID).
// 4. Listen for the "vekaro-cookie-consent-change" event dispatched by
//    src/components/ui/CookieBanner and call
//    gtag('consent', 'update', { analytics_storage: 'granted' | 'denied' })
//    based on the stored choice.
//
// Until then this is a no-op placeholder so it can already be mounted in the root layout.
export function Analytics() {
  return null;
}
