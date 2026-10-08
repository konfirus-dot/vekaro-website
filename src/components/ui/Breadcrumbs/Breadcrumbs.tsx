import { House } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import styles from "./Breadcrumbs.module.css";

export async function Breadcrumbs({ locale, current }: { locale: Locale; current: string }) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "breadcrumbs" });

  return (
    <nav aria-label={tBreadcrumbs("label")} className={styles.breadcrumbs}>
      <ol className={styles.list}>
        <li>
          <Link href="/" aria-label={tNav("home")} className={styles.homeLink}>
            <House size={18} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </li>
        <li className={styles.separator} aria-hidden="true">/</li>
        <li className={styles.current} aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
