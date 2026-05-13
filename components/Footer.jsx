"use client";

import React from "react";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { FiArrowUpRight, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

/**
 * Footer — Charles Adakole Consulting
 *
 * Content (per brand brief):
 * - Brand: Charles Adakole Consulting
 * - Tagline: Strategic Advisor & Executive Coach for Business, Life, and Ministry
 * - Primary nav: About Us · Services · Contact
 * - Location: Abuja, Nigeria | Global Virtual Advisory
 * - Closing line: Establishing Clarity, Enabling Impact
 *
 * Visual system matches the rest of the site (dark, gold, Montserrat,
 * italic gold accents on key words, eyebrow hairlines, animated
 * origin-left underlines on interactive elements).
 *
 * Dependencies: react-icons (npm install react-icons)
 */

// ─── Data ────────────────────────────────────────────────────────────
const PRIMARY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_PILLARS = [
  {
    label: "Strategic Direction",
    href: "/services#strategic-direction",
  },
  {
    label: "Systems & SOPs",
    href: "/services#systems-sops",
  },
  {
    label: "Leadership Architecture",
    href: "/services#leadership-architecture",
  },
  {
    label: "Ongoing Advisory",
    href: "/services#ongoing-advisory",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Preferences", href: "/cookie-preferences" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "X (Twitter)", href: "https://x.com/", Icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: FaYoutube },
];

// ═══════════════════════════════════════════════════════════════════════
// Footer
// ═══════════════════════════════════════════════════════════════════════
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#0A0A0B] text-white overflow-hidden"
      style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Charles Adakole — site footer
      </h2>

      {/* Ambient warm glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(201,162,39,0.12), transparent 48%), radial-gradient(circle at 6% 95%, rgba(201,162,39,0.04), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Gold hairline transition at the very top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.6) 30%, rgba(201,162,39,0.8) 50%, rgba(201,162,39,0.6) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* ── Zone 1: Brand + tagline + CTA ────────────────────────── */}
        <div className="pt-20 md:pt-24 lg:pt-28 pb-14 md:pb-20 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand + tagline */}
            <div className="lg:col-span-7">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm mb-10 md:mb-14"
                aria-label="Charles Adakole — home"
              >
                <span className="text-[15px] md:text-[16px] font-bold tracking-[0.04em] text-white">
                  CHARLES ADAKOLE
                </span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-500 group-hover:rotate-45"
                >
                  <circle cx="11" cy="11" r="10" fill="#C9A227" />
                  <path
                    d="M7 11 L10 14 L15 8"
                    stroke="#0A0A0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-6">
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "#C9A227" }}
                />
                Strategic Advisory | Systems | Execution
              </p>

              <p className="font-light leading-[1.15] tracking-tight text-white text-[28px] md:text-[36px] lg:text-[44px] max-w-2xl">
                Turn Vision Into{" "}
                <span
                  className="italic font-normal"
                  style={{ color: "#C9A227" }}
                >
                  Structured Execution
                </span>
                .
              </p>

              <p className="mt-6 md:mt-8 text-[14.5px] md:text-[15px] leading-[1.75] text-white/65 max-w-lg">
                Helping founders, executives, and ministry leaders build systems
                and structure to execute consistently and scale without chaos.
              </p>
            </div>

            {/* Contact CTA card */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-6">
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "#C9A227" }}
                />
                Ready to build structure?
              </p>

              <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/70 mb-8 max-w-md">
                If your organization is growing but execution is still
                inconsistent, it&apos;s time to build the structure that makes
                scale possible.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#C9A227] transition-all duration-300"
              >
                Book a Strategy Session
                <FiArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>

              {/* Contact anchors */}
              <div className="mt-10 space-y-1.5">
                <FooterMetaLine
                  Icon={FiMapPin}
                  label="Location"
                  value="Abuja, Nigeria · Global Virtual Advisory"
                />
                <FooterContactLink
                  Icon={FiMail}
                  label="Email"
                  value="hello@charlesadakole.com"
                  href="mailto:hello@charlesadakole.com"
                />
                <FooterContactLink
                  Icon={FiPhone}
                  label="Schedule"
                  value="Book a call"
                  href="/contact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Zone 2: Navigation ────────────────────────────────────── */}
        <div className="py-14 md:py-16 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Primary nav */}
            <nav aria-label="Footer primary" className="md:col-span-4">
              <h3 className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#C9A227] mb-6">
                <span
                  className="inline-block w-6 h-px"
                  style={{ backgroundColor: "#C9A227" }}
                />
                Explore
              </h3>
              <ul className="space-y-4">
                {PRIMARY_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink {...link} size="lg" />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Service pillars */}
            <nav aria-label="Footer services" className="md:col-span-5">
              <h3 className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#C9A227] mb-6">
                <span
                  className="inline-block w-6 h-px"
                  style={{ backgroundColor: "#C9A227" }}
                />
                Core Services
              </h3>
              <ul className="space-y-3.5">
                {SERVICE_PILLARS.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <div className="md:col-span-3">
              <h3 className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#C9A227] mb-6">
                <span
                  className="inline-block w-6 h-px"
                  style={{ backgroundColor: "#C9A227" }}
                />
                Follow
              </h3>
              <ul className="flex items-center flex-wrap gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/80 hover:bg-[#C9A227] hover:border-[#C9A227] hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/60 transition-all duration-300"
                    >
                      <Icon className="w-[13px] h-[13px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[12px] leading-[1.6] text-white/50 max-w-[220px]">
                Follow for insights on strategy, execution, and operational
                leadership.
              </p>
            </div>
          </div>
        </div>

        {/* ── Zone 3: Legal + copyright ────────────────────────────── */}
        <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <LegalLink {...link} />
              </li>
            ))}
          </ul>

          <p className="text-[11.5px] text-white/45 md:text-right">
            © {currentYear} Charles Adakole.{" "}
            <span className="hidden md:inline" aria-hidden="true">
              ·{" "}
            </span>
            <span className="block md:inline mt-1 md:mt-0">
              Strategic Advisory | Systems | Execution.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════════

const FooterNavLink = ({ label, href, size = "md" }) => {
  const sizeClass =
    size === "lg"
      ? "text-[17px] md:text-[18px] font-light text-white"
      : "text-[14px] text-white/75";
  return (
    <Link
      href={href}
      className={`group relative inline-block ${sizeClass} hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm transition-colors duration-200`}
    >
      <span className="relative">
        {label}
        <span
          className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[400ms] ease-out"
          style={{ backgroundColor: "#C9A227" }}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
};

const FooterContactLink = ({ Icon, label, value, href }) => (
  <Link
    href={href}
    className="group flex items-center gap-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm"
  >
    <Icon
      className="shrink-0 w-4 h-4 text-[#C9A227] transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    />
    <span className="flex items-baseline gap-2 flex-wrap">
      <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-300">
        {label}
      </span>
      <span className="text-[14px] text-white/85 group-hover:text-[#C9A227] transition-colors duration-300 flex items-center gap-1.5">
        {value}
        <FiArrowUpRight
          className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          aria-hidden="true"
        />
      </span>
    </span>
  </Link>
);

const FooterMetaLine = ({ Icon, label, value }) => (
  <div className="flex items-center gap-3 py-2">
    <Icon className="shrink-0 w-4 h-4 text-[#C9A227]" aria-hidden="true" />
    <span className="flex items-baseline gap-2 flex-wrap">
      <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/40">
        {label}
      </span>
      <span className="text-[14px] text-white/85">{value}</span>
    </span>
  </div>
);

const LegalLink = ({ label, href }) => (
  <Link
    href={href}
    className="group relative text-[10.5px] font-semibold tracking-[0.16em] uppercase text-white/60 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm transition-colors duration-200"
  >
    <span className="relative">
      {label}
      <span
        className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[400ms] ease-out"
        style={{ backgroundColor: "#C9A227" }}
        aria-hidden="true"
      />
    </span>
  </Link>
);

export default Footer;