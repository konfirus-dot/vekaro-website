import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { PHONE_HREF } from "@/lib/constants";
import styles from "./Fleet.module.css";

export function FleetCard({
  name,
  priceFrom,
  image,
  headingLevel = 3,
}: {
  name: string;
  priceFrom: string;
  image: string;
  // Keeps the document outline gap-free: h3 under the homepage "Nasza flota"
  // h2, h2 on service pages where the cards follow the h1 directly.
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={styles.fleetCard}>
      <div className={styles.fleetTop}>
        <Heading className={styles.fleetName}>{name}</Heading>
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
