import { useTranslations } from "next-intl";
import { RentalTypeCard } from "./RentalTypeCard";
import styles from "./RentalTypes.module.css";

// TODO: temporary stand-in photos — replace with real per-service imagery
// (ideally the actual fleet) before launch.
const RENTAL_TYPES = [
  { key: "shortTerm", image: "/images/rental-card-driver-placeholder.png", href: "/services/short-term" },
  { key: "longTerm", image: "/images/rental-card-family-placeholder.png", href: "/services/long-term" },
  { key: "business", image: "/images/rental-card-longterm-placeholder.png", href: "/services/business" },
] as const;

export function RentalTypes() {
  const t = useTranslations("rentalTypes");

  return (
    <div className={styles.grid}>
      {RENTAL_TYPES.map(({ key, image, href }) => (
        <RentalTypeCard
          key={key}
          image={image}
          href={href}
          title={t(`${key}.title`)}
          text={t(`${key}.text`)}
          cta={t("viewDetails")}
        />
      ))}
    </div>
  );
}
