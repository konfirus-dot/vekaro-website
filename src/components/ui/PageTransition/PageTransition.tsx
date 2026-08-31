"use client";

import type { ReactNode } from "react";
import styles from "./PageTransition.module.css";

export function PageTransition({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <div key={locale} className={styles.fade}>
      {children}
    </div>
  );
}
