"use client";

import { Button } from "@/components/ui/Button/Button";
import { openCookieSettings } from "./cookieSettings";

type CookieSettingsButtonProps = {
  label: string;
  // "text" is a bare <button> styled by the caller (footer link row);
  // "button" reuses the site's secondary Button (privacy policy page).
  appearance?: "text" | "button";
  className?: string;
};

export function CookieSettingsButton({ label, appearance = "text", className }: CookieSettingsButtonProps) {
  if (appearance === "button") {
    return (
      <Button variant="secondary" onClick={openCookieSettings} className={className}>
        {label}
      </Button>
    );
  }

  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      {label}
    </button>
  );
}
