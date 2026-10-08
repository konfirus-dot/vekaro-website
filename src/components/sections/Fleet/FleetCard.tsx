import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { PHONE_HREF } from "@/lib/constants";
import styles from "./Fleet.module.css";

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
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </div>
  );
}
