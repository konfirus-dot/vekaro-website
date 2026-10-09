import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  TELEGRAM_HREF,
  INSTAGRAM_HREF,
} from "@/lib/constants";
import styles from "./Contact.module.css";

// Same brand icons as the footer and the header's contact menu.
const CHANNELS = [
  { key: "whatsapp", href: WHATSAPP_HREF, icon: "/icons/whatsapp.svg" },
  { key: "telegram", href: TELEGRAM_HREF, icon: "/icons/telegram.svg" },
  { key: "instagram", href: INSTAGRAM_HREF, icon: "/icons/instagram.svg" },
] as const;

// Two columns on desktop: heading, description and contact details on the
// left; messenger links and the call button in a card on the right.
// Stacked on mobile.
export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.info}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.description}>{t("description")}</p>

          <ul className={styles.details}>
            <li>
              <Phone size={20} strokeWidth={1.8} aria-hidden="true" className={styles.detailIcon} />
              <a href={PHONE_HREF} className={styles.phone}>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <Clock size={20} strokeWidth={1.8} aria-hidden="true" className={styles.detailIcon} />
              <span>{t("hours")}</span>
            </li>
            <li>
              <MapPin size={20} strokeWidth={1.8} aria-hidden="true" className={styles.detailIcon} />
              <span>{t("areaNote")}</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <ul className={styles.channels}>
            {CHANNELS.map(({ key, href, icon }) => (
              <li key={key}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.channel}>
                  <Image src={icon} alt="" width={40} height={40} />
                  <span className={styles.channelName}>{t(key)}</span>
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" className={styles.channelArrow} />
                </a>
              </li>
            ))}
          </ul>

          <Button href={PHONE_HREF} block className={styles.callButton}>
            {t("callCta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
