import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { SloganStamp } from "./SloganStamp";
import styles from "./SloganBanner.module.css";

export function SloganBanner() {
  const t = useTranslations("sloganBanner");
  const headlineLines = t.raw("headlineLines") as string[];

  return (
    <section className={styles.banner}>
      <Container>
        <SloganStamp lines={headlineLines} subtitle={t("subtitle")} />
      </Container>
    </section>
  );
}
