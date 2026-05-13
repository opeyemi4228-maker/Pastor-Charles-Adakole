"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * FeaturedProduct — Charles Adakole Consulting | The Process
 *
 * Content (per brand brief, Section 5): four phases of engagement.
 *   1. The Clarity Audit
 *   2. The Blueprint
 *   3. Implementation
 *   4. Continuous Optimization
 *
 * Sits below HomeProducts. Dark, editorial, process-focused.
 * Tab structure: each phase is its own tab panel with a big step-number
 * metric, phase title, explanation paragraph, and a signature principle quote.
 *
 * Dependencies: react-icons (npm install react-icons)
 */

function useReveal(options = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }) {
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

// ─── ACE Execution Framework ─────────────────────────────────────────
const PHASES = [
  {
    phase: "A — Align",
    name: "Align",
    title: "Clarify direction, priorities, and what matters.",
    summary:
      "Before anything is built, we get clear on what the organization is trying to achieve and what is standing in the way. Priorities are defined, direction is sharpened, and the team understands what matters most.",
    metric: "A",
    metricLabel: "Align",
    duration: "Weeks 1–2",
    quote:
      "You cannot execute your way out of a clarity problem. Alignment comes first.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A focused planning session with clear direction",
    href: "/services#strategic-direction",
  },
  {
    phase: "C — Construct",
    name: "Construct",
    title: "Build systems: SOPs, workflows, team structure, accountability.",
    summary:
      "With direction clear, we build the operational architecture — Standard Operating Procedures, team structures, decision flows, and accountability frameworks. Operations move from informal to documented and repeatable.",
    metric: "C",
    metricLabel: "Construct",
    duration: "Weeks 3–8",
    quote:
      "A system is not a document. It is the lived architecture of how your organization runs when you are not in the room.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Building operational systems and documented workflows",
    href: "/services#systems-sops",
  },
  {
    phase: "E — Execute",
    name: "Execute",
    title: "Embed rhythm: decision flow, performance tracking, leadership cadence.",
    summary:
      "Systems only work when embedded in daily rhythm. We roll out the architecture into real operations — weekly cadences, performance tracking, and leadership routines that make execution consistent and measurable.",
    metric: "E",
    metricLabel: "Execute",
    duration: "Ongoing",
    quote:
      "Structure without rhythm is still chaos. Execution is where the framework becomes reality.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A team operating with clear cadence and accountability",
    href: "/services#leadership-architecture",
  },
];

const FeaturedProduct = () => {
  const [headerRef, headerVisible] = useReveal();
  const [bodyRef, bodyVisible] = useReveal();
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);

  const handleTabKey = (e) => {
    const n = PHASES.length;
    let nextIndex = null;
    if (e.key === "ArrowRight") nextIndex = (active + 1) % n;
    if (e.key === "ArrowLeft") nextIndex = (active - 1 + n) % n;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = n - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      setActive(nextIndex);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  const current = PHASES[active];

  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-[#0A0A0B] text-white py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(201,162,39,0.10), transparent 55%), radial-gradient(circle at 10% 85%, rgba(201,162,39,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mb-14 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-6 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
            The ACE Execution Framework™
          </p>

          <h2
            id="process-heading"
            className={[
              "font-light leading-[1.05] tracking-tight text-white text-[38px] md:text-[52px] lg:text-[64px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            Align.{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              Construct
            </span>
            . Execute.
          </h2>

          <p
            className={[
              "mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.75] text-white/70 max-w-xl transition-all duration-700 delay-200",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            The ACE Execution Framework is the three-step method I use to
            transform how organizations operate — from reactive and
            founder-dependent to structured, scalable, and consistent.
          </p>
        </div>

        {/* Tabs */}
        <div
          ref={bodyRef}
          className={[
            "border-t border-white/10 transition-all duration-700",
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <div role="tablist" aria-label="Engagement phases" className="flex flex-wrap gap-x-1 gap-y-0">
            {PHASES.map((p, i) => {
              const selected = active === i;
              return (
                <button
                  key={p.name}
                  ref={(el) => (tabsRef.current[i] = el)}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`phase-panel-${i}`}
                  id={`phase-tab-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={handleTabKey}
                  className="group relative px-5 md:px-7 py-5 md:py-6 text-left focus:outline-none"
                >
                  <span
                    className={[
                      "block text-[10px] font-semibold tracking-[0.24em] uppercase transition-colors duration-300",
                      selected ? "text-[#C9A227]" : "text-white/40 group-hover:text-white/70 group-focus-visible:text-white/90",
                    ].join(" ")}
                  >
                    {p.phase}
                  </span>
                  <span
                    className={[
                      "block mt-1.5 text-[14px] md:text-[15px] font-light transition-colors duration-300",
                      selected ? "text-white" : "text-white/60 group-hover:text-white group-focus-visible:text-white",
                    ].join(" ")}
                  >
                    {p.name}
                  </span>

                  <span
                    className={[
                      "absolute left-0 right-0 -top-px h-[2px] origin-center transition-transform duration-500 ease-out",
                      selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                    ].join(" ")}
                    style={{ backgroundColor: "#C9A227" }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`phase-panel-${active}`}
          aria-labelledby={`phase-tab-${active}`}
          className="mt-10 md:mt-16"
        >
          <div
            key={active}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start animate-[caseFade_600ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
          >
            {/* Image */}
            <div className="lg:col-span-6 relative group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-800">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(10,10,11,0) 55%, rgba(10,10,11,0.5) 100%)",
                  }}
                  aria-hidden="true"
                />

                <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#C9A227" }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/90">
                      {current.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 lg:pl-4 lg:pt-4">
              {/* Step number metric */}
              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-white/10">
                <span
                  className="font-light tracking-tight leading-none text-[56px] md:text-[72px] lg:text-[84px]"
                  style={{ color: "#C9A227" }}
                >
                  {current.metric}
                </span>
                <span className="text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-white/60 font-semibold pb-2">
                  {current.metricLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-light leading-[1.1] tracking-tight text-white text-[26px] md:text-[32px] lg:text-[38px]">
                {current.title}
              </h3>

              {/* Summary */}
              <p className="mt-5 md:mt-6 text-[15px] md:text-[16px] leading-[1.75] text-white/75 max-w-xl">
                {current.summary}
              </p>

              {/* Principle pull-quote */}
              <figure className="relative mt-10 md:mt-12 pl-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 text-[56px] leading-[0.9] italic"
                  style={{ color: "#C9A227" }}
                >
                  &ldquo;
                </span>
                <blockquote className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.55] italic font-light text-white/85 max-w-xl">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
                  Charles Adakole — ACE Execution Framework™
                </figcaption>
              </figure>

              {/* CTA */}
              <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
                <Link
                  href={current.href}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#C9A227] transition-all duration-300"
                >
                  See this service
                  <FiArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-white/70 hover:text-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm transition-colors duration-200"
                >
                  <span className="relative">
                    Book a Strategy Session
                    <span
                      className="absolute left-0 right-0 -bottom-0.5 h-px origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                      style={{ backgroundColor: "#C9A227" }}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Result callout */}
        <div className="mt-16 md:mt-20 border-t border-white/10 pt-10 md:pt-12">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-4">
            The Result
          </p>
          <p className="font-light leading-[1.2] tracking-tight text-white text-[22px] md:text-[28px] lg:text-[32px] max-w-3xl">
            A structured organization that no longer depends on constant founder
            intervention —{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              built to scale.
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes caseFade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          section[aria-labelledby="process-heading"] *[class*="animate-"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProduct;