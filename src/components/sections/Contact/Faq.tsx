"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={open ? styles.chevronOpen : styles.chevron}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
                <ChevronIcon open={isOpen} />
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
