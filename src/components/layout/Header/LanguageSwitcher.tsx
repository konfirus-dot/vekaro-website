"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

// Display labels differ from locale codes: Ukrainian's ISO 639-1 code is
// "uk", but visitors expect the country-style "UA".
const LOCALE_LABELS: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
  uk: "UA",
};

type LanguageSwitcherProps = {
  // "up" opens the dropdown above the trigger instead of below it — needed
  // for instances near the bottom of the viewport (e.g. the footer copy),
  // where a downward dropdown would overflow off-screen.
  direction?: "down" | "up";
};

export function LanguageSwitcher({ direction = "down" }: LanguageSwitcherProps) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // True while the mouse is over the switcher and opened it, so a click on the
  // trigger in that state doesn't toggle the list shut under the cursor.
  const openedByHoverRef = useRef(false);

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

  // Hover-to-open is for real mouse pointers only; touch devices fire
  // emulated mouseenter on tap, which would fight the click toggle.
  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMouseEnter = () => {
    if (!canHover() || isOpen) return;
    openedByHoverRef.current = true;
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!canHover()) return;
    openedByHoverRef.current = false;
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    if (openedByHoverRef.current) return;
    setIsOpen((v) => !v);
  };

  const handleChange = (loc: Locale) => {
    openedByHoverRef.current = false;
    setIsOpen(false);
    if (loc === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: loc });
    });
  };

  return (
    <div
      className={styles.root}
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={isPending ? `${styles.trigger} ${styles.pending}` : styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t("language")}: ${LOCALE_LABELS[locale]}`}
        disabled={isPending}
        onClick={handleTriggerClick}
      >
        <span>{LOCALE_LABELS[locale]}</span>
        <span className={isOpen ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}>
          <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <ul
          className={[
            styles.dropdown,
            direction === "up" ? styles.dropdownUp : "",
          ]
            .filter(Boolean)
            .join(" ")}
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
                {LOCALE_LABELS[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
