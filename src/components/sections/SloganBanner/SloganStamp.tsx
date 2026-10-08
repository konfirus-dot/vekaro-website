"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./SloganBanner.module.css";

const STAMP_STAGGER_MS = 60;
const STAMP_DURATION_MS = 320;

type State = "pending" | "stamping" | "static";

// Headline words "stamp" onto the banner one after another the first time it
// scrolls into view on each page load. Reduced-motion users get the static
// text. The full text is always in the DOM; words are only hidden visually
// until stamped.
export function SloganStamp({ lines, subtitle }: { lines: string[]; subtitle: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setState(reducedMotion ? "static" : "stamping");
      },
      // Fire once the headline is a little way into the viewport, so the
      // stamp is actually seen rather than playing just off-screen.
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
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
