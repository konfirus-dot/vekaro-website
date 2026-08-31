import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  block?: boolean;
  onClick?: () => void;
  className?: string;
};

// tel:/mailto:/http(s): links stay plain <a> tags; anything else is treated
// as an internal route and goes through next-intl's locale-aware Link.
const EXTERNAL_HREF_PATTERN = /^(tel:|mailto:|https?:)/;

export function Button({
  children,
  href,
  variant = "primary",
  block = false,
  onClick,
  className,
}: ButtonProps) {
  const classes = [styles.button, styles[variant], block ? styles.block : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (EXTERNAL_HREF_PATTERN.test(href)) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
