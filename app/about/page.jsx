"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";

/**
 * About Us page — /about
 *
 * Structure:
 *  1. Hero
 *  2. Portrait + founder story
 *  3. Philosophy (signature quote + three tenets)
 *  4. The Strategic Partner principles (three cards)
 *  5. Closing CTA
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

const PRINCIPLES = [
  {
    number: "01",
    title: "Clarity",
    copy: "Clarify direction, priorities, and what matters — before anything is built or changed.",
  },
  {
    number: "02",
    title: "Systems",
    copy: "Build documented, repeatable systems so execution is consistent and not dependent on any one person's presence.",
  },
  {
    number: "03",
    title: "Execution",
    copy: "Embed rhythm, accountability, and decision flow so growth becomes controlled, measurable, and scalable.",
  },
];

const TENETS = [
  {
    title: "Execution is the real bottleneck.",
    copy: "Leaders often have vision — what they lack is the structure that turns vision into consistent, predictable results.",
  },
  {
    title: "Structure must outlive the advisor.",
    copy: "The goal is not dependency. It is to build systems and architecture that continue to function long after the engagement ends.",
  },
  {
    title: "If it is not structured, it will not scale.",
    copy: "Growth without structure creates chaos. Every engagement is designed to produce organizations that scale with control.",
  },
];

// SEO — Person + ProfessionalService JSON-LD
const ABOUT_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://charlesadakole.com/#person",
      name: "Charles Adakole",
      jobTitle: "Strategic Advisor | Systems | Execution",
      description:
        "Strategic advisor helping founders, executives, and ministry leaders bring structure to complex operations through systems, clarity, and execution design.",
      worksFor: { "@id": "https://charlesadakole.com/#organization" },
      url: "https://charlesadakole.com/about",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <>
      <Script
        id="ld-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_LD) }}
      />

      <Navbar />

      <main id="main-content" role="main">
        <AboutHero />
        <FounderStory />
        <Philosophy />
        <StrategicPartnerPrinciples />
        <AboutClosingCTA />
      </main>

      <Footer />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Hero
// ═══════════════════════════════════════════════════════════════════════
const AboutHero = () => (
  <section
    aria-labelledby="about-hero-heading"
    className="relative bg-[#0A0A0B] text-white overflow-hidden pt-36 md:pt-44 lg:pt-52 pb-20 md:pb-28"
  >
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
          About
        </p>

        <h1
          id="about-hero-heading"
          className="font-light leading-[1.02] tracking-[-0.015em] text-white text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px]"
        >
          Meet{" "}
          <span className="italic font-normal" style={{ color: "#C9A227" }}>
            Charles
          </span>
          .
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[15px] md:text-[17px] leading-[1.7] text-white/75">
          A strategic advisor helping leaders bring structure to complex
          operations through systems, clarity, and execution design.
        </p>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════
// Founder Story — portrait + narrative
// ═══════════════════════════════════════════════════════════════════════
const FounderStory = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      aria-label="Founder's story"
      className="relative bg-white py-20 md:py-28 lg:py-36"
    >
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Portrait */}
          <div
            className={[
              "lg:col-span-5 transition-all duration-[900ms] ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div className="relative overflow-hidden rounded-sm bg-neutral-200 group">
              <div className="relative aspect-[4/5]">
                <Image
                  src={assets.charles}
                  alt="Charles Adakole, founder and principal advisor"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C9A227" }} />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-900">
                    Charles Adakole · Strategic Advisor
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Story */}
          <div
            className={[
              "lg:col-span-7 lg:pl-4 lg:pt-4 transition-all duration-[900ms] ease-out delay-200",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-neutral-500 mb-6">
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
              The Story
            </p>

            <h2 className="font-light leading-[1.08] tracking-tight text-neutral-900 text-[30px] md:text-[40px] lg:text-[46px] max-w-2xl">
              Helping leaders bring{" "}
              <span className="italic font-normal" style={{ color: "#C9A227" }}>
                structure to complex operations
              </span>
              .
            </h2>

            <div className="mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-neutral-700 max-w-xl">
              <p>
                Charles Adakole is a strategic advisor helping founders,
                executives, and ministry leaders build systems and structure to
                execute consistently and scale without chaos.
              </p>
              <p>
                He works with leaders operating in complex environments where
                growth has outpaced structure — bringing clarity to direction,
                systems to operations, and structure to leadership so execution
                becomes consistent, measurable, and scalable.
              </p>
              <p>
                Based in Abuja, Nigeria, Charles serves clients globally through
                virtual advisory engagements, walking alongside leaders until
                the systems he helps design have become lived reality — not
                documents on a shelf.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Philosophy — pull quote + three tenets
// ═══════════════════════════════════════════════════════════════════════
const Philosophy = () => {
  const [ref, visible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      aria-labelledby="philosophy-heading"
      className="relative bg-[#F4F0E8] py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div ref={ref} className="max-w-4xl mb-16 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
            Philosophy
          </p>

          <h2
            id="philosophy-heading"
            className={[
              "font-light leading-[1.05] tracking-tight text-neutral-900 text-[36px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            What I{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              believe
            </span>
            .
          </h2>
        </div>

        {/* Pull quote */}
        <figure
          className={[
            "max-w-4xl mb-16 md:mb-24 transition-all duration-[900ms] ease-out delay-200",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className="block text-[72px] md:text-[96px] leading-[0.9] font-serif italic mb-4"
            style={{ color: "#C9A227" }}
          >
            &ldquo;
          </span>
          <blockquote className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.3] italic font-light text-neutral-900 max-w-3xl">
            If it is not structured, it will not scale.
          </blockquote>
          <figcaption className="mt-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-neutral-600">
            Charles Adakole
          </figcaption>
        </figure>

        {/* Three tenets */}
        <div ref={listRef} className="pt-12 md:pt-14 border-t border-neutral-300/70">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-10">
            Three Principles of the Work
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {TENETS.map((t, i) => (
              <div
                key={t.title}
                className={[
                  "transition-all duration-[700ms] ease-out",
                  listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                ].join(" ")}
                style={{ transitionDelay: listVisible ? `${120 * i}ms` : "0ms" }}
              >
                <h3 className="font-light leading-[1.2] tracking-tight text-neutral-900 text-[22px] md:text-[26px] mb-4">
                  <span className="italic" style={{ color: "#C9A227" }}>
                    {t.title}
                  </span>
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.75] text-neutral-700 max-w-sm">
                  {t.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Strategic Partner principles
// ═══════════════════════════════════════════════════════════════════════
const StrategicPartnerPrinciples = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      aria-label="Strategic Partner principles"
      className="relative bg-white py-20 md:py-28 lg:py-36"
    >
      <div ref={ref} className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
            Approach
          </p>

          <h2
            className={[
              "font-light leading-[1.05] tracking-tight text-neutral-900 text-[36px] md:text-[48px] transition-all duration-[900ms] delay-100",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            The Advisory{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              approach
            </span>
            .
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-neutral-200">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.number}
              className={[
                "group p-8 md:p-10 border-b md:border-b-0 border-neutral-200 md:border-r last:md:border-r-0 hover:bg-neutral-50 transition-all duration-500",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${200 + i * 120}ms` : "0ms" }}
            >
              <div className="flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.22em] uppercase mb-5">
                <span style={{ color: "#C9A227" }}>{p.number}</span>
                <span className="inline-block w-6 h-px" style={{ backgroundColor: "#C9A227" }} />
              </div>
              <h3 className="font-light leading-[1.2] tracking-tight text-neutral-900 text-[24px] md:text-[28px] mb-4">
                {p.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.75] text-neutral-700">
                {p.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// Closing CTA
// ═══════════════════════════════════════════════════════════════════════
const AboutClosingCTA = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative bg-[#0A0A0B] text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-80 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(201,162,39,0.15), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl">
          <p
            className={[
              "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C9A227] mb-6 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
            Next Step
          </p>

          <h2
            id="about-cta-heading"
            className={[
              "font-light leading-[1.02] tracking-[-0.015em] text-white text-[40px] md:text-[56px] lg:text-[68px] transition-all duration-[900ms] delay-100",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            Let&apos;s{" "}
            <span className="italic font-normal" style={{ color: "#C9A227" }}>
              talk
            </span>
            .
          </h2>

          <p
            className={[
              "mt-8 max-w-2xl text-[15px] md:text-[17px] leading-[1.7] text-white/75 transition-all duration-700 delay-200",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            ].join(" ")}
          >
            Every engagement begins with a conversation. Share what your
            organization is facing and I&apos;ll tell you honestly whether I
            can help — and what that would look like.
          </p>

          <div
            className={[
              "mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-300",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            ].join(" ")}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] md:text-[12px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_-8px_rgba(201,162,39,0.6)] hover:shadow-[0_12px_32px_-8px_rgba(201,162,39,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#C9A227] transition-all duration-300"
            >
              Book a Strategy Session
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/25 hover:border-white/45 text-white text-[11.5px] md:text-[12px] font-semibold tracking-[0.16em] uppercase backdrop-blur-sm transition-all duration-300"
            >
              Explore Services
              <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};