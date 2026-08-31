import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import styles from "./About.module.css";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M21 7a4 4 0 0 1-5.3 3.8L8 18.5a2 2 0 1 1-2.8-2.8L12.9 8A4 4 0 0 1 17 3l-2.5 2.5 1 1L18 4a4 4 0 0 1 3 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STAT_ICONS = [CalendarIcon, UsersIcon, WrenchIcon];

export function About() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as string[];

  return (
    <section id="about" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.description}>{t("paragraph")}</p>

          <div className={styles.stats}>
            {stats.map((stat, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <span key={stat} className={styles.stat}>
                  <Icon />
                  {stat}
                </span>
              );
            })}
          </div>
        </div>

        {/* TODO: temporary stock photo, not the real Vekaro office — replace
            before launch, same as the other placeholder photos on the site. */}
        <div className={styles.photo}>
          <Image
            src="/images/office-photo-placeholder.jpg"
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
