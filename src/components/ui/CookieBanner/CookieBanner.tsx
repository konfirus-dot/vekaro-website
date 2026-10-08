"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./cookieSettings";
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
  // Set by a "Cookie settings" button (see cookieSettings.ts): shows the
  // banner again even though a choice is already stored.
  const [isReopened, setIsReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setIsReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (consent !== null && !isReopened) {
    return null;
  }

  const handle = (value: "accepted" | "rejected") => {
    setIsReopened(false);
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
