import { FleetCard } from "./FleetCard";
import { FLEET } from "./fleetData";
import styles from "./Fleet.module.css";

// The fleet card grid, shared by the homepage section and the service pages.
export function Fleet({ headingLevel }: { headingLevel?: 2 | 3 }) {
  return (
    <div className={styles.grid}>
      {FLEET.map((vehicle) => (
        <FleetCard key={vehicle.key} vehicle={vehicle} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
