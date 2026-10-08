"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import styles from "./Faq.module.css";

type FaqItem = { question: string; answer: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.faq}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className={styles.item}>
            <h4 className={styles.heading}>
              <button
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className={isOpen ? styles.chevronOpen : styles.chevron}
                />
              </button>
            </h4>
            <div
              className={isOpen ? `${styles.answerWrap} ${styles.answerWrapOpen}` : styles.answerWrap}
              aria-hidden={!isOpen}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
