"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

/**
 * Navbar — Charles Adakole Consulting
 *
 * Behavior:
 * - Transparent over the hero; on scroll past 24px, fades to white with shadow
 * - Gold monogram anchors the wordmark
 * - Services dropdown links to anchor sections on the /services page
 *   (each pillar is a section of one long-form page, not a separate route)
 * - Mobile: right-side drawer with accordion sub-menus
 *
 * Integration:
 * - Ensure Montserrat is loaded globally (next/font)
 * - Hero must sit flush at top (no margin/padding above it)
 */

const BRAND = { gold: "#C9A227", goldHover: "#B8901C" };

// Services link to anchor sections on /services
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Strategic Direction", href: "/services#strategic-direction" },
      { label: "Systems & SOPs", href: "/services#systems-sops" },
      { label: "Leadership Architecture", href: "/services#leadership-architecture" },
      { label: "Ongoing Advisory", href: "/services#ongoing-advisory" },
      { label: "The Process", href: "/services#process" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleDropdownEnter = useCallback((label) => setOpenDropdown(label), []);
  const handleDropdownLeave = useCallback(() => setOpenDropdown(null), []);

  const textColor = scrolled ? "text-neutral-900" : "text-white";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled
            ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.12)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="px-6 md:px-10 lg:px-16 xl:px-24">
          <div
            className={[
              "flex items-center justify-between transition-all duration-300",
              scrolled ? "h-[84px]" : "h-[108px]",
            ].join(" ")}
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 rounded-sm group"
              aria-label="Charles Adakole — home"
              onClick={() => setMobileOpen(false)}
            >
              <span
                className={[
                  "font-bold tracking-[0.06em] whitespace-nowrap transition-colors duration-300",
                  scrolled ? "text-neutral-900" : "text-white",
                  "text-[16px] md:text-[18px] lg:text-[20px]",
                ].join(" ")}
              >
                CHARLES ADAKOLE
              </span>

              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-500 group-hover:rotate-45"
              >
                <circle cx="14" cy="14" r="13" fill={BRAND.gold} />
                <path
                  d="M9 14 L12.5 17.5 L19 10.5"
                  stroke="#111111"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-2" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const hasChildren = !!item.children;
                const isOpen = openDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={[
                        "group relative inline-flex items-center gap-2 px-4 py-3 text-[15px] font-semibold tracking-[0.03em] rounded-sm transition-colors duration-200",
                        textColor,
                        "hover:text-[#C9A227] focus:text-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40",
                      ].join(" ")}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown
                          className={[
                            "w-4 h-4 transition-transform duration-200",
                            isOpen ? "rotate-180" : "",
                          ].join(" ")}
                          strokeWidth={2.5}
                          style={{ color: BRAND.gold }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="pointer-events-none absolute left-4 right-4 bottom-1.5 h-[2px] bg-[#C9A227] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </Link>

                    {hasChildren && isOpen && (
                      <div className="absolute left-0 top-full pt-3 min-w-[340px]" role="menu">
                        <div className="bg-white border-t-2 border-[#C9A227] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.20)] rounded-b-sm py-3 animate-in fade-in slide-in-from-top-1 duration-200">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              role="menuitem"
                              className="block px-6 py-3 text-[14.5px] text-neutral-800 hover:text-[#C9A227] hover:bg-neutral-50 focus:bg-neutral-50 focus:text-[#C9A227] focus:outline-none transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className={[
                  "group inline-flex items-center gap-2 px-7 py-3 rounded-full text-[12.5px] font-semibold tracking-[0.16em] uppercase transition-all duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A227]",
                  scrolled
                    ? "bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 shadow-sm hover:shadow-md focus-visible:ring-offset-white"
                    : "bg-white/10 hover:bg-[#C9A227] text-white hover:text-neutral-900 border border-white/40 hover:border-[#C9A227] backdrop-blur-sm focus-visible:ring-offset-transparent",
                ].join(" ")}
              >
                Book a Strategy Session
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={[
                "lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-sm transition-colors",
                textColor,
                "hover:text-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40",
              ].join(" ")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={[
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={[
            "absolute top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 h-[84px] border-b border-neutral-200">
            <span className="text-[17px] font-bold tracking-[0.06em] text-neutral-900">
              CHARLES ADAKOLE
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 inline-flex items-center justify-center text-neutral-900 hover:text-[#C9A227] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile primary">
            <ul className="space-y-0">
              {NAV_ITEMS.map((item) => (
                <MobileNavItem key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-neutral-200">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A227]"
            >
              Book a Strategy Session
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileNavItem = ({ item, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!item.children;

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex items-center justify-between py-4 text-[17px] font-semibold text-neutral-900 hover:text-[#C9A227] transition-colors border-b border-neutral-100"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-[17px] font-semibold text-neutral-900 hover:text-[#C9A227] transition-colors border-b border-neutral-100 focus:outline-none"
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown
          className={["w-5 h-5 transition-transform duration-200", expanded ? "rotate-180" : ""].join(" ")}
          strokeWidth={2.5}
          style={{ color: BRAND.gold }}
          aria-hidden="true"
        />
      </button>
      <div
        className={[
          "overflow-hidden transition-[max-height] duration-300 ease-out",
          expanded ? "max-h-[600px]" : "max-h-0",
        ].join(" ")}
      >
        <ul className="py-2 pl-4 border-l-2 border-[#C9A227]/40 ml-1 my-2">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block py-3 pl-3 text-[15px] text-neutral-700 hover:text-[#C9A227] transition-colors"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Navbar;