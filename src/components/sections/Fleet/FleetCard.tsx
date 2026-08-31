import Image from "next/image";
import { PHONE_HREF } from "@/lib/constants";
import styles from "./Fleet.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FleetCard({
  name,
  priceFrom,
  image,
}: {
  name: string;
  priceFrom: string;
  image: string;
}) {
  return (
    <div className={styles.fleetCard}>
      <div className={styles.fleetTop}>
        <h4 className={styles.fleetName}>{name}</h4>
        <span className={styles.fleetPrice}>{priceFrom}</span>
      </div>

      <div className={styles.fleetImageWrap}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={styles.fleetImage}
        />
      </div>

      <a href={PHONE_HREF} className={styles.fleetArrow} aria-label={name}>
        <ArrowIcon />
      </a>
    </div>
  );
}
