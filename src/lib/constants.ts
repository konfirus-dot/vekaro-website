export const PHONE_DISPLAY = "+48 789 085 345";
export const PHONE_HREF = "tel:+48789085345";
export const WHATSAPP_HREF = "https://wa.me/48789085345";

// TODO: replace with the real Telegram/Instagram links once provided
export const TELEGRAM_HREF = "#";
export const INSTAGRAM_HREF = "#";

export const WORKING_HOURS_OPENS = "08:00";
export const WORKING_HOURS_CLOSES = "18:00";
export const WORKING_HOURS = `${WORKING_HOURS_OPENS}–${WORKING_HOURS_CLOSES}`;
export const CITY = "Warszawa";
export const COUNTRY_CODE = "PL";
export const CURRENCY = "PLN";
export const PRICE_FROM = "50 PLN";

// TODO: set NEXT_PUBLIC_SITE_URL once the production domain is decided
//
// Validated rather than used directly: metadataBase does `new URL(SITE_URL)`
// on every page, so a malformed value here (e.g. an env var misconfigured on
// the hosting dashboard) would otherwise crash the entire production build.
// Falls back to localhost — same safe-by-default behavior as an unset var.
function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return "http://localhost:3000";
  try {
    new URL(value);
    return value;
  } catch {
    return "http://localhost:3000";
  }
}

export const SITE_URL = resolveSiteUrl();

// Preview/production switch for search-engine indexing. The site isn't live
// on its final domain yet, so as long as SITE_URL doesn't point there, every
// deploy — this dev box, Vercel preview deploys, and even a Vercel
// "production" deploy still sitting on a temporary *.vercel.app URL — must
// stay out of Google's index. Controlled by NEXT_PUBLIC_SITE_ENV=preview
// (see .env.example, set on Vercel for the *.vercel.app deploys). Once the
// site goes live on its real domain, unset this env var or set it to
// "production" and noindex disappears automatically — no code changes needed.
export const IS_PREVIEW_ENV = process.env.NEXT_PUBLIC_SITE_ENV === "preview";
