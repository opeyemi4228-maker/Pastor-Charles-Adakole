"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { assets } from "@/assets/assets";

/**
 * Banner — Charles Adakole Consulting | About (Founder's Story)
 *
 * Content (per brand brief, Section 3): The About Me / founder story.
 * A personal editorial section — warm cream backdrop, portrait-forward
 * layout with a pull quote and the three principles that define the
 * Strategic Partner relationship.
 *
 * Layout:
 * - Header: eyebrow + "Meet Charles" headline
 * - Main: portrait (left) + story paragraphs + signature pull quote (right)
 * - Lower: three "Strategic Partner" principles card row
 *
 * Dependencies: react-icons (npm install react-icons)
 */

function useReveal(options = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }) {
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

// Three principles distilled from the advisory approach
const PRINCIPLES = [
  {
    number: "01",
    title: "Clarity",
    copy:
      "Clarify direction, priorities, and what matters — before anything is built or changed.",
  },
  {
    number: "02",
    title: "Systems",
    copy:
      "Build documented, repeatable systems for operations so execution is consistent and not dependent on memory.",
  },
  {
    number: "03",
    title: "Execution",
    copy:
      "Embed rhythm, accountability, and decision flow so growth becomes controlled and scalable.",
  },
];

// Charles Adakole portrait from assets
const PORTRAIT = assets.charles;

const Banner = () => {
  const [headerRef, headerVisible] = useReveal();
  const [mainRef, mainVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      aria-labelledby="about-heading"
      className="relative bg-[#fffdf9] py-20 md:py-28 lg:py-36"
    >
      {/* Paper-grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-14 md:mb-20"
        >
          <div className="max-w-2xl">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
              About
            </p>
            <h2
              id="about-heading"
              className={[
                "font-light leading-[1.05] tracking-tight text-neutral-900 text-[38px] md:text-[52px] lg:text-[64px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              Meet{" "}
              <span className="italic font-normal" style={{ color: "#C9A227" }}>
                Charles
              </span>
              .
            </h2>
          </div>

          <div
            className={[
              "shrink-0 transition-all duration-700 delay-200",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-neutral-900 hover:text-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm transition-colors duration-200"
            >
              <span className="relative">
                Read the full story
                <span
                  className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: "#C9A227" }}
                  aria-hidden="true"
                />
              </span>
              <FiArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ── Portrait + story ─────────────────────────────────────── */}
        <div
          ref={mainRef}
          className={[
            "mb-16 md:mb-20 transition-all duration-[900ms] ease-out",
            mainVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Portrait */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-sm bg-neutral-300 group">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={PORTRAIT}
                    alt="Charles Adakole, strategic advisor"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle warm overlay to harmonize with cream bg */}
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-40"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 60%, rgba(40,25,10,0.35) 100%)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Name plate */}
                <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#C9A227" }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-900">
                      Charles Adakole · Strategic Advisor
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-7 lg:pl-4 lg:pt-4">
              <p className="font-light leading-[1.15] tracking-tight text-neutral-900 text-[26px] md:text-[32px] lg:text-[38px] max-w-2xl">
                A strategic advisor helping leaders bring{" "}
                <span className="italic font-normal" style={{ color: "#C9A227" }}>
                  structure to complex operations
                </span>
                .
              </p>

              <div className="mt-6 md:mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-neutral-700 max-w-xl">
                <p>
                  Charles Adakole is a strategic advisor helping leaders bring
                  structure to complex operations through systems, clarity, and
                  execution design.
                </p>
                <p>
                  He works with founders, executives, and ministry leaders
                  operating in complex environments where growth has outpaced
                  structure — bringing clarity to direction, systems to
                  operations, and structure to leadership so execution becomes
                  consistent, measurable, and scalable.
                </p>
              </div>

              {/* Signature quote */}
              <figure className="relative mt-10 md:mt-12 pl-8 border-l-2 border-[#C9A227]/60">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-0 w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#C9A227" }}
                />
                <blockquote className="text-[17px] md:text-[20px] lg:text-[22px] leading-[1.5] italic font-light text-neutral-900 max-w-xl">
                  If it is not structured, it will not scale.
                </blockquote>
                <figcaption className="mt-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-600">
                  Charles Adakole
                </figcaption>
              </figure>

              {/* CTA */}
              <div className="mt-10 md:mt-12 inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-neutral-900 group">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 hover:text-[#C9A227] transition-colors duration-200"
                >
                  <span className="relative">
                    More about Charles
                    <span
                      className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{ backgroundColor: "#C9A227" }}
                      aria-hidden="true"
                    />
                  </span>
                  <FiArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Three Principles row ─────────────────────────────────── */}
        <div
          ref={listRef}
          className="pt-12 md:pt-14 border-t border-neutral-300/70"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-8">
            The Advisory Approach
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard
                key={p.number}
                principle={p}
                index={i}
                visible={listVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PrincipleCard = ({ principle, index, visible }) => {
  const { number, title, copy } = principle;
  return (
    <article
      className={[
        "transition-all duration-[700ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${120 * index}ms` : "0ms" }}
    >
      <div className="flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.22em] uppercase mb-4">
        <span style={{ color: "#C9A227" }}>{number}</span>
        <span
          className="inline-block w-6 h-px"
          style={{ backgroundColor: "#C9A227" }}
          aria-hidden="true"
        />
      </div>
      <h3 className="font-light leading-[1.2] tracking-tight text-neutral-900 text-[22px] md:text-[24px] mb-3">
        {title}
      </h3>
      <p className="text-[14px] md:text-[14.5px] leading-[1.75] text-neutral-700 max-w-sm">
        {copy}
      </p>
    </article>
  );
};

export default Banner;