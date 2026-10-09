"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { Car, Cog, Fuel, Phone, Users, X, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PHONE_HREF, TELEGRAM_HREF, WHATSAPP_HREF } from "@/lib/constants";
import type { FleetVehicle } from "./fleetData";
import styles from "./VehicleDetailsModal.module.css";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  vehicle: FleetVehicle;
  onClose: () => void;
};

// Vehicle details in a native modal <dialog> (top layer: no z-index fights
// with the sticky header, background made inert by the browser). Mount it
// only while open; it opens itself on mount. Adds what the native element
// doesn't fully cover: a strict Tab focus trap, backdrop-click close, page
// scroll lock, and syncing Escape with the parent's state. Focus restoration
// is done by the parent (it owns the trigger button).
export function VehicleDetailsModal({ vehicle, onClose }: Props) {
  const t = useTranslations("fleet");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const { key, image, specs } = vehicle;
  const name = t(`${key}.name`);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Start focus on the title (announced by screen readers, no focus ring on
    // the close button for mouse users); Tab then moves into the controls.
    titleRef.current?.focus();

    // Lock page scroll. <html> is the scroller here (it has overflow-x set),
    // so locking <body> alone wouldn't stop it.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // Clicks on the ::backdrop are reported on the <dialog> itself; clicks on
  // the content land on its children.
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  // Fuel, gearbox and seats are always listed (UNCONFIRMED shows a "to be
  // confirmed" note instead of a guessed value); body type only once known.
  const toConfirm = t("modal.toConfirm");
  const rows: { icon: LucideIcon; label: string; value: string }[] = [
    {
      icon: Fuel,
      label: t("modal.fuel"),
      value: specs.fuel ? t(`specValues.fuel.${specs.fuel}`) : toConfirm,
    },
    {
      icon: Cog,
      label: t("modal.transmission"),
      value: specs.transmission ? t(`specValues.transmission.${specs.transmission}`) : toConfirm,
    },
    {
      icon: Users,
      label: t("modal.seats"),
      value: specs.seats ? String(specs.seats) : toConfirm,
    },
  ];
  if (specs.bodyType)
    rows.push({
      icon: Car,
      label: t("modal.bodyType"),
      value: t(`specValues.bodyType.${specs.bodyType}`),
    });

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Escape: keep the parent's open state in sync instead of letting the
        // browser close the element behind React's back.
        event.preventDefault();
        onClose();
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.layout}>
        <button type="button" className={styles.close} aria-label={t("modal.close")} onClick={onClose}>
          <X size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className={styles.scroll}>
          <div className={styles.media}>
            {image && (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className={styles.image}
              />
            )}
          </div>

          <div className={styles.info}>
            <h2 id={titleId} ref={titleRef} tabIndex={-1} className={styles.name}>
              {name}
            </h2>
            <span className={styles.price}>{t(`${key}.priceFrom`)}</span>
            <p className={styles.description}>{t(`${key}.description`)}</p>

            <dl className={styles.specList} aria-label={t("modal.specsTitle")}>
              {rows.map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.specRow}>
                  <dt>
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" className={styles.specIcon} />
                    {label}
                  </dt>
                  <dd className={value === toConfirm ? styles.specPending : undefined}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.actions}>
            <a href={PHONE_HREF} className={styles.callButton}>
              <Phone size={20} strokeWidth={1.8} aria-hidden="true" />
              {t("modal.call")}
            </a>
            {/* Icon-only messenger links (the SVGs carry their own brand
                background); the accessible name comes from aria-label. */}
            <a
              href={TELEGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messengerButton}
              aria-label={t("modal.telegram")}
            >
              <Image src="/icons/telegram.svg" alt="" width={52} height={52} />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messengerButton}
              aria-label={t("modal.whatsapp")}
            >
              <Image src="/icons/whatsapp.svg" alt="" width={52} height={52} />
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
