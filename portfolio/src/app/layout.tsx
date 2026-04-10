import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tuosito.it";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Simone Puliti — Tool AI & Siti Web · Verona",
    template: "%s | Simone Puliti — Tool AI & Web Developer",
  },
  description:
    "Freelance a Verona: sviluppo tool AI, siti WordPress e app React/Next.js. 14 anni di esperienza. Contattami per un preventivo gratuito.",
  keywords: [
    "sviluppo tool AI",
    "sviluppatore AI Verona",
    "integrazione intelligenza artificiale",
    "assistente AI personalizzato",
    "automazione AI aziendale",
    "Next.js freelance Italia",
    "frontend developer Verona",
    "sviluppatore web Verona",
    "WordPress Verona",
    "freelance frontend Veneto",
    "sviluppatore WordPress Verona",
    "JavaScript developer Verona",
    "sviluppatore freelance Verona",
    "web developer Veneto",
    "e-commerce WooCommerce Verona",
  ],
  authors: [{ name: "Simone Puliti", url: siteUrl }],
  creator: "Simone Puliti",
  publisher: "Simone Puliti",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "it-IT": siteUrl,
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Simone Puliti — Tool AI & Web Developer",
    title: "Simone Puliti — Tool AI & Siti Web · Verona",
    description:
      "Freelance a Verona: sviluppo tool AI su misura, siti WordPress e app React/Next.js. 14 anni di esperienza. Preventivo gratuito.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Simone Puliti Frontend Developer Verona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simone Puliti — Tool AI & Siti Web · Verona",
    description:
      "Sviluppo tool AI personalizzati, siti WordPress e app React/Next.js. Freelance a Verona, disponibile da remoto.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@simonepuliti",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Simone Puliti",
    jobTitle: "Frontend Developer & AI Specialist",
    description:
      "Frontend Developer freelance con oltre 14 anni di esperienza. Sviluppo tool AI personalizzati, siti WordPress, e-commerce e app React/Next.js. Basato a Verona, disponibile in tutto il Veneto e da remoto.",
    url: siteUrl,
    email: "simowebdesigner@gmail.com",
    sameAs: [
      "https://github.com/simonepuliti",
      "https://linkedin.com/in/simone-puliti-23071898",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Verona",
      addressRegion: "Veneto",
      addressCountry: "IT",
    },
    areaServed: ["Verona", "Veneto", "Italia"],
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer & AI Specialist",
      occupationLocation: { "@type": "City", name: "Verona" },
      skills: "WordPress, React, Next.js, TypeScript, WooCommerce, Tool AI, Claude API, OpenAI API, Automazione AI",
    },
    knowsAbout: [
      "Tool AI personalizzati",
      "Intelligenza Artificiale",
      "Claude API",
      "OpenAI API",
      "Automazione AI",
      "WordPress",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "WooCommerce",
      "Tailwind CSS",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Simone Puliti — Tool AI & Web Development",
    url: siteUrl,
    description:
      "Sviluppo tool AI personalizzati, siti WordPress, e-commerce WooCommerce e app React/Next.js. Freelance a Verona, disponibile da remoto in tutta Italia.",
    provider: { "@type": "Person", name: "Simone Puliti" },
    areaServed: ["Verona", "Veneto", "Italia"],
    serviceType: [
      "Sviluppo Tool AI",
      "Integrazione Claude API",
      "Integrazione OpenAI API",
      "Automazione AI aziendale",
      "Sviluppo WordPress",
      "E-commerce WooCommerce",
      "Sviluppo React / Next.js",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Sviluppo Tool AI Personalizzato",
        description: "Assistenti AI, chatbot e automazioni su misura per la tua azienda.",
      },
      {
        "@type": "Offer",
        name: "Sito WordPress Professionale",
        description: "Siti WordPress custom, veloci e ottimizzati SEO.",
      },
      {
        "@type": "Offer",
        name: "App React / Next.js",
        description: "Interfacce moderne con React e Next.js, ottimizzate per performance e SEO.",
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="it" href={siteUrl} />
        <meta name="geo.region" content="IT-VR" />
        <meta name="geo.placename" content="Verona" />
        <meta name="geo.position" content="45.4384;10.9916" />
        <meta name="ICBM" content="45.4384, 10.9916" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} themes={["light", "dark"]}>
          {children}
        </ThemeProvider>
        <Analytics mode="production" />;
      </body>
    </html>
  );
}
