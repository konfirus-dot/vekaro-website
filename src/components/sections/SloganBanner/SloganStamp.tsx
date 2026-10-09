"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./SloganBanner.module.css";

const STAMP_STAGGER_MS = 60;
const STAMP_DURATION_MS = 320;

type State = "pending" | "stamping" | "static";

// Point on the Hero car's entrance timeline (incl. its 0.1s delay) after
// which the banner may start. The ease-out curve has done ~90% of the motion
// by then, so the car already looks settled; waiting for the full 1.3s left
// the banner visibly empty.
const HERO_SETTLED_MS = 600;

// Resolves once the Hero car's entrance has visually settled (immediately if
// it already has, or if there is none: reduced motion, other pages), so the
// page animates in sequence: Hero first, then this banner.
function heroEntranceSettled(): Promise<void> {
  const car = document.querySelector("[data-hero-entrance]");
  const animation = car?.getAnimations()[0];
  const elapsed = Number(animation?.currentTime ?? Infinity);
  const remaining = animation?.playState === "running" ? HERO_SETTLED_MS - elapsed : 0;
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, remaining)));
}

// Headline words "stamp" onto the banner one after another the first time it
// scrolls into view on each page load, but not before the Hero's car has
// settled into place. Reduced-motion users get the static
// text. The full text is always in the DOM; words are only hidden visually
// until stamped.
export function SloganStamp({ lines, subtitle }: { lines: string[]; subtitle: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
          setState("static");
          return;
        }
        heroEntranceSettled().then(() => {
          if (!cancelled) setState("stamping");
        });
      },
      // Fire once most of the headline is on screen, so the stamp is actually
      // seen. (A margin-only trigger fired with just a few pixels visible
      // when the banner sat at the bottom edge of the first screen.)
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  let wordIndex = 0;
  const totalWords = lines.reduce((sum, line) => sum + line.split(" ").length, 0);
  const subtitleDelay = (totalWords - 1) * STAMP_STAGGER_MS + STAMP_DURATION_MS;

  return (
    <div ref={ref} className={styles.stamp} data-state={state}>
      <h2 className={styles.headline}>
        {lines.map((line) => (
          <span key={line} className={styles.line}>
            {line.split(" ").map((word, i, words) => {
              const delay = wordIndex++ * STAMP_STAGGER_MS;
              return (
                <span key={i}>
                  <span
                    className={styles.word}
                    style={{ animationDelay: `${delay}ms` } as CSSProperties}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              );
            })}
          </span>
        ))}
      </h2>
      <p className={styles.subtitle} style={{ animationDelay: `${subtitleDelay}ms` }}>
        {subtitle}
      </p>
    </div>
  );
}
