import { getFormatter, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/StructuredData/BreadcrumbJsonLd";
import { CookieSettingsButton } from "@/components/ui/CookieBanner/CookieSettingsButton";
import { PHONE_DISPLAY, PRIVACY_POLICY_LAST_UPDATED } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";
import styles from "./PrivacyPolicyPage.module.css";

const PATH = "/privacy-policy";

// Section content lives in messages/*.json (privacyPage.sections) as a list
// of typed blocks, so the policy text can be edited without touching markup.
// "cookieTable" and "cookieSettings" are placeholders for the parts that
// need components rather than plain text.
type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cookieTable" }
  | { type: "cookieSettings" };

type Section = { title: string; blocks: Block[] };

type CookieRow = { name: string; provider: string; purpose: string; retention: string };
type CookieCategory = { title: string; rows: CookieRow[] };

export async function PrivacyPolicyPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const format = await getFormatter({ locale });

  const sections = t.raw("sections") as Section[];
  const cookieCategories = t.raw("cookieTable.categories") as CookieCategory[];

  const params = {
    phone: PHONE_DISPLAY,
    // Fixed to Warsaw so the ISO date can't shift a day with the server's TZ.
    // The trailing period is stripped because the sentence supplies its own
    // (Ukrainian formats as "8 жовтня 2026 р.", which would end in "р..").
    lastUpdated: format
      .dateTime(new Date(PRIVACY_POLICY_LAST_UPDATED), {
        dateStyle: "long",
        timeZone: "Europe/Warsaw",
      })
      .replace(/\.$/, ""),
  };

  // Block keys are built from array indices at runtime, which next-intl's
  // typed keys (global.d.ts) can't express; ICU interpolation still applies.
  const tBlock = t as unknown as (key: string, values: typeof params) => string;

  const renderBlock = (block: Block, sectionIndex: number, blockIndex: number) => {
    const key = `sections.${sectionIndex}.blocks.${blockIndex}`;

    switch (block.type) {
      case "paragraph":
        return (
          <p key={key} className={styles.text}>
            {tBlock(`${key}.text`, params)}
          </p>
        );
      case "list":
        return (
          <ul key={key} className={styles.list}>
            {block.items.map((_, itemIndex) => (
              <li key={itemIndex}>{tBlock(`${key}.items.${itemIndex}`, params)}</li>
            ))}
          </ul>
        );
      case "cookieTable":
        return (
          <div
            key={key}
            className={styles.tableScroll}
            role="region"
            aria-label={sections[sectionIndex].title}
            tabIndex={0}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{t("cookieTable.headers.name")}</th>
                  <th scope="col">{t("cookieTable.headers.provider")}</th>
                  <th scope="col">{t("cookieTable.headers.purpose")}</th>
                  <th scope="col">{t("cookieTable.headers.retention")}</th>
                </tr>
              </thead>
              {cookieCategories.map((category) => (
                <tbody key={category.title}>
                  <tr>
                    <th scope="rowgroup" colSpan={4} className={styles.category}>
                      {category.title}
                    </th>
                  </tr>
                  {category.rows.map((row) => (
                    <tr key={row.name}>
                      <th scope="row" className={styles.cookieName}>
                        <code>{row.name}</code>
                      </th>
                      <td>{row.provider}</td>
                      <td>{row.purpose}</td>
                      <td>{row.retention}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        );
      case "cookieSettings":
        return (
          <div key={key}>
            <CookieSettingsButton label={tFooter("cookieSettings")} appearance="button" />
          </div>
        );
    }
  };

  return (
    <main>
      <BreadcrumbJsonLd locale={locale} path={PATH} title={t("title")} />

      <section className={styles.page}>
        <Container>
          <div className={styles.column}>
            <Breadcrumbs locale={locale} current={t("title")} />
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.intro}>{t("intro")}</p>

            {sections.map((section, sectionIndex) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.blocks.map((block, blockIndex) => renderBlock(block, sectionIndex, blockIndex))}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
