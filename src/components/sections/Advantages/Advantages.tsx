import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Logo } from "@/components/ui/Logo/Logo";
import styles from "./Advantages.module.css";

type AdvantageItem = { title: string; text: string };

export function Advantages() {
  const t = useTranslations("advantages");
  const items = t.raw("items") as AdvantageItem[];

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{t("title")}</h2>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.title} className={styles.item}>
              <div className={styles.header}>
                {/* TODO: swap for a real per-advantage icon — Vekaro logo used as a stand-in */}
                <Logo size={28} />
                <h3 className={styles.itemTitle}>{item.title}</h3>
              </div>
              <p className={styles.itemText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
