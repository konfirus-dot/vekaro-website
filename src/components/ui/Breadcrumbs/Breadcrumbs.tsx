import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import styles from "./Breadcrumbs.module.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export async function Breadcrumbs({ locale, current }: { locale: Locale; current: string }) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "breadcrumbs" });

  return (
    <nav aria-label={tBreadcrumbs("label")} className={styles.breadcrumbs}>
      <ol className={styles.list}>
        <li>
          <Link href="/" aria-label={tNav("home")} className={styles.homeLink}>
            <HomeIcon />
          </Link>
        </li>
        <li className={styles.separator} aria-hidden="true">/</li>
        <li className={styles.current} aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
