import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Fleet } from "./Fleet";
import styles from "./Fleet.module.css";

// "Nasza flota" as its own homepage section (it used to be an h3 subsection
// inside Services), so its heading sits at the same h2 level and the section
// gets the standard section spacing.
export function FleetSection() {
  const t = useTranslations("fleet");

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("sectionTitle")}</h2>
          <p className={styles.subtitle}>{t("sectionSubtitle")}</p>
        </div>
        <Fleet />
      </Container>
    </section>
  );
}
