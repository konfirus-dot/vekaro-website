// Fired by "Cookie settings" buttons (footer, privacy policy page) to bring
// the CookieBanner back after a choice was already saved, so the visitor can
// change or withdraw consent.
export const OPEN_COOKIE_SETTINGS_EVENT = "vekaro-cookie-settings-open";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
