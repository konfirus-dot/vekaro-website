import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { CalendarRange, MessagesSquare, ShieldCheck } from "lucide-react";
import styles from "./Advantages.module.css";

type AdvantageItem = { title: string; text: string };

// One icon per item, in the same order as advantages.items in messages/*.json:
// direct contact, well-maintained cars, flexible rental terms.
const ICONS = [MessagesSquare, ShieldCheck, CalendarRange];

export function Advantages() {
  const t = useTranslations("advantages");
  const items = t.raw("items") as AdvantageItem[];

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{t("title")}</h2>
        <ul className={styles.list}>
          {items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <li key={item.title} className={styles.item}>
                <div className={styles.header}>
                  {/* 28px icon beside the benefit title;
                      absoluteStrokeWidth keeps the stroke at exactly 1.75px. */}
                  <Icon
                    size={28}
                    color="#000000"
                    strokeWidth={1.75}
                    absoluteStrokeWidth
                    aria-hidden="true"
                  />
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
                <p className={styles.itemText}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
