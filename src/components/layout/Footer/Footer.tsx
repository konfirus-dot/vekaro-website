import { MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container/Container";
import { LanguageSwitcher } from "@/components/layout/Header/LanguageSwitcher";
import { CookieSettingsButton } from "@/components/ui/CookieBanner/CookieSettingsButton";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  TELEGRAM_HREF,
  INSTAGRAM_HREF,
} from "@/lib/constants";
import styles from "./Footer.module.css";

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
            <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
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
              <Image src="/icons/whatsapp.svg" alt="" width={34} height={34} />
            </a>
            <a
              href={TELEGRAM_HREF}
              className={styles.socialLink}
              aria-label={tContact("telegram")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/icons/telegram.svg" alt="" width={34} height={34} />
            </a>
            <a
              href={INSTAGRAM_HREF}
              className={styles.socialLink}
              aria-label={tContact("instagram")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/icons/instagram.svg" alt="" width={34} height={34} />
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
        <div className={styles.bottomLinks}>
          <p className={styles.rights}>
            © {new Date().getFullYear()} Vekaro. {tFooter("rights")}
          </p>
          <CookieSettingsButton label={tFooter("cookieSettings")} className={styles.cookieSettings} />
        </div>
        <LanguageSwitcher direction="up" />
      </Container>
    </footer>
  );
}
