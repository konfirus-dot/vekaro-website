import styles from "./ServiceSteps.module.css";

// A step is either `{ title, text }` (bold title + short description) or a
// plain string for copy that has no title yet (Long-term / Business pages
// keep their existing one-line steps); a string renders as the description.
export type ServiceStep = string | { title: string; text: string };

// Numbered "How it works" steps shared by the three service pages. The page
// renders the section heading; this renders the <ol>.
export function ServiceSteps({ steps }: { steps: ServiceStep[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => {
        const key = typeof step === "string" ? step : step.title;
        return (
          <li key={key} className={styles.step}>
            {typeof step === "string" ? (
              <p className={styles.stepText}>{step}</p>
            ) : (
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
