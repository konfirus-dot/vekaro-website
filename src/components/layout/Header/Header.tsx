"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BookMenu } from "./BookMenu";
import { Logo } from "@/components/ui/Logo/Logo";
import styles from "./Header.module.css";

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
  const [isServicesDropdownForceHidden, setIsServicesDropdownForceHidden] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // The "Oferta" dropdown opens on CSS :hover/:focus-within, not JS state —
  // clicking "Oferta" or one of the service links inside it doesn't move the
  // cursor away, and the click also focuses the link, so both conditions stay
  // true and the dropdown stays stuck open (the header persists across page
  // navigations, so it stays open on the new page too). Force it shut for the
  // rest of this hover session; it resets the moment the mouse actually
  // leaves, so the very next real hover behaves normally again.
  const closeServicesDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    setIsServicesDropdownForceHidden(true);
    event.currentTarget.blur();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLLED_THRESHOLD);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: highlight whichever nav section is currently passing through
  // a thin band near the vertical center of the viewport. The highlight
  // stays on through the non-nav sections in between (Advantages,
  // PromoBanner); when a section drops back below the band while scrolling
  // up, it hands off to the previous nav section — or to none above the
  // first one, so the Hero area has nothing highlighted.
  useEffect(() => {
    const sections = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            setActiveSection(id);
            return;
          }

          const bandTop = entry.rootBounds?.top ?? 0;
          if (entry.boundingClientRect.top >= bandTop) {
            const index = sections.findIndex((section) => section.id === id);
            const previousId = index > 0 ? sections[index - 1].id : null;
            setActiveSection((current) => (current === id ? previousId : current));
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
            <div
              className={
                isServicesDropdownForceHidden
                  ? `${styles.navItem} ${styles.dropdownForceHidden}`
                  : styles.navItem
              }
              onMouseLeave={() => setIsServicesDropdownForceHidden(false)}
            >
              <Link href="/#services" className={navLinkClass("services")} onClick={closeServicesDropdown}>
                {t("services")}
              </Link>

              <div className={styles.servicesDropdown}>
                <div className={styles.servicesDropdownInner}>
                  <Link
                    href="/services/short-term"
                    className={styles.servicesDropdownLink}
                    onClick={closeServicesDropdown}
                  >
                    {tRentalTypes("shortTerm.title")}
                  </Link>
                  <Link
                    href="/services/long-term"
                    className={styles.servicesDropdownLink}
                    onClick={closeServicesDropdown}
                  >
                    {tRentalTypes("longTerm.title")}
                  </Link>
                  <Link
                    href="/services/business"
                    className={styles.servicesDropdownLink}
                    onClick={closeServicesDropdown}
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
              <LanguageSwitcher />
            </div>
          </nav>
        </div>

        <div className={styles.contacts}>
          <div className={styles.desktopContacts}>
            <LanguageSwitcher />
          </div>
          <BookMenu />
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
