"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FleetVehicle } from "./fleetData";
import { VehicleDetailsModal } from "./VehicleDetailsModal";
import styles from "./Fleet.module.css";

// Clicking anywhere on the card opens the vehicle details modal. The card
// itself stays a <div> (a <button> can't contain the heading); the arrow is
// the real <button>, so keyboard and screen-reader users get the same action.
export function FleetCard({
  vehicle,
  headingLevel = 3,
}: {
  vehicle: FleetVehicle;
  // Keeps the document outline gap-free: h3 under the homepage "Nasza flota"
  // h2, h2 on service pages where the cards follow the h1 directly.
  headingLevel?: 2 | 3;
}) {
  const t = useTranslations("fleet");
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const name = t(`${vehicle.key}.name`);

  const wasOpen = useRef(false);

  // Return focus to the card's button once the modal has actually closed
  // (whether it was opened from the button or from a click elsewhere on the
  // card). Doing it inside the close handler is too early: the modal <dialog>
  // is still open then and the rest of the page is inert, so focus() is
  // ignored.
  useEffect(() => {
    if (wasOpen.current && !isOpen) triggerRef.current?.focus();
    wasOpen.current = isOpen;
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <div className={styles.fleetCard} onClick={() => setIsOpen(true)}>
        <div className={styles.fleetTop}>
          <Heading className={styles.fleetName}>{name}</Heading>
          <span className={styles.fleetPrice}>{t(`${vehicle.key}.priceFrom`)}</span>
        </div>

        <div className={styles.fleetImageWrap}>
          {/* image is null until a real photo of this exact model exists
              (see fleetData.ts): the area keeps its size but stays empty. */}
          {vehicle.image && (
            <Image
              src={vehicle.image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={styles.fleetImage}
            />
          )}
        </div>

        <button
          ref={triggerRef}
          type="button"
          className={styles.fleetArrow}
          aria-haspopup="dialog"
          aria-label={t("modal.openDetails", { name })}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(true);
          }}
        >
          <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      {isOpen && <VehicleDetailsModal vehicle={vehicle} onClose={close} />}
    </>
  );
}
