import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { RentalTypes } from "@/components/sections/RentalTypes/RentalTypes";
import { Fleet } from "@/components/sections/Fleet/Fleet";
import styles from "./Services.module.css";

// Rental types and fleet used to be two separate sections; they're now one
// logical "Services" block sharing a single #services anchor — the fleet is
// presented as a subsection (h3) rather than its own landmark.
export function Services() {
  const t = useTranslations("rentalTypes");
  const tFleet = useTranslations("fleet");

  return (
    <section id="services" className={styles.section}>
      <Container>
        <h2 className={styles.title}>{t("title")}</h2>
        <RentalTypes />

        <div className={styles.fleetHeader}>
          <h3 className={styles.fleetTitle}>{tFleet("sectionTitle")}</h3>
          <p className={styles.fleetSubtitle}>{tFleet("sectionSubtitle")}</p>
        </div>
        <Fleet />
      </Container>
    </section>
  );
}
