"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * HomeProducts — Charles Adakole Consulting | Core Service Pillars
 *
 * Content (per brand brief, Section 4): four pillars (I-IV).
 * Layout: white bg, sticky left positioning statement, expandable pillar rows.
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

const PRACTICES = [
  {
    number: "I",
    title: "Strategic Direction",
    summary:
      "Clarify priorities and positioning so execution is focused and resources are not wasted on the wrong things.",
    detail:
      "We identify what matters most and align your direction before building anything — diagnostic before prescriptive.",
    href: "/services#strategic-direction",
  },
  {
    number: "II",
    title: "Systems & SOPs",
    summary:
      "Turn informal operations into documented, repeatable systems. Build a business that runs beyond your personal presence.",
    detail:
      "We document your core workflows into Standard Operating Procedures that ensure consistency, scalability, and operational peace.",
    href: "/services#systems-sops",
  },
  {
    number: "III",
    title: "Leadership Architecture",
    summary:
      "Design how your teams think, communicate, and execute. Move from manager to leader through structured accountability.",
    detail:
      "Custom role clarity, meeting cadences, feedback loops, and accountability frameworks — without constant micromanagement.",
    href: "/services#leadership-architecture",
  },
  {
    number: "IV",
    title: "Ongoing Advisory",
    summary:
      "Ensure structure evolves as your organization scales. A partner who stays until the systems are lived reality.",
    detail:
      "Periodic reviews, refinement cycles, and an ongoing advisory relationship that keeps your architecture matched to your ambition.",
    href: "/services#ongoing-advisory",
  },
];

const HomeProducts = () => {
  const [headerRef, headerVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <section
      aria-labelledby="practices-heading"
      className="relative bg-white py-20 md:py-28 lg:py-36"
    >
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div ref={headerRef} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
              Services
            </p>

            <h2
              id="practices-heading"
              className={[
                "font-light leading-[1.05] tracking-tight text-neutral-900 text-[38px] md:text-[48px] lg:text-[56px] transition-all duration-[900ms] delay-100",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              ].join(" ")}
            >
              Four services.{" "}
              <span className="italic font-normal" style={{ color: "#C9A227" }}>One</span>{" "}
              result: structured execution.
            </h2>

            <p
              className={[
                "mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.75] text-neutral-700 max-w-md transition-all duration-700 delay-200",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              Whether you&apos;re a founder, executive, or ministry leader —
              if execution is inconsistent and growth is increasing pressure,
              these four services bring the structure that changes that.
            </p>

            <div
              className={[
                "mt-8 md:mt-10 transition-all duration-700 delay-300",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-neutral-900 hover:text-[#C9A227] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/40 rounded-sm transition-colors duration-200"
              >
                <span className="relative">
                  View all services
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

          <div ref={listRef} className="lg:col-span-7">
            <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
              {PRACTICES.map((p, i) => (
                <PracticeRow key={p.number} practice={p} index={i} visible={listVisible} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const PracticeRow = ({ practice, index, visible }) => {
  const { number, title, summary, detail, href } = practice;

  return (
    <li
      className={[
        "group transition-all duration-[700ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${120 + index * 90}ms` : "0ms" }}
    >
      <Link href={href} className="block relative py-7 md:py-9 focus:outline-none">
        <div className="flex items-start gap-6 md:gap-10">
          <span
            className="shrink-0 text-[13px] font-semibold tracking-[0.24em] pt-1 md:pt-2 transition-colors duration-300 min-w-[24px]"
            style={{ color: "#C9A227" }}
            aria-hidden="true"
          >
            {number}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className="font-light leading-[1.15] tracking-tight text-neutral-900 text-[24px] md:text-[30px] lg:text-[34px] transition-transform duration-500 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1">
              {title}
            </h3>
            <p className="mt-3 text-[14.5px] md:text-[15px] leading-[1.65] text-neutral-600 max-w-xl">
              {summary}
            </p>
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <p className="mt-4 text-[13.5px] leading-[1.7] text-neutral-500 max-w-xl italic">
                  {detail}
                </p>
              </div>
            </div>
          </div>

          <span
            className="shrink-0 self-start mt-2 md:mt-3 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full border border-neutral-300 text-neutral-700 transition-all duration-500 ease-out group-hover:bg-[#C9A227] group-hover:border-[#C9A227] group-hover:text-neutral-900 group-focus-visible:bg-[#C9A227] group-focus-visible:border-[#C9A227] group-focus-visible:text-neutral-900"
            aria-hidden="true"
          >
            <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
          </span>
        </div>

        <span
          className="absolute left-0 right-0 -bottom-px h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[600ms] ease-out"
          style={{ backgroundColor: "#C9A227" }}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
};

export default HomeProducts;