import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { RentalTypes } from "@/components/sections/RentalTypes/RentalTypes";
import styles from "./Services.module.css";

// "Choose your rental" section: heading + the three rental-type cards. The
// fleet that used to follow as an h3 subsection is now its own section
// (FleetSection).
export function Services() {
  const t = useTranslations("rentalTypes");

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{t("title")}</h2>
        <RentalTypes />
      </Container>
    </section>
  );
}
