import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import styles from "./SloganBanner.module.css";

export function SloganBanner() {
  const t = useTranslations("sloganBanner");
  const headlineLines = t.raw("headlineLines") as string[];

  return (
    <section className={styles.banner}>
      <Container>
        <h2 className={styles.headline}>
          {headlineLines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </Container>
    </section>
  );
}
