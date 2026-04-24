"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

/**
 * ClosingCTA — Charles Adakole Consulting | Final Contact section
 *
 * Content (per brand brief, Section 6):
 * - Headline: "Ready to find your focus?"
 * - Body: "Take the first step toward a more organized, impactful future.
 *   Whether you are scaling a business, leading a ministry, or refining
 *   your life's vision, I am here to help you execute with precision."
 * - Primary CTA: Schedule a Strategic Consultation
 * - Location: Abuja, Nigeria | Global Virtual Advisory
 * - Contact anchors: email + schedule
 *
 * Dependencies: react-icons (npm install react-icons)
 */

function useReveal(options = { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) { setVisible(true); return; }
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, options);
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const CONTACT_ANCHORS = [
  {
    label: "Write to me",
    value: "hello@charlesadakole.com",
    href: "mailto:hello@charlesadakole.com",
  },
  {
    label: "Schedule a call",
    value: "Book a consultation",
    href: "/contact",
  },
  {
    label: "Based in",
    value: "Abuja, Nigeria · Global Virtual Advisory",
    href: "/contact",
  },
];

const ClosingCTA = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative bg-[#0A0A0B] text-white overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 opacity-80 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 15%, rgba(201,162,39,0.18), transparent 50%), radial-gradient(circle at 8% 90%, rgba(201,162,39,0.06), transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Gold arc signature */}
      <svg
        className="pointer-events-none absolute -top-40 -right-40 md:-top-48 md:-right-48 w-[520px] h-[520px] md:w-[640px] md:h-[640px] opacity-30"
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="320" cy="320" r="280" stroke="#C9A227" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="320" cy="320" r="200" stroke="#C9A227" strokeWidth="1" opacity="0.7" />
        <circle cx="320" cy="320" r="120" stroke="#C9A227" strokeWidth="1" opacity="0.4" />
      </svg>

      <div
        ref={ref}
        className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-24 md:py-36 lg:py-44"
      >
        {/* Eyebrow */}
        <p
          className={[
            "flex items-center gap-3 text-[11px] font-semibold tracking-[0.32em] uppercase text-[#C9A227] mb-8 md:mb-10 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <span className="inline-block w-10 h-px" style={{ backgroundColor: "#C9A227" }} />
          Begin the Conversation
        </p>

        {/* Headline — directly from the brief */}
        <h2
          id="closing-cta-heading"
          className={[
            "font-light leading-[0.98] tracking-[-0.02em] text-white max-w-5xl text-[48px] sm:text-[64px] md:text-[88px] lg:text-[108px] xl:text-[124px] transition-all duration-[1100ms] ease-out delay-200",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          Ready to find your{" "}
          <span className="italic font-normal" style={{ color: "#C9A227" }}>
            focus
          </span>
          ?
        </h2>

        {/* Body — directly from the brief */}
        <p
          className={[
            "mt-10 md:mt-12 max-w-2xl text-[16px] md:text-[18px] leading-[1.75] text-white/75 font-light transition-all duration-700 delay-[400ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          Take the first step toward a more organized, impactful future.
          Whether you are scaling a business, leading a ministry, or refining
          your life&apos;s vision, I am here to help you execute with
          precision.
        </p>

        {/* CTAs */}
        <div
          className={[
            "mt-12 md:mt-14 flex flex-wrap items-center gap-4 transition-all duration-700 delay-[600ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[12px] md:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-[0_10px_30px_-10px_rgba(201,162,39,0.6)] hover:shadow-[0_16px_40px_-10px_rgba(201,162,39,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#C9A227] transition-all duration-300"
          >
            Schedule a Strategic Consultation
            <FiArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/25 hover:border-white/50 text-white text-[12px] md:text-[13px] font-semibold tracking-[0.16em] uppercase backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-white/50 transition-all duration-300"
          >
            Explore Services
            <FiArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Contact anchors */}
        <div
          className={[
            "mt-20 md:mt-28 pt-10 md:pt-12 border-t border-white/10 transition-all duration-700 delay-[800ms]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {CONTACT_ANCHORS.map((anchor) => (
              <Link
                key={anchor.label}
                href={anchor.href}
                className="group relative flex flex-col gap-2 md:gap-3 py-3 focus:outline-none"
              >
                <span className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-white/50 group-hover:text-[#C9A227] transition-colors duration-300">
                  {anchor.label}
                </span>
                <span className="text-[16px] md:text-[18px] font-light text-white group-hover:text-[#C9A227] transition-colors duration-300 flex items-center gap-2">
                  {anchor.value}
                  <FiArrowUpRight
                    className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </span>

                <span
                  className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ backgroundColor: "#C9A227" }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;