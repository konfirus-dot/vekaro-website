import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PHONE_DISPLAY } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vekaro";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: "4px solid #ededed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "#ededed",
            }}
          >
            V
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#ededed", letterSpacing: -1 }}>
            Vekaro
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#ededed",
            opacity: 0.85,
            textAlign: "center",
            maxWidth: 920,
          }}
        >
          {t("subtitle")}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            padding: "14px 32px",
            borderRadius: 999,
            backgroundColor: "#ff5a1f",
            color: "#ffffff",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {PHONE_DISPLAY}
        </div>
      </div>
    ),
    { ...size },
  );
}
