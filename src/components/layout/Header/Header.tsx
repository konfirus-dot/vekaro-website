"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "@/components/ui/Logo/Logo";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/constants";
import styles from "./Header.module.css";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Rendered twice: once inside the mobile dropdown, once in the always-visible
// desktop row — see .navContacts / .desktopContacts in Header.module.css.
function ContactControls() {
  return (
    <>
      <LanguageSwitcher />
      <a href={PHONE_HREF} className={styles.iconLink} aria-label={PHONE_DISPLAY}>
        <PhoneIcon />
      </a>
      <a
        href={WHATSAPP_HREF}
        className={styles.iconLink}
        aria-label="WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ChatIcon />
      </a>
    </>
  );
}

const NAV_SECTION_IDS = ["services", "about", "contact"] as const;

// backdrop-filter: blur(40px) needs real rendered pixels above the header to
// sample from. Near the very top of the document there aren't enough of
// them yet, so the browser blends in transparent/white at the sampling
// edge — the header briefly renders as a light gray band instead of a
// translucent black one. Delaying the translucent+blurred `.scrolled`
// state until there's enough scrolled distance for the blur to have full
// coverage avoids the artifact entirely; verified empirically that it
// clears up by scrollY 100 (still gray at 60, clean at 100). No visible
// tradeoff: for that first 100px the header sits over the Hero section,
// which is solid black too, so the plain opaque header is indistinguishable
// from the translucent one anyway.
const SCROLLED_THRESHOLD = 100;

export function Header() {
  const t = useTranslations("nav");
  const tRentalTypes = useTranslations("rentalTypes");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLLED_THRESHOLD);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: highlight whichever nav section is currently passing through
  // a thin band near the vertical center of the viewport.
  useEffect(() => {
    const sections = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const navLinkClass = (id: string) =>
    pathname === "/" && activeSection === id
      ? `${styles.navLink} ${styles.navLinkActive}`
      : styles.navLink;

  // The Next.js build tooling currently mangles `backdrop-filter` declared in
  // CSS Modules (drops the unprefixed property, keeps only a `-webkit-`
  // version modern Chrome no longer honors) — set it inline instead, which
  // bypasses that transform entirely.
  const blurStyle = isScrolled
    ? ({ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" } as React.CSSProperties)
    : undefined;

  return (
    <header
      className={
        isScrolled ? `${styles.header} ${styles.scrolled} theme-dark` : `${styles.header} theme-dark`
      }
      style={blurStyle}
    >
      <Container className={styles.bar}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Logo />
            <span>Vekaro</span>
          </Link>

          <nav className={isOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
            <div className={styles.navItem}>
              <Link href="/#services" className={navLinkClass("services")} onClick={closeMenu}>
                {t("services")}
              </Link>

              <div className={styles.servicesDropdown}>
                <div className={styles.servicesDropdownInner}>
                  <Link
                    href="/services/short-term"
                    className={styles.servicesDropdownLink}
                    onClick={closeMenu}
                  >
                    {tRentalTypes("shortTerm.title")}
                  </Link>
                  <Link
                    href="/services/long-term"
                    className={styles.servicesDropdownLink}
                    onClick={closeMenu}
                  >
                    {tRentalTypes("longTerm.title")}
                  </Link>
                  <Link
                    href="/services/business"
                    className={styles.servicesDropdownLink}
                    onClick={closeMenu}
                  >
                    {tRentalTypes("business.title")}
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/#about" className={navLinkClass("about")} onClick={closeMenu}>
              {t("about")}
            </Link>
            <Link href="/#contact" className={navLinkClass("contact")} onClick={closeMenu}>
              {t("contact")}
            </Link>

            <div className={styles.navContacts}>
              <ContactControls />
            </div>
          </nav>
        </div>

        <div className={styles.contacts}>
          <div className={styles.desktopContacts}>
            <ContactControls />
          </div>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={isOpen}
            aria-label={t("menuToggle")}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>
    </header>
  );
}
