import styles from "./ServiceInfoCards.module.css";

// A bullet is either `{ lead, text }`, rendered as "<strong>lead</strong> - text"
// (only the opening phrase bold), or a plain string for copy that has no
// lead phrase yet (Long-term / Business pages keep their existing text).
export type ServiceInfoCardItem = string | { lead: string; text: string };

export type ServiceInfoCard = { title: string; items: ServiceInfoCardItem[] };

// The pair of grey info cards ("When to rent" / "Why Vekaro") shared by the
// three service pages. Each page passes its own headings and bullets.
export function ServiceInfoCards({ cards }: { cards: ServiceInfoCard[] }) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <div key={card.title} className={styles.card}>
          {/* <h2> keeps the page's document outline; sized as a card title. */}
          <h2 className={styles.title}>{card.title}</h2>
          <ul className={styles.list}>
            {card.items.map((item) =>
              typeof item === "string" ? (
                <li key={item}>{item}</li>
              ) : (
                <li key={item.lead}>
                  <strong>{item.lead}</strong> - {item.text}
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
