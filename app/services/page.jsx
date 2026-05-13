"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiTarget,
  FiLayers,
  FiUsers,
  FiCompass,
  FiCheck,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Services page — /services
 *
 * Single long-form page presenting all four pillars as anchor-linked sections.
 * The navbar dropdown targets #strategic-clarity, #sop-systems, #leadership-architecture,
 * #life-ministry, and #process.
 *
 * Page structure:
 *  1. Hero (page-specific, smaller than the home hero)
 *  2. Pillar I — Strategic Clarity & Brand Positioning (white)
 *  3. Pillar II — SOP & Systems Consulting (dark)
 *  4. Pillar III — Team Management & Leadership Architecture (white)
 *  5. Pillar IV — Life & Ministry Advisory (cream)
 *  6. The Process (dark, 4-step timeline)
 *  7. Closing CTA
 *
 * SEO:
 *  - metadata export (move to parent layout.js for App Router metadata)
 *  - JSON-LD ItemList of four Services under the ProfessionalService
 *  - Semantic H2 per pillar with stable anchor IDs for deep-linking
 */

// ─── Reveal hook ────────────────────────────────────────────────────
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

// ─── Service data ────────────────────────────────────────────────────
const PILLARS = [
  {
    id: "strategic-direction",
    number: "I",
    icon: FiTarget,
    title: "Strategic Direction",
    tagline: "Clarify priorities and positioning so execution is focused.",
    summary:
      "Before anything is built or changed, we identify what matters most and align your direction. Priorities are defined, resources stop being wasted, and the organization moves with focus.",
    deliverables: [
      "Priority diagnostic and strategic clarity session",
      "Direction alignment across leadership",
      "Resource-to-priority mapping",
      "Decision criteria and focus framework",
      "Strategic positioning statement",
    ],
    whoItsFor:
      "Founders and leaders whose priorities shift too often and whose team does not have a clear, shared sense of direction.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A focused strategy planning session",
    background: "white",
  },
  {
    id: "systems-sops",
    number: "II",
    icon: FiLayers,
    title: "Systems & SOPs",
    tagline: "Turn operations into documented, repeatable systems.",
    summary:
      "We convert informal workflows and tacit knowledge into Standard Operating Procedures — documented, repeatable systems your organization can run on consistently, without depending on any one person's memory.",
    deliverables: [
      "Full audit of current workflows and bottlenecks",
      "Documented SOPs for core operations",
      "Role clarity and delegation frameworks",
      "Handover-ready operations manual",
      "Tooling and workflow integration advisory",
    ],
    whoItsFor:
      "Leaders whose operations depend too heavily on their personal presence — and want a business that runs even when they step back.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Documentation and systems planning",
    background: "dark",
  },
  {
    id: "leadership-architecture",
    number: "III",
    icon: FiUsers,
    title: "Leadership Architecture",
    tagline: "Design how teams think, communicate, and execute.",
    summary:
      "We design the accountability systems, meeting cadences, decision flows, and feedback loops that allow your team to operate with clarity and ownership — without constant founder intervention.",
    deliverables: [
      "Organizational design and role clarity",
      "Meeting cadence architecture (weekly/monthly/quarterly)",
      "Performance and accountability frameworks",
      "Feedback and coaching systems",
      "Decision flow and escalation structure",
    ],
    whoItsFor:
      "Leaders who are still the bottleneck in every decision — and want a team that executes with clarity and takes ownership.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Team leadership and collaboration",
    background: "white",
  },
  {
    id: "ongoing-advisory",
    number: "IV",
    icon: FiCompass,
    title: "Ongoing Advisory",
    tagline: "Ensure structure evolves as your organization scales.",
    summary:
      "Structure is not a one-time event. As your organization grows, systems must evolve. The Ongoing Advisory engagement provides the continuity needed to keep your architecture matched to your ambition.",
    deliverables: [
      "Quarterly strategic review and recalibration",
      "Systems refinement and optimization",
      "Leadership coaching and accountability check-ins",
      "Organizational health diagnostics",
      "Reactive advisory for emerging challenges",
    ],
    whoItsFor:
      "Leaders who have built initial structure and need a trusted advisor to ensure it evolves correctly as the organization scales.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "An ongoing advisory and leadership partnership",
    background: "cream",
  },
];

// ─── Process steps ──────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Diagnose",
    duration: "Weeks 1–2",
    copy: "Identify where execution is breaking down — the real bottlenecks, not the symptoms. We surface what is actually in the way before designing any solution.",
  },
  {
    step: "02",
    phase: "Design",
    duration: "Weeks 3–6",
    copy: "Build the structure using the ACE Execution Framework — SOPs, team architecture, accountability systems, and decision flows designed for your specific context.",
  },
  {
    step: "03",
    phase: "Deploy",
    duration: "Weeks 7–12+",
    copy: "Implement the designed systems into real operations. Team alignment, rollout support, and the coaching needed to ensure structure becomes lived reality — not shelved documents.",
  },
  {
    step: "04",
    phase: "Refine",
    duration: "Ongoing",
    copy: "Optimize for scale and stability. Periodic reviews ensure your systems evolve with your organization and continue to serve the next level of growth.",
  },
];

// ─── SEO JSON-LD for Services page ──────────────────────────────────
const SERVICES_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Charles Adakole — Core Services",
  itemListElement: PILLARS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: p.title,
      description: p.summary,
      provider: {
        "@type": "ProfessionalService",
        name: "Charles Adakole",
      },
      url: `https://charlesadakole.com/services#${p.id}`,
    },
  })),
};

// ═══════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════
export default function ServicesPage() {
  return (
    <>
      <Script
        id="ld-services"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }}
      />

      <Navbar />

      <main id="main-content" role="main">
        <ServicesHero />
        <ServicesOverview />
        {PILLARS.map((p, i) => (
          <PillarSection key={p.id} pillar={p} index={i} />
        ))}
        <ProcessTimeline />
        <ServicesClosingCTA />
      </main>

      <Footer />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Hero — page-specific, smaller than the home hero
// ═══════════════════════════════════════════════════════════════════════
const ServicesHero = () => {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative bg-[#0A0A0B] text-white overflow-hidden pt-36 md:pt-44 lg:pt-52 pb-20 md:pb-28"
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(201,162,39,0.16), transparent 55%), radial-gradient(circle at 10% 90%, rgba(201,162,39,0.06), transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-4xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-6">
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
            Services
          </p>

          <h1
            id="services-hero-heading"
            className="font-light leading-[1.02] tracking-[-0.015em] text-white text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px]"
          >
            Four services.{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              One result
            </span>
            : structured execution.
          </h1>

          <p className="mt-8 md:mt-10 max-w-2xl text-[15px] md:text-[17px] leading-[1.7] text-white/75">
            Whether you are a founder, executive, or ministry leader — if
            growth has outpaced structure and execution is inconsistent, these
            four services deliver the architecture that changes that.
          </p>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Overview — jump-list of the four pillars
// ═══════════════════════════════════════════════════════════════════════
const ServicesOverview = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      aria-label="Services overview"
      className="relative bg-white py-16 md:py-20 border-b border-neutral-200"
    >
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                href={`#${p.id}`}
                className={[
                  "group relative block p-6 md:p-7 border border-neutral-200 rounded-sm hover:border-[#C9A227] focus:border-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 transition-all duration-500",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-[12px] font-semibold tracking-[0.2em]"
                    style={{ color: "#C9A227" }}
                  >
                    {p.number}
                  </span>
                  <Icon
                    className="w-5 h-5 text-neutral-400 group-hover:text-[#C9A227] transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-900 leading-[1.3] mb-2 group-hover:text-[#B8901C] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[13px] text-neutral-600 leading-[1.6]">{p.tagline}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Pillar section — alternates white/dark/cream for rhythm
// ═══════════════════════════════════════════════════════════════════════
const PillarSection = ({ pillar, index }) => {
  const [ref, visible] = useReveal();
  const imageFirst = index % 2 === 0;

  // Background styling
  const bgClasses = {
    white: "bg-white text-neutral-900",
    dark: "bg-[#0A0A0B] text-white",
    cream: "bg-[#F4F0E8] text-neutral-900",
  }[pillar.background];

  const isDark = pillar.background === "dark";

  return (
    <section
      id={pillar.id}
      aria-labelledby={`${pillar.id}-heading`}
      className={`relative ${bgClasses} py-20 md:py-28 lg:py-32 scroll-mt-24`}
    >
      {/* Dark ambient */}
      {isDark && (
        <>
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 20%, rgba(201,162,39,0.10), transparent 55%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Cream grain */}
      {pillar.background === "cream" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
      )}

      <div ref={ref} className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div
          className={[
            "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center",
            !imageFirst && "lg:[&>*:first-child]:order-2",
          ].filter(Boolean).join(" ")}
        >
          {/* Image */}
          <div
            className={[
              "lg:col-span-6 transition-all duration-[900ms] ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div className="relative overflow-hidden rounded-sm bg-neutral-200 group">
              <div className="relative aspect-[4/5]">
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                {isDark && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(10,10,11,0) 55%, rgba(10,10,11,0.5) 100%)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="absolute left-5 top-5 md:left-7 md:top-7">
                <span
                  className={[
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm",
                    isDark ? "bg-black/60 border border-white/15 text-white" : "bg-white/90 text-neutral-900",
                  ].join(" ")}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C9A227" }} />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                    Pillar {pillar.number}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={[
              "lg:col-span-6 transition-all duration-[900ms] ease-out delay-150",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              !imageFirst ? "lg:pr-4" : "lg:pl-4",
            ].join(" ")}
          >
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase mb-5",
                isDark ? "text-[#C9A227]" : "text-neutral-600",
              ].join(" ")}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
              Pillar {pillar.number}
            </p>

            <h2
              id={`${pillar.id}-heading`}
              className={[
                "font-light leading-[1.08] tracking-tight text-[32px] md:text-[42px] lg:text-[48px]",
                isDark ? "text-white" : "text-neutral-900",
              ].join(" ")}
            >
              {pillar.title}
            </h2>

            <p
              className={[
                "mt-5 text-[18px] md:text-[20px] italic font-light leading-[1.45]",
                isDark ? "text-white/85" : "text-neutral-700",
              ].join(" ")}
              style={{ color: isDark ? undefined : "#8a6b18" }}
            >
              {pillar.tagline}
            </p>

            <p
              className={[
                "mt-6 text-[15px] md:text-[16px] leading-[1.75] max-w-xl",
                isDark ? "text-white/75" : "text-neutral-700",
              ].join(" ")}
            >
              {pillar.summary}
            </p>

            {/* Deliverables */}
            <div className="mt-8 md:mt-10">
              <p
                className={[
                  "text-[10.5px] font-semibold tracking-[0.24em] uppercase mb-4",
                  isDark ? "text-white/60" : "text-neutral-500",
                ].join(" ")}
              >
                What&apos;s included
              </p>
              <ul className="space-y-2.5">
                {pillar.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheck
                      className="shrink-0 w-4 h-4 mt-1"
                      style={{ color: "#C9A227" }}
                      aria-hidden="true"
                    />
                    <span
                      className={[
                        "text-[14px] md:text-[14.5px] leading-[1.6]",
                        isDark ? "text-white/85" : "text-neutral-700",
                      ].join(" ")}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div
              className={[
                "mt-8 md:mt-10 p-5 md:p-6 rounded-sm border-l-2",
                isDark ? "bg-white/5 border-[#C9A227]" : "bg-neutral-50 border-[#C9A227]",
              ].join(" ")}
            >
              <p
                className={[
                  "text-[10.5px] font-semibold tracking-[0.24em] uppercase mb-2",
                  isDark ? "text-[#C9A227]" : "text-neutral-600",
                ].join(" ")}
              >
                Who it&apos;s for
              </p>
              <p
                className={[
                  "text-[14px] md:text-[15px] leading-[1.65]",
                  isDark ? "text-white/85" : "text-neutral-800",
                ].join(" ")}
              >
                {pillar.whoItsFor}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 md:mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] font-semibold tracking-[0.16em] uppercase shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A227] transition-all duration-300"
              >
                Book a Strategy Session
                <FiArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Process timeline — the 4 engagement steps
// ═══════════════════════════════════════════════════════════════════════
const ProcessTimeline = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-[#0A0A0B] text-white py-20 md:py-28 lg:py-36 overflow-hidden scroll-mt-24"
    >
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(201,162,39,0.12), transparent 55%), radial-gradient(circle at 10% 85%, rgba(201,162,39,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-6 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
            The Process
          </p>

          <h2
            id="process-heading"
            className={[
              "font-light leading-[1.05] tracking-tight text-white text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            Diagnose. Design.{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              Deploy
            </span>
            . Refine.
          </h2>

          <p
            className={[
              "mt-6 text-[15px] md:text-[16px] leading-[1.75] text-white/70 max-w-xl transition-all duration-700 delay-200",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            Every engagement follows a four-step rhythm — identify the real
            breakdown points before designing any solution, then deploy and
            refine until structure is lived reality.
          </p>
        </div>

        {/* Vertical timeline */}
        <ol className="relative max-w-3xl">
          {/* Vertical line */}
          <span
            className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(to bottom, #C9A227 0%, #C9A227 50%, rgba(201,162,39,0.2) 100%)" }}
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((s, i) => (
            <li
              key={s.step}
              className={[
                "relative pl-14 md:pl-20 pb-12 md:pb-16 last:pb-0 transition-all duration-[700ms] ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${300 + i * 150}ms` : "0ms" }}
            >
              <span
                className="absolute left-0 top-0 w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full flex items-center justify-center text-[13px] font-semibold tracking-wider border-2 bg-[#0A0A0B]"
                style={{ color: "#C9A227", borderColor: "#C9A227" }}
                aria-hidden="true"
              >
                {s.step}
              </span>

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 mb-3">
                <h3 className="text-[22px] md:text-[26px] font-light tracking-tight text-white">
                  {s.phase}
                </h3>
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/50">
                  {s.duration}
                </span>
              </div>
              <p className="text-[14.5px] md:text-[15.5px] leading-[1.75] text-white/75 max-w-xl">
                {s.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Closing CTA
// ═══════════════════════════════════════════════════════════════════════
const ServicesClosingCTA = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      aria-labelledby="services-cta-heading"
      className="relative bg-white py-20 md:py-28 lg:py-36 border-t border-neutral-200"
    >
      <div ref={ref} className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto text-center">
        <p
          className={[
            "text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          Not sure where to start?
        </p>
        <h2
          id="services-cta-heading"
          className={[
            "font-light leading-[1.08] tracking-tight text-neutral-900 text-[32px] md:text-[44px] lg:text-[52px] max-w-3xl mx-auto transition-all duration-[900ms] delay-100",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          If it is not structured,{" "}
          <span className="italic font-normal" style={{ color: "#C9A227" }}>
            it will not scale
          </span>
          .
        </h2>

        <p
          className={[
            "mt-6 max-w-xl mx-auto text-[15px] md:text-[16px] leading-[1.75] text-neutral-700 transition-all duration-700 delay-200",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          Book a strategy session and we&apos;ll identify which service — or
          combination of services — your organization needs most right now.
        </p>

        <div
          className={[
            "mt-10 transition-all duration-700 delay-300",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[12px] md:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-[0_10px_30px_-10px_rgba(201,162,39,0.5)] hover:shadow-[0_16px_40px_-10px_rgba(201,162,39,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A227] transition-all duration-300"
          >
            Book a Strategy Session
            <FiArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};