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

// ─── Four process phases (from brief) ───────────────────────────────
const PHASES = [
  {
    phase: "Phase One",
    name: "The Clarity Audit",
    title: "We begin by naming what's really in the way.",
    summary:
      "A deep dive into your current workflows, vision, and bottlenecks. We surface the hidden constraints holding your organization back — not the symptoms, the underlying system that produces them.",
    metric: "01",
    metricLabel: "Discovery",
    duration: "2–3 weeks",
    quote:
      "Before we prescribe, we diagnose. Most organizations mistake their symptoms for their disease — the Audit separates the two.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A workspace with notebooks, pen, and a focused planning session",
    href: "/process/clarity-audit",
  },
  {
    phase: "Phase Two",
    name: "The Blueprint",
    title: "A custom roadmap designed around your specific challenge.",
    summary:
      "Tailored SOPs, leadership structures, and decision frameworks engineered for your context. Not templates — the exact architecture your organization needs to reach its next level.",
    metric: "02",
    metricLabel: "Design",
    duration: "3–4 weeks",
    quote:
      "A Blueprint is not a document — it is the moment your organization stops improvising and starts building.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "An architectural blueprint and technical drawings on a desk",
    href: "/process/blueprint",
  },
  {
    phase: "Phase Three",
    name: "Implementation",
    title: "I walk with you as the systems take root.",
    summary:
      "Direct, side-by-side rollout of the systems into daily operations. Team alignment sessions, accountability check-ins, and the coaching needed to ensure the Blueprint becomes lived reality — not shelved theory.",
    metric: "03",
    metricLabel: "Execution",
    duration: "2–6 months",
    quote:
      "Strategy only counts when it survives contact with Monday morning. Implementation is where I am most present.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A leader in collaborative session with team members",
    href: "/process/implementation",
  },
  {
    phase: "Phase Four",
    name: "Continuous Optimization",
    title: "Systems that grow as your organization grows.",
    summary:
      "Periodic reviews that ensure your systems scale and evolve with you. Quarterly retros, refinement cycles, and the ongoing partnership that keeps your architecture matched to your ambition.",
    metric: "04",
    metricLabel: "Refinement",
    duration: "Ongoing retainer",
    quote:
      "What I build must outlive my engagement. Optimization is how we make sure it does.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A modern office skyline at twilight",
    href: "/process/optimization",
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
            The Process
          </p>

          <h2
            id="process-heading"
            className={[
              "font-light leading-[1.05] tracking-tight text-white text-[38px] md:text-[52px] lg:text-[64px] transition-all duration-[900ms] delay-100",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            How we{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              work
            </span>{" "}
            together.
          </h2>

          <p
            className={[
              "mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.75] text-white/70 max-w-xl transition-all duration-700 delay-200",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            Every engagement follows a four-phase rhythm — diagnostic before
            prescriptive, partnership over transaction. This is how we move
            from overwhelm to operational peace, together.
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
                  Charles Adakole — Principle of the Phase
                </figcaption>
              </figure>

              {/* CTA */}
              <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
                <Link
                  href={current.href}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#C9A227] transition-all duration-300"
                >
                  Learn about this phase
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
                    Begin with a Clarity Audit
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