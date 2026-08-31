import { useTranslations } from "next-intl";
import { FleetCard } from "./FleetCard";
import styles from "./Fleet.module.css";

// TODO: the fleet currently only has 2 real cars (Fiat Tipo, Skoda Citigo) —
// duplicated here to fill 4 cards until the fleet actually grows. All cards
// reuse the Hero placeholder photo — replace with real per-car photos too.
const FLEET = [
  { key: "fiatTipo", id: "fiatTipo-1" },
  { key: "skodaCitigo", id: "skodaCitigo-1" },
  { key: "fiatTipo", id: "fiatTipo-2" },
  { key: "skodaCitigo", id: "skodaCitigo-2" },
] as const;

export function Fleet() {
  const t = useTranslations("fleet");

  return (
    <div className={styles.grid}>
      {FLEET.map(({ key, id }) => (
        <FleetCard
          key={id}
          image="/images/hero-car-placeholder.png"
          name={t(`${key}.name`)}
          priceFrom={t(`${key}.priceFrom`)}
        />
      ))}
    </div>
  );
}
