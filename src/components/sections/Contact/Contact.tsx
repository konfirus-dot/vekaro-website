import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { Faq } from "./Faq";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  TELEGRAM_HREF,
  INSTAGRAM_HREF,
} from "@/lib/constants";
import styles from "./Contact.module.css";

type FaqItem = { question: string; answer: string };

export function Contact() {
  const t = useTranslations("contact");
  const tFaq = useTranslations("faq");
  const faqItems = tFaq.raw("items") as FaqItem[];

  return (
    <section id="contact" className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.info}>
          <h2 className={styles.title}>{t("title")}</h2>
          <a href={PHONE_HREF} className={styles.phone}>
            {PHONE_DISPLAY}
          </a>
          <p className={styles.hours}>{t("hours")}</p>
          <p className={styles.area}>{t("areaNote")}</p>

          <div className={styles.messengers}>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              {t("whatsapp")}
            </a>
            <a href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer">
              {t("telegram")}
            </a>
            <a href={INSTAGRAM_HREF} target="_blank" rel="noopener noreferrer">
              {t("instagram")}
            </a>
          </div>

          <Button href={PHONE_HREF} block>
            {t("callCta")}
          </Button>
        </div>

        <div className={styles.faqWrap}>
          <h3 className={styles.faqTitle}>{tFaq("title")}</h3>
          <Faq items={faqItems} />
        </div>
      </Container>
    </section>
  );
}
