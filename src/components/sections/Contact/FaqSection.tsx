import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Faq } from "./Faq";
import styles from "./FaqSection.module.css";

type FaqItem = { question: string; answer: string };

// Homepage FAQ as its own section (it used to share the Contact section as a
// second column). Uses the shared `faq` translations and accordion.
export function FaqSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{t("title")}</h2>
        <Faq items={items} />
      </Container>
    </section>
  );
}
