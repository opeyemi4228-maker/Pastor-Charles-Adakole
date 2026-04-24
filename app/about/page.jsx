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
    title: "Strategic Clarity",
    copy: "I help leaders name what they want, why it matters, and what stands in the way — before we build anything.",
  },
  {
    number: "02",
    title: "Structural Precision",
    copy: "Vision without architecture is a wish. Every engagement delivers documented systems your organization can run on.",
  },
  {
    number: "03",
    title: "Stewardship Focus",
    copy: "The coordination of resources and people toward high-level goals — held with the care of a calling, not a contract.",
  },
];

const TENETS = [
  {
    title: "Diagnostic before prescriptive.",
    copy: "Most organizations mistake their symptoms for their disease. Every engagement starts by separating the two.",
  },
  {
    title: "Systems outlive people.",
    copy: "The goal is not to make you dependent on me. It is to build an architecture that continues long after the engagement ends.",
  },
  {
    title: "Clarity is a discipline.",
    copy: "Clarity is not the reward at the end of the work. It is the discipline that makes the work possible in the first place.",
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
      jobTitle: "Strategic Advisor & Executive Coach",
      description:
        "Professional consultant and executive advisor specializing in organizational management and personal stewardship. Helps leaders move from overwhelm to high-impact leadership.",
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
          A Strategic Partner for those called to lead in complex environments —
          in the boardroom, in ministry, and in the quieter work of a disciplined
          life.
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
                    Charles Adakole · Principal Advisor
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
              A partner for those called to lead in{" "}
              <span className="italic font-normal" style={{ color: "#C9A227" }}>
                complex environments
              </span>
              .
            </h2>

            <div className="mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-neutral-700 max-w-xl">
              <p>
                Charles Adakole is a dedicated professional consultant and
                executive advisor specializing in organizational management and
                personal stewardship. By combining strategic clarity with
                structural precision, Charles helps leaders move from a state of
                overwhelm to one of high-impact leadership.
              </p>
              <p>
                With a deep focus on coordinating resources and people to reach
                high-level goals, Charles serves as a{" "}
                <em className="not-italic font-semibold text-neutral-900">
                  Strategic Partner
                </em>{" "}
                to those called to lead in complex environments — in the
                boardroom, in ministry, and in the quieter work of a disciplined
                life.
              </p>
              <p>
                Based in Abuja, Nigeria, Charles serves clients globally through
                virtual advisory engagements, walking alongside founders,
                ministry leaders, and principals until the systems he helps
                design have become lived reality.
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
            Clarity is not the reward at the end of the work. It is the
            discipline that makes the work possible in the first place.
          </blockquote>
          <figcaption className="mt-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-neutral-600">
            Charles Adakole
          </figcaption>
        </figure>

        {/* Three tenets */}
        <div ref={listRef} className="pt-12 md:pt-14 border-t border-neutral-300/70">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-10">
            Three Tenets of the Work
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
            The Strategic Partner{" "}
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
            Every engagement begins with a conversation. Share what
            you&apos;re facing and I&apos;ll tell you honestly whether I can
            help.
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
              Schedule a Consultation
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