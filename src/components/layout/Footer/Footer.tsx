import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container/Container";
import { LanguageSwitcher } from "@/components/layout/Header/LanguageSwitcher";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  TELEGRAM_HREF,
  INSTAGRAM_HREF,
} from "@/lib/constants";
import styles from "./Footer.module.css";

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact");
  const tRentalTypes = useTranslations("rentalTypes");

  return (
    <footer className={`${styles.footer} theme-dark`}>
      <Container className={styles.grid}>
        <div className={styles.column}>
          <p className={styles.heading}>Vekaro</p>
          <p className={styles.hours}>{tFooter("workingHours")}</p>
          <a href={PHONE_HREF} className={styles.link}>
            {PHONE_DISPLAY}
          </a>
          <span className={styles.location}>
            <MapPinIcon />
            {tFooter("location")}
          </span>

          <div className={styles.socialRow}>
            <a
              href={WHATSAPP_HREF}
              className={styles.socialLink}
              aria-label={tContact("whatsapp")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={TELEGRAM_HREF}
              className={styles.socialLink}
              aria-label={tContact("telegram")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon />
            </a>
            <a
              href={INSTAGRAM_HREF}
              className={styles.socialLink}
              aria-label={tContact("instagram")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>{tFooter("servicesTitle")}</p>
          <Link href="/services/short-term" className={styles.link}>
            {tRentalTypes("shortTerm.title")}
          </Link>
          <Link href="/services/long-term" className={styles.link}>
            {tRentalTypes("longTerm.title")}
          </Link>
          <Link href="/services/business" className={styles.link}>
            {tRentalTypes("business.title")}
          </Link>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>{tFooter("companyColumn.title")}</p>
          <Link href="/#about" className={styles.link}>
            {tNav("about")}
          </Link>
          <Link href="/#contact" className={styles.link}>
            {tNav("contact")}
          </Link>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>{tFooter("legalTitle")}</p>
          <Link href="/privacy-policy" className={styles.link}>
            {tFooter("privacyPolicy")}
          </Link>
        </div>
      </Container>

      <Container className={styles.bottomBar}>
        <p className={styles.rights}>
          © {new Date().getFullYear()} Vekaro. {tFooter("rights")}
        </p>
        <LanguageSwitcher direction="up" />
      </Container>
    </footer>
  );
}
