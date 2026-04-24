import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

/**
 * RootLayout — Charles Adakole Consulting
 *
 * Responsibilities:
 *  - Load Montserrat with the exact weights used site-wide (trimmed from 9 to 5
 *    for a lighter CSS payload; swap/variable-font if your brand grows)
 *  - Declare global metadata (title template, OG, Twitter, robots, canonical)
 *  - Emit root-level JSON-LD (Organization + ProfessionalService + WebSite)
 *    so every page inherits rich-result eligibility without duplicating markup
 *  - Wrap the app in AppContextProvider and mount a brand-styled Toaster
 *
 * Environment:
 *  - Set NEXT_PUBLIC_SITE_URL to your production domain (e.g. https://charlesadakole.com)
 *  - Replace /og-image.jpg (1200x630) in /public before launch
 *  - Replace /favicon.ico, /apple-touch-icon.png, /site.webmanifest
 */

// ─── Font ────────────────────────────────────────────────────────────
// Weights actually used across the site:
//   300 — large light headlines
//   400 — body default
//   500 — nav links, buttons (semibold-leaning)
//   600 — eyebrows, small-caps labels
//   700 — wordmark, emphatic copy
// Italic 300/400 for the signature gold-accent words.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

// ─── URLs ────────────────────────────────────────────────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://charlesadakole.com";

// ─── Metadata (Next.js App Router picks this up automatically) ───────
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Charles Adakole Consulting | Strategic Advisor & Executive Coach",
    template: "%s · Charles Adakole Consulting",
  },

  description:
    "Strategic advisory and executive coaching for leaders in business, life, and ministry. Helping founders, executives, and ministry leaders move from overwhelm to high-impact leadership through strategic clarity and structural precision.",

  applicationName: "Charles Adakole Consulting",
  authors: [{ name: "Charles Adakole" }],
  creator: "Charles Adakole",
  publisher: "Charles Adakole Consulting",
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",

  keywords: [
    "strategic advisor",
    "executive coach",
    "leadership consulting",
    "business consulting Nigeria",
    "SOP consulting",
    "standard operating procedures",
    "brand positioning",
    "ministry consulting",
    "organizational management",
    "Charles Adakole",
    "Abuja consulting",
  ],

  category: "Business Consulting",

  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Charles Adakole Consulting",
    title:
      "Charles Adakole Consulting | Strategic Advisor & Executive Coach",
    description:
      "Clarity of Vision. Precision of Execution. Advisory and coaching for leaders in business, life, and ministry — from Abuja to the world.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Charles Adakole Consulting — Strategic Advisor & Executive Coach",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Charles Adakole Consulting | Strategic Advisor & Executive Coach",
    description:
      "Clarity of Vision. Precision of Execution. Advisory and coaching for leaders in business, life, and ministry.",
    images: ["/og-image.jpg"],
    creator: "@charlesadakole",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#C9A227" }],
  },

  manifest: "/site.webmanifest",

  verification: {
    // Replace with real verification strings when you have them.
    // google: "your-google-site-verification",
    // other: { "me": ["hello@charlesadakole.com"] },
  },

  other: {
    "format-detection": "telephone=no, address=no, email=no",
  },
};

// ─── Viewport (must be a separate export in Next.js 14+) ────────────
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // accessibility: allow users to zoom
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
  colorScheme: "light",
};

// ─── JSON-LD (rendered at the root; applies to every page) ───────────
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Charles Adakole Consulting",
      alternateName: "Charles Adakole & Co",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.linkedin.com/in/charles-adakole",
        "https://x.com/charlesadakole",
      ],
      founder: {
        "@type": "Person",
        name: "Charles Adakole",
        jobTitle: "Strategic Advisor & Executive Coach",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hello@charlesadakole.com",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abuja",
        addressCountry: "NG",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Charles Adakole Consulting",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      description:
        "Strategic advisory and executive coaching for business leaders, executives, and ministry principals. Four pillars: Strategic Clarity & Brand Positioning, SOP & Systems Consulting, Team Management & Leadership Architecture, Life & Ministry Advisory.",
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Place", name: "Global (Virtual Advisory)" },
      ],
      serviceType: [
        "Strategic Clarity & Brand Positioning",
        "SOP & Systems Consulting",
        "Team Management & Leadership Architecture",
        "Life & Ministry Advisory",
      ],
      slogan: "Establishing Clarity, Enabling Impact.",
      priceRange: "$$$",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Charles Adakole Consulting",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// RootLayout
// ═══════════════════════════════════════════════════════════════════════
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect hints — resources we'll request early and often */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for any CDN-served images (update/remove per your setup) */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* JSON-LD structured data */}
        <Script
          id="ld-root"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${montserrat.className} antialiased text-neutral-900 bg-white selection:bg-[#C9A227]/30 selection:text-neutral-900`}
      >
        {/* Skip-to-content link — accessible focus target for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#C9A227] focus:text-neutral-900 focus:font-semibold focus:tracking-[0.14em] focus:uppercase focus:text-[11px] focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        {/* Brand-styled toast system */}
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            duration: 4000,
            className: "",
            style: {
              fontFamily:
                "var(--font-montserrat), ui-sans-serif, system-ui, sans-serif",
              fontSize: "13.5px",
              fontWeight: 500,
              padding: "14px 18px",
              borderRadius: "9999px",
              background: "#0A0A0B",
              color: "#FFFFFF",
              border: "1px solid rgba(201,162,39,0.35)",
              boxShadow:
                "0 12px 40px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,162,39,0.15)",
              maxWidth: "420px",
            },
            success: {
              iconTheme: { primary: "#C9A227", secondary: "#0A0A0B" },
              style: {
                background: "#0A0A0B",
                color: "#FFFFFF",
                border: "1px solid rgba(201,162,39,0.5)",
              },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FFFFFF" },
              style: {
                background: "#0A0A0B",
                color: "#FFFFFF",
                border: "1px solid rgba(239,68,68,0.5)",
              },
            },
            loading: {
              iconTheme: { primary: "#C9A227", secondary: "#0A0A0B" },
            },
          }}
        />

        <AppContextProvider>{children}</AppContextProvider>

        {/* Analytics gate — only loads if cookie consent has been given.
            Wire your GA / GTM / Plausible / Umami script ID into the env var. */}
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <Script
            id="analytics-gate"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  try {
                    var consent = localStorage.getItem('cac.cookieConsent');
                    if (consent === 'accepted') {
                      // Load your analytics here, or dispatch an event
                      // your provider-specific loader listens for.
                      window.dispatchEvent(new Event('load-analytics'));
                    }
                    window.addEventListener('cookie-consent-change', function (e) {
                      if (e && e.detail && e.detail.consent === 'accepted') {
                        window.dispatchEvent(new Event('load-analytics'));
                      }
                    });
                  } catch (err) { /* ignore */ }
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}