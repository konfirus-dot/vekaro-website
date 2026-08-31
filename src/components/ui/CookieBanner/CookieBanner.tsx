"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "vekaro-cookie-consent";
const CHANGE_EVENT = "vekaro-cookie-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return "pending";
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consent !== null) {
    return null;
  }

  const handle = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    // TODO: wire up to Google Consent Mode v2 once GA4 is integrated
  };

  return (
    <div className={styles.banner} role="dialog" aria-live="polite">
      <p className={styles.message}>{t("message")}</p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => handle("rejected")}>
          {t("reject")}
        </Button>
        <Button onClick={() => handle("accepted")}>{t("accept")}</Button>
      </div>
    </div>
  );
}
