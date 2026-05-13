"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Contact page — /contact
 *
 * Structure:
 *  1. Hero
 *  2. Split layout: form (left) + contact details (right)
 *  3. FAQ (three-item accordion)
 *
 * Form:
 *  - Client-side validation (name, email, message required)
 *  - Honeypot field for spam
 *  - POSTs to /api/contact (swap for your backend / Resend / Formspree / etc.)
 *  - Loading / success / error states
 *  - Subject of inquiry selector (maps to which pillar)
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

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());

const INQUIRY_OPTIONS = [
  { value: "", label: "Select an area of focus" },
  { value: "strategic-direction", label: "Strategic Direction" },
  { value: "systems-sops", label: "Systems & SOPs" },
  { value: "leadership-architecture", label: "Leadership Architecture" },
  { value: "ongoing-advisory", label: "Ongoing Advisory" },
  { value: "not-sure", label: "I'm not sure yet — let's talk" },
];

const FAQ = [
  {
    q: "How do engagements typically begin?",
    a: "Every engagement starts with a Diagnose phase — a focused diagnostic (1–2 weeks) where we identify the real breakdown points before designing any solution. Most relationships begin with a 30-minute strategy session at no charge.",
  },
  {
    q: "Who is this for?",
    a: "This is for founders, executives, and ministry leaders who have vision but inconsistent execution — where structure has not kept pace with growth, decisions still depend on the leader, and the team lacks clear systems and accountability.",
  },
  {
    q: "Are engagements available outside Nigeria?",
    a: "Yes. Based in Abuja, Nigeria, I serve clients globally through virtual advisory engagements — including video sessions, async deliverables, and periodic in-person intensives where the engagement warrants them.",
  },
];

// SEO — ContactPage + ContactPoint JSON-LD
const CONTACT_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Charles Adakole",
  mainEntity: {
    "@type": "Organization",
    name: "Charles Adakole",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@charlesadakole.com",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════
export default function ContactPage() {
  return (
    <>
      <Script
        id="ld-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_LD) }}
      />

      <Navbar />

      <main id="main-content" role="main">
        <ContactHero />
        <ContactBody />
        <ContactFAQ />
      </main>

      <Footer />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Hero
// ═══════════════════════════════════════════════════════════════════════
const ContactHero = () => (
  <section
    aria-labelledby="contact-hero-heading"
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
          Contact
        </p>

        <h1
          id="contact-hero-heading"
          className="font-light leading-[1.02] tracking-[-0.015em] text-white text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px]"
        >
          Book a{" "}
          <span className="italic font-normal" style={{ color: "#C9A227" }}>
            Strategy Session
          </span>
          .
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl text-[15px] md:text-[17px] leading-[1.7] text-white/75">
          If execution is inconsistent, structure is not keeping up with growth,
          or your team depends too heavily on you — let&apos;s talk about what
          building the right structure would look like for your organization.
        </p>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════
// Contact body — form + details
// ═══════════════════════════════════════════════════════════════════════
const ContactBody = () => {
  const [ref, visible] = useReveal();

  return (
    <section className="relative bg-white py-20 md:py-28 lg:py-32">
      <div ref={ref} className="px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div
            className={[
              "lg:col-span-7 transition-all duration-[900ms] ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6">
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
              Start the Conversation
            </p>

            <h2 className="font-light leading-[1.1] tracking-tight text-neutral-900 text-[30px] md:text-[40px] lg:text-[44px] max-w-xl">
              Tell me what you&apos;re{" "}
              <span className="italic font-normal" style={{ color: "#C9A227" }}>
                facing
              </span>
              .
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-neutral-700">
              Every inquiry is read personally. You can expect a personal
              response within two business days.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          {/* Details */}
          <div
            className={[
              "lg:col-span-5 lg:pl-6 transition-all duration-[900ms] ease-out delay-200",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <div className="sticky lg:top-32">
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6">
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
                Or Reach Me Directly
              </p>

              <ul className="space-y-8">
                <ContactDetail
                  Icon={FiMail}
                  label="Email"
                  value="hello@charlesadakole.com"
                  href="mailto:hello@charlesadakole.com"
                  note="For inquiries and introductions"
                />
                <ContactDetail
                  Icon={FiCalendar}
                  label="Schedule"
                  value="Book a 30-min call"
                  href="/contact"
                  note="Complimentary introductory conversation"
                />
                <ContactDetail
                  Icon={FiMapPin}
                  label="Location"
                  value="Abuja, Nigeria"
                  note="Global Advisory · In-person engagements by arrangement"
                />
              </ul>

              {/* Response-time card */}
              <div className="mt-12 p-6 md:p-7 bg-[#F4F0E8] rounded-sm relative overflow-hidden">
                <div
                  className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-[0.12]"
                  style={{ backgroundColor: "#C9A227" }}
                  aria-hidden="true"
                />
                <p className="relative text-[10.5px] font-semibold tracking-[0.26em] uppercase" style={{ color: "#C9A227" }}>
                  Response Promise
                </p>
                <p className="relative mt-3 text-[17px] font-light leading-[1.4] text-neutral-900">
                  A personal reply from me — not an auto-responder — within{" "}
                  <span className="italic font-normal" style={{ color: "#8a6b18" }}>
                    two business days
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactDetail = ({ Icon, label, value, href, note }) => {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <li>
      <Wrapper
        {...wrapperProps}
        className={href ? "group block focus:outline-none" : "block"}
      >
        <div className="flex items-start gap-4">
          <span
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border"
            style={{
              borderColor: "#C9A227",
              backgroundColor: "rgba(201,162,39,0.08)",
            }}
          >
            <Icon className="w-4 h-4" style={{ color: "#C9A227" }} aria-hidden="true" />
          </span>

          <div className="flex-1 min-w-0 pt-1">
            <p className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-1.5">
              {label}
            </p>
            <p
              className={[
                "text-[17px] font-light text-neutral-900 leading-tight",
                href && "group-hover:text-[#C9A227] transition-colors flex items-center gap-2",
              ].filter(Boolean).join(" ")}
            >
              {value}
              {href && (
                <FiArrowUpRight
                  className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  aria-hidden="true"
                />
              )}
            </p>
            {note && <p className="mt-2 text-[12.5px] text-neutral-600 leading-[1.6]">{note}</p>}
          </div>
        </div>
      </Wrapper>
    </li>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// ContactForm — validated, honeypot, real states
// ═══════════════════════════════════════════════════════════════════════
const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    inquiry: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please share your name.";
    if (!form.email.trim()) next.email = "Please share your email.";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 20) {
      next.message = "Please share at least a few sentences so I can respond thoughtfully.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot — if a bot filled this, silently succeed without sending
    if (form.website.trim() !== "") {
      setStatus("success");
      return;
    }

    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          inquiry: form.inquiry,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error("submission failed");
      setStatus("success");
      setForm({ name: "", email: "", organization: "", inquiry: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-[#C9A227]/40 bg-[#C9A227]/[0.06] p-8 md:p-10"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#C9A227" }}
        >
          <FiCheck className="w-6 h-6 text-neutral-900" strokeWidth={3} aria-hidden="true" />
        </div>
        <h3 className="text-[22px] md:text-[26px] font-light text-neutral-900 leading-tight mb-3">
          Thank you — your note has been received.
        </h3>
        <p className="text-[14.5px] leading-[1.75] text-neutral-700 max-w-lg">
          I&apos;ll respond personally within two business days. In the
          meantime, feel free to{" "}
          <Link href="/services" className="underline underline-offset-2 hover:text-[#C9A227] transition-colors">
            explore the four services
          </Link>{" "}
          if you haven&apos;t already.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-neutral-900 hover:text-[#C9A227] transition-colors"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from humans, catches bots */}
      <div className="absolute -left-[10000px] top-0" aria-hidden="true">
        <label>
          Do not fill this in
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          id="name"
          label="Your name"
          required
          value={form.name}
          onChange={update("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <Field
        id="organization"
        label="Organization (optional)"
        value={form.organization}
        onChange={update("organization")}
        autoComplete="organization"
      />

      <SelectField
        id="inquiry"
        label="Area of focus"
        value={form.inquiry}
        onChange={update("inquiry")}
        options={INQUIRY_OPTIONS}
      />

      <TextAreaField
        id="message"
        label="What are you facing?"
        required
        value={form.message}
        onChange={update("message")}
        error={errors.message}
        placeholder="A few sentences on the challenge, the stakes, and what you've already tried."
      />

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-sm border border-red-200 bg-red-50"
        >
          <FiAlertCircle className="shrink-0 w-5 h-5 text-red-600 mt-0.5" aria-hidden="true" />
          <p className="text-[13.5px] leading-[1.6] text-red-800">
            Something went wrong. Please try again, or email me directly at{" "}
            <a href="mailto:hello@charlesadakole.com" className="underline underline-offset-2">
              hello@charlesadakole.com
            </a>
            .
          </p>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A227] hover:bg-[#B8901C] text-neutral-900 text-[11.5px] font-semibold tracking-[0.16em] uppercase shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A227] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <span
                className="w-3.5 h-3.5 rounded-full border-2 border-neutral-900/40 border-t-neutral-900 animate-spin"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="mt-4 text-[12px] text-neutral-500">
          By submitting, you agree that I may reply to you at the email
          provided. I don&apos;t share your message with anyone.
        </p>
      </div>
    </form>
  );
};

const Field = ({ id, label, type = "text", required, value, onChange, error, ...rest }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-2"
    >
      {label}
      {required && <span className="ml-1" style={{ color: "#C9A227" }}>*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={[
        "w-full px-4 py-3 text-[14.5px] text-neutral-900 bg-white border rounded-sm transition-colors",
        "focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]",
        error ? "border-red-400" : "border-neutral-300",
      ].join(" ")}
      {...rest}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-[12px] text-red-600">
        {error}
      </p>
    )}
  </div>
);

const SelectField = ({ id, label, value, onChange, options }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-2"
    >
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 text-[14.5px] text-neutral-900 bg-white border border-neutral-300 rounded-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors appearance-none bg-no-repeat bg-right"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23C9A227' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        backgroundPosition: "right 1rem center",
        backgroundSize: "16px",
        paddingRight: "2.5rem",
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ id, label, required, value, onChange, error, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-700 mb-2"
    >
      {label}
      {required && <span className="ml-1" style={{ color: "#C9A227" }}>*</span>}
    </label>
    <textarea
      id={id}
      name={id}
      rows={6}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={[
        "w-full px-4 py-3 text-[14.5px] text-neutral-900 bg-white border rounded-sm transition-colors resize-y",
        "focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]",
        error ? "border-red-400" : "border-neutral-300",
      ].join(" ")}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-[12px] text-red-600">
        {error}
      </p>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════
const ContactFAQ = () => {
  const [ref, visible] = useReveal();
  const [open, setOpen] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative bg-[#F4F0E8] py-20 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p
              className={[
                "flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6 transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C9A227" }} />
              Common Questions
            </p>
            <h2
              id="faq-heading"
              className={[
                "font-light leading-[1.08] tracking-tight text-neutral-900 text-[32px] md:text-[42px] lg:text-[46px] transition-all duration-[900ms] delay-100",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              Before you{" "}
              <span className="italic font-normal" style={{ color: "#C9A227" }}>
                write
              </span>
              .
            </h2>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-neutral-300/60 border-t border-neutral-300/60">
              {FAQ.map((item, i) => (
                <FAQItem
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                  visible={visible}
                  delay={200 + i * 100}
                />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, onToggle, visible, delay }) => (
  <div
    className={[
      "transition-all duration-700",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    ].join(" ")}
    style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
  >
    <dt>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 py-6 md:py-7 text-left group focus:outline-none"
      >
        <span className="text-[17px] md:text-[19px] font-light leading-[1.4] tracking-tight text-neutral-900 group-hover:text-[#B8901C] transition-colors">
          {question}
        </span>
        <span
          className={[
            "shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
            isOpen ? "bg-[#C9A227] border-[#C9A227]" : "border-neutral-400 group-hover:border-[#C9A227]",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg
            className={[
              "w-3.5 h-3.5 transition-transform duration-300",
              isOpen ? "rotate-45 text-neutral-900" : "text-neutral-700 group-hover:text-[#C9A227]",
            ].join(" ")}
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>
    </dt>
    <dd
      className={[
        "grid transition-[grid-template-rows] duration-500 ease-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <p className="pb-6 md:pb-7 pr-12 text-[14.5px] md:text-[15px] leading-[1.8] text-neutral-700 max-w-3xl">
          {answer}
        </p>
      </div>
    </dd>
  </div>
);