import type { MetadataRoute } from "next";
import { SITE_URL, IS_PREVIEW_ENV } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW_ENV) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
