"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path
        d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LanguageSwitcherProps = {
  // "up" opens the dropdown above the trigger instead of below it — needed
  // for instances near the bottom of the viewport (e.g. the footer copy),
  // where a downward dropdown would overflow off-screen.
  direction?: "down" | "up";
};

export function LanguageSwitcher({ direction = "down" }: LanguageSwitcherProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChange = (loc: Locale) => {
    setIsOpen(false);
    if (loc === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: loc });
    });
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={isPending ? `${styles.trigger} ${styles.pending}` : styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t("language")}: ${locale.toUpperCase()}`}
        disabled={isPending}
        onClick={() => setIsOpen((v) => !v)}
      >
        <GlobeIcon />
      </button>

      {isOpen && (
        <ul
          className={direction === "up" ? `${styles.dropdown} ${styles.dropdownUp}` : styles.dropdown}
          role="listbox"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                className={loc === locale ? `${styles.option} ${styles.active}` : styles.option}
                role="option"
                aria-selected={loc === locale}
                onClick={() => handleChange(loc)}
              >
                {loc.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
