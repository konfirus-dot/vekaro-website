import { Clock, User, Wrench } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import styles from "./About.module.css";

const STAT_ICONS = [Clock, User, Wrench];

export function About() {
  const t = useTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];
  const stats = t.raw("stats") as string[];

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.descriptions}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.description}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.stats}>
            {stats.map((stat, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <span key={stat} className={styles.stat}>
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  {stat}
                </span>
              );
            })}
          </div>
        </div>

        <div className={styles.photo}>
          <Image
            src="/images/office-image.png"
            alt={t("officePhotoAlt")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={styles.photoImage}
          />
        </div>
      </Container>
    </section>
  );
}
