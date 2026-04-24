"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

/**
 * HeaderSlider — Charles Adakole Consulting | Hero section
 *
 * Content (per brand brief):
 * - Brand: Charles Adakole Consulting
 * - Tagline: Strategic Advisor & Executive Coach for Business, Life, and Ministry
 * - Headline: Clarity of Vision. Precision of Execution.
 * - Sub-headline: Empowering leaders to bridge the gap between complex ideas
 *   and tangible results. Whether in the boardroom, the ministry, or your
 *   personal life, I provide the roadmap to your next level.
 * - Primary CTA: Schedule a Strategic Consultation
 *
 * SEO & performance:
 * - Single semantic <h1>
 * - next/image with priority + fetchPriority="high" marks the LCP element
 * - sizes="100vw" for responsive srcset selection
 * - blur placeholder prevents CLS
 *
 * Accessibility:
 * - Gradient overlay ensures WCAG AAA contrast for white text
 * - prefers-reduced-motion disables animations
 * - All interactive elements have visible focus rings
 *
 * Dependencies: react-icons (npm install react-icons)
 */

// Rotating scope statements — reinforce the three domains of the practice
const SCOPE_STATEMENTS = [
  "Strategic Advisor & Executive Coach for Business, Life, and Ministry",
  "From the boardroom to the calling — one standard of clarity, one method of execution",
  "Helping leaders move from overwhelm to high-impact leadership",
];

// Hero image — served via next/image. Replace with your own asset in /public.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2400&q=85";

const HERO_IMAGE_ALT =
  "A city skyline at golden hour — the context in which Charles Adakole Consulting serves leaders across business, life, and ministry";

const HeaderSlider = () => {
  const [statementIndex, setStatementIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || SCOPE_STATEMENTS.length <= 1) return;

    const id = setInterval(() => {
      setStatementIndex((i) => (i + 1) % SCOPE_STATEMENTS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[92vh] md:min-h-screen overflow-hidden bg-neutral-950"
    >
      {/* ── Background image ─────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,12,0.88) 0%, rgba(10,10,12,0.72) 35%, rgba(10,10,12,0.42) 65%, rgba(40,25,10,0.35) 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(10,10,12,0.35) 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[92vh] md:min-h-screen flex items-center">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20 pt-10 md:pt-24 pb-4  md:pb-6 max-w-[2000px] mx-auto">
          <div className="max-w-4xl">
            {/* Scope statement / tagline */}
            <div
              className="mb-6 md:mb-14 opacity-0 animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_200ms_forwards]"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-start gap-4 max-w-2xl">
                <span
                  className="shrink-0 inline-block w-8 h-px mt-3"
                  style={{ backgroundColor: "#C9A227" }}
                  aria-hidden="true"
                />
                <p className="text-[15px] md:text-[16px] lg:text-[17px] leading-[1.55] text-white/85 font-light">
                  {SCOPE_STATEMENTS[statementIndex]}
                </p>
              </div>
            </div>

            {/* Eyebrow */}
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#C9A227] mb-4 opacity-0 animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_350ms_forwards]">
              Charles Adakole Consulting
            </p>

            {/* H1 — "Clarity of Vision. Precision of Execution."
                Italic gold accents on the two power words (Vision / Execution) */}
            <h1
              id="hero-heading"
              className="text-white font-medium leading-[1.02] tracking-[-0.015em] text-[46px] sm:text-[58px] md:text-[72px] lg:text-[88px] xl:text-[96px] opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_500ms_forwards]"
            >
              Clarity of{" "}
              <span className="italic font-semibold" style={{ color: "#C9A227" }}>
                Vision
              </span>
              .
              <br className="hidden sm:block" />
              Precision of{" "}
              <span className=" font-semibold" style={{ color: "#C9A227" }}>
                Execution
              </span>
              .
            </h1>

            {/* CTAs */}
            <div className="mt-12 md:mt-14 flex flex-wrap items-center gap-3 opacity-0 animate-[heroReveal_900ms_cubic-bezier(0.22,1,0.36,1)_900ms_forwards]">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] md:text-[12px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_-8px_rgba(201,162,39,0.6)] hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:ring-[#C9A227] transition-all duration-300"
              >
                Schedule a Consultation
                <FiArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/25 hover:border-white/45 text-[11.5px] md:text-[12px] font-semibold tracking-[0.16em] uppercase backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:ring-white/50 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* ── Scroll cue ────────────────────────────────────────────── */}
        <div
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 text-white/50 opacity-0 animate-[heroReveal_800ms_ease-out_1200ms_forwards]"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.32em] uppercase">Scroll</span>
          <span className="relative block w-px h-10 bg-white/30 overflow-hidden">
            <span
              className="absolute inset-x-0 top-0 h-4 bg-[#C9A227]"
              style={{
                animation: "scrollCue 2.2s cubic-bezier(0.4,0,0.2,1) infinite",
              }}
            />
          </span>
        </div>
      </div>

      {/* ── Animations ──────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollCue {
          0% {
            transform: translateY(-100%);
          }
          60% {
            transform: translateY(260%);
          }
          100% {
            transform: translateY(260%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          section[aria-labelledby="hero-heading"] *[class*="animate-"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeaderSlider;