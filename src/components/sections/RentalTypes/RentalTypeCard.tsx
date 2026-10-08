import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import styles from "./RentalTypes.module.css";

export function RentalTypeCard({
  title,
  text,
  cta,
  href,
  image,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
}) {
  return (
    <div className={`${styles.card} theme-dark`}>
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className={styles.cardImage}
      />
      <div className={styles.cardOverlay} aria-hidden="true" />
      <div className={styles.cardContent}>
        <div className={styles.cardCopy}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardText}>{text}</p>
        </div>
        <Button href={href} variant="secondary" className={styles.cardButton}>
          {cta}
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
