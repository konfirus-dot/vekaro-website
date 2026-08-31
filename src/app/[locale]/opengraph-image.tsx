import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vekaro";

// Same placeholder car photo as PromoBanner ("Potrzebujesz auta już dziś?")
// on the site itself — TODO: replace both together once real fleet photos
// are available (see PROJECT.md).
async function loadCarImage(): Promise<string> {
  const buffer = await fetch(new URL("/images/showcase-car-placeholder.png", SITE_URL)).then((res) =>
    res.arrayBuffer(),
  );
  return `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "promo" });
  const carImageSrc = await loadCarImage();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#f2f1ee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "56%",
            padding: "0 20px 0 80px",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "3px solid #171717",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "#171717",
              }}
            >
              V
            </div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#171717" }}>Vekaro</div>
          </div>

          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, lineHeight: 1.1, color: "#171717" }}>
            {t("title")}
          </div>

          <div style={{ display: "flex", fontSize: 28, color: "#171717", opacity: 0.75 }}>
            {t("subtitle")}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 10,
              padding: "16px 36px",
              borderRadius: 999,
              backgroundColor: "#ff5a1f",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
              alignSelf: "flex-start",
            }}
          >
            {t("cta")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "44%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={carImageSrc} alt="" width={520} height={325} style={{ objectFit: "contain" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
