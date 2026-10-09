"use client";

import { Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PHONE_DISPLAY, PHONE_HREF, TELEGRAM_HREF, WHATSAPP_HREF } from "@/lib/constants";
import styles from "./BookMenu.module.css";

function ContactOptions({ onSelect }: { onSelect: () => void }) {
  const t = useTranslations("nav");

  return (
    <ul className={styles.options}>
      <li>
        <a href={PHONE_HREF} className={styles.option} onClick={onSelect}>
          <span className={styles.phoneBadge}>
            <Phone size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className={styles.optionText}>
            <span className={styles.optionLabel}>{t("bookCall")}</span>
            <span className={styles.optionDetail}>{PHONE_DISPLAY}</span>
          </span>
        </a>
      </li>
      <li>
        <a
          href={WHATSAPP_HREF}
          className={styles.option}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSelect}
        >
          <Image src="/icons/whatsapp.svg" alt="" width={36} height={36} />
          <span className={styles.optionLabel}>WhatsApp</span>
        </a>
      </li>
      <li>
        <a
          href={TELEGRAM_HREF}
          className={styles.option}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSelect}
        >
          <Image src="/icons/telegram.svg" alt="" width={36} height={36} />
          <span className={styles.optionLabel}>Telegram</span>
        </a>
      </li>
    </ul>
  );
}

// Header "book" CTA: opens a list of contact channels instead of dialing
// directly. Desktop gets a popover anchored under the button; mobile gets a
// bottom sheet. Both are rendered while open and CSS shows the right one per
// breakpoint. The sheet is portaled to <body> because the header has
// `transform: translateZ(0)`, which turns it into the containing block for
// `position: fixed` descendants — a sheet left inside it would pin to the
// header instead of the viewport.
type BookMenuProps = {
  // "large" is the Hero CTA: same pill, bigger and full-width below 1024px.
  size?: "default" | "large";
  // "left" anchors the desktop popover to the trigger's left edge (opens
  // rightward), for triggers near the left side of the page like the Hero.
  align?: "left" | "right";
  // Header only: on phones the pill becomes a bare phone icon matching the
  // menu toggle next to it (the label stays for screen readers).
  iconOnMobile?: boolean;
};

export function BookMenu({ size = "default", align = "right", iconOnMobile = false }: BookMenuProps) {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || sheetRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className={size === "large" ? `${styles.root} ${styles.rootLarge}` : styles.root} ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className={[
          styles.trigger,
          size === "large" && styles.triggerLarge,
          iconOnMobile && styles.triggerIconOnMobile,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <Phone size={size === "large" ? 20 : 18} strokeWidth={1.8} aria-hidden="true" />
        <span className={styles.label}>{t("book")}</span>
      </button>

      {isOpen && (
        <div
          // Always dark (like the header it was designed for), so it reads the
          // same when the trigger sits on a light page such as a service Hero.
          className={`${styles.popover}${align === "left" ? ` ${styles.popoverAlignLeft}` : ""} theme-dark`}
          role="dialog" aria-label={t("bookMenuTitle")}>
          <p className={styles.title}>{t("bookMenuTitle")}</p>
          <ContactOptions onSelect={close} />
        </div>
      )}

      {isOpen &&
        createPortal(
          <div className={styles.sheetLayer}>
            <div className={styles.backdrop} aria-hidden="true" />
            <div className={`${styles.sheet} theme-dark`} ref={sheetRef} role="dialog" aria-label={t("bookMenuTitle")}>
              <div className={styles.sheetHeader}>
                <p className={styles.title}>{t("bookMenuTitle")}</p>
                <button type="button" className={styles.close} aria-label={t("close")} onClick={close}>
                  <X size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <ContactOptions onSelect={close} />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
