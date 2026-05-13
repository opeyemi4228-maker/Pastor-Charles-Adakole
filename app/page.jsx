"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { FiX, FiArrowRight, FiCheck } from "react-icons/fi";

import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsLetterx from "@/components/NewsLetterx";

/**
 * Home — Charles Adakole & Co
 *
 * Single-file homepage with inline CookieBanner + NewsLetter.
 *
 * Behavior:
 * - NewsLetter: pops up on EVERY page load (after a 1.2s settle delay).
 *   Dismissable per session — won't nag within the same session but returns
 *   fresh on the next page load / new session.
 * - CookieBanner: appears on visits 1, 5, 9, 13… (every 4th page load).
 *   Visit count persisted in localStorage under "cac.visitCount". The first
 *   visit always shows the banner (legal requirement); then every 4th after.
 *   Consent choice persisted under "cac.cookieConsent".
 *
 * SEO:
 * - JSON-LD (Organization + ProfessionalService + WebSite) via <Script>
 * - Keyboard skip-link for accessibility
 * - For <title>, canonical, and OG tags, keep a metadata export in your
 *   app/layout.js (server component) — this page is client-interactive.
 *
 * Dependencies: react-icons  (npm install react-icons)
 */

// ═══════════════════════════════════════════════════════════════════════
// Storage keys + constants
// ═══════════════════════════════════════════════════════════════════════
const STORAGE = {
  visitCount: "cac.visitCount",
  cookieConsent: "cac.cookieConsent",
  newsletterDismissedSession: "cac.newsletterDismissed",
};

const COOKIE_INTERVAL = 4; // banner shows on visits where count % 4 === 1
const NEWSLETTER_DELAY_MS = 1200;
const COOKIE_DELAY_MS = 600;

// ═══════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

const safeGet = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key, value, store = "local") => {
  try {
    if (store === "session") window.sessionStorage.setItem(key, value);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};
const safeGetSession = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════════════
// JSON-LD structured data
// ═══════════════════════════════════════════════════════════════════════
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://charlesadakole.com/#organization",
      name: "Charles Adakole",
      url: "https://charlesadakole.com",
      logo: {
        "@type": "ImageObject",
        url: "https://charlesadakole.com/logo.png",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.linkedin.com/company/charles-adakole",
        "https://x.com/charlesadakole",
      ],
      foundingDate: "2018",
      founder: { "@type": "Person", name: "Charles Adakole" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://charlesadakole.com/#service",
      name: "Charles Adakole — Strategic Advisory",
      parentOrganization: { "@id": "https://charlesadakole.com/#organization" },
      description:
        "Strategic advisor helping founders, executives, and ministry leaders build systems and structure to execute consistently and scale without chaos.",
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Place", name: "Global" },
      ],
      serviceType: [
        "Strategic Direction",
        "Systems & SOPs",
        "Leadership Architecture",
        "Ongoing Advisory",
      ],
      priceRange: "$$$$",
    },
    {
      "@type": "WebSite",
      "@id": "https://charlesadakole.com/#website",
      url: "https://charlesadakole.com",
      name: "Charles Adakole",
      publisher: { "@id": "https://charlesadakole.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// NewsLetter — floating bottom-right, appears on every page load
// ═══════════════════════════════════════════════════════════════════════
const NewsLetter = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);

    // Session-scoped dismissal: if user closed it this session, don't re-show
    if (safeGetSession(STORAGE.newsletterDismissedSession)) return;

    const t = setTimeout(() => setVisible(true), NEWSLETTER_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleDismiss = () => {
    safeSet(STORAGE.newsletterDismissedSession, "1", "session");
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage-floater" }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setTimeout(() => setVisible(false), 3200);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-heading"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[55] w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[420px] animate-[floatIn_600ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
    >
      <style jsx>{`
        @keyframes floatIn {
          from { transform: translate(20px, 20px) scale(0.96); opacity: 0; }
          to { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="dialog"] { animation: none !important; }
        }
      `}</style>

      <div className="relative bg-[#0F0F10] text-white rounded-sm shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden border border-white/5">
        {/* Top gold hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C9A227 20%, #DEBB3F 50%, #C9A227 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {/* Corner flourish */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-[0.08]"
          style={{ backgroundColor: "#C9A227" }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close newsletter signup"
          className="absolute top-4 right-4 z-10 w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/60 transition-colors"
        >
          <FiX className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="relative px-7 pt-9 pb-7">
          {status === "success" ? (
            <div
              className="flex flex-col items-start"
              style={{ animation: "fadeIn 400ms ease-out forwards" }}
              role="status"
              aria-live="polite"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#C9A227" }}
              >
                <FiCheck className="w-6 h-6 text-neutral-900" strokeWidth={3} aria-hidden="true" />
              </div>
              <h2 id="newsletter-heading" className="text-[18px] font-light leading-tight text-white mb-2">
                You&apos;re on the list.
              </h2>
              <p className="text-[13px] leading-relaxed text-neutral-300">
                Thank you — our next edition of{" "}
                <span style={{ color: "#C9A227" }}>The Quarterly</span> will arrive in your inbox.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[10.5px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-3">
                <span className="inline-block w-6 h-px bg-[#C9A227] align-middle mr-3" />
                The Quarterly
              </p>
              <h2
                id="newsletter-heading"
                className="text-[22px] md:text-[24px] font-light leading-[1.2] tracking-tight text-white mb-3"
              >
                Perspectives from our{" "}
                <span className="italic" style={{ color: "#C9A227" }}>senior advisors</span>.
              </h2>
              <p className="text-[13px] leading-relaxed text-neutral-300 mb-5">
                A quarterly brief on strategy, leadership, and the forces reshaping enterprise
                — curated for principals who decide.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>

                <div className="relative flex items-stretch rounded-full border border-white/20 focus-within:border-[#C9A227] transition-colors duration-200 overflow-hidden bg-white/[0.03]">
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setErrorMsg("");
                      }
                    }}
                    disabled={status === "submitting"}
                    aria-invalid={!!errorMsg}
                    aria-describedby={errorMsg ? "newsletter-error" : undefined}
                    className="flex-1 min-w-0 bg-transparent px-5 py-3 text-[13.5px] text-white placeholder:text-neutral-500 focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group shrink-0 inline-flex items-center gap-1.5 px-5 py-3 bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11px] font-semibold tracking-[0.14em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F10] focus-visible:ring-[#C9A227] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <span
                          className="w-3.5 h-3.5 rounded-full border-2 border-neutral-900/40 border-t-neutral-900 animate-spin"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Subscribing…</span>
                      </>
                    ) : (
                      <>
                        Sign Up
                        <FiArrowRight
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>

                {errorMsg && (
                  <p id="newsletter-error" role="alert" className="text-[12px] text-red-400 pl-1">
                    {errorMsg}
                  </p>
                )}

                <p className="text-[10.5px] leading-relaxed text-neutral-500 pt-1">
                  By subscribing, you agree to our privacy practices. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CookieBanner — appears every 4th visit (visits 1, 5, 9, …)
// ═══════════════════════════════════════════════════════════════════════
const CookieBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Increment visit counter on every page load
    const currentCount = parseInt(safeGet(STORAGE.visitCount) || "0", 10) + 1;
    safeSet(STORAGE.visitCount, String(currentCount));

    // Show on visits where count % 4 === 1 → visits 1, 5, 9, 13 …
    // First visit always shows (legal requirement); reappears every 4th after.
    const shouldShow = currentCount % COOKIE_INTERVAL === 1;

    if (shouldShow) {
      const t = setTimeout(() => setVisible(true), COOKIE_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, []);

  const persist = (value) => {
    safeSet(STORAGE.cookieConsent, value);
    try {
      window.dispatchEvent(
        new CustomEvent("cookie-consent-change", { detail: { consent: value } })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[60] animate-[slideUp_500ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
    >
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="dialog"] { animation: none !important; }
        }
      `}</style>

      <div className="bg-[#0F0F10] text-neutral-200 border-t-2 border-[#C9A227]/80 shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.45)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-6 md:py-7">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex items-start gap-4 flex-1">
              <div
                className="shrink-0 w-10 h-10 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-[#C9A227] text-lg">🍪</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id="cookie-banner-title"
                  className="text-[13px] font-semibold tracking-[0.14em] uppercase text-white mb-2"
                >
                  Your Privacy Matters
                </h2>
                <p id="cookie-banner-desc" className="text-[13.5px] leading-relaxed text-neutral-300">
                  This site uses cookies and related technologies to improve how
                  it functions, analyze traffic, and personalize content. You can control
                  how cookies are used at any time by visiting our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#C9A227] underline underline-offset-2 hover:text-[#DEBB3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 rounded-sm transition-colors"
                  >
                    privacy policy
                  </Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
              <button
                type="button"
                onClick={() => persist("rejected")}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-neutral-600 text-neutral-200 text-[11px] font-semibold tracking-[0.14em] uppercase hover:border-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition-colors duration-200"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => persist("accepted")}
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11px] font-semibold tracking-[0.14em] uppercase shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F10] focus-visible:ring-[#C9A227] transition-all duration-200"
              >
                I Agree
              </button>
              <Link
                href="/cookie-preferences"
                className="hidden md:inline-flex items-center text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-400 hover:text-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 rounded-sm transition-colors duration-200"
              >
                Manage Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Home — the exported page
// ═══════════════════════════════════════════════════════════════════════
const Home = () => {
  return (
    <>
      {/* JSON-LD structured data */}
      <Script
        id="ld-json-homepage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* Keyboard skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C9A227] focus:text-neutral-900 focus:font-semibold focus:tracking-wider focus:uppercase focus:text-xs focus:rounded-full"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" role="main">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetterx /> {/* Also rendered as a floating component, but can be placed here if you want it inline */}
      </main>

      <Footer />

      {/* Overlays */}
      <NewsLetter />
      <CookieBanner />
    </>
  );
};

export default Home;