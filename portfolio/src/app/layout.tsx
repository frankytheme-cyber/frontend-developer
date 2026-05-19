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


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://simonepuliti.dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#29353e" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Simone Puliti — Web Design, Tool AI & Siti Web · Verona",
    template: "%s | Simone Puliti — Web Design & Web Developer",
  },
  description:
    "Web designer e developer freelance a Verona: web design, tool AI, siti WordPress e app React/Next.js. 14 anni di esperienza. Preventivo gratuito.",
  keywords: [
    "web design Verona",
    "web designer Verona",
    "webdesign Verona",
    "web design Veneto",
    "design siti web Verona",
    "progettazione siti web Verona",
    "UI design Verona",
    "UX design Verona",
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
    siteName: "Simone Puliti — Web Design & Web Developer",
    title: "Simone Puliti — Web Design, Tool AI & Siti Web · Verona",
    description:
      "Web designer e developer freelance a Verona: web design, tool AI su misura, siti WordPress e app React/Next.js. 14 anni di esperienza.",
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
    title: "Simone Puliti — Web Design, Tool AI & Siti Web · Verona",
    description:
      "Web design, tool AI personalizzati, siti WordPress e app React/Next.js. Freelance a Verona, disponibile da remoto.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@simonepuliti",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Simone Puliti — Web Design & Web Developer",
    alternateName: "Simone Puliti",
    url: siteUrl,
    inLanguage: "it-IT",
    publisher: { "@type": "Person", name: "Simone Puliti", url: siteUrl },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Simone Puliti",
    jobTitle: "Web Designer, Frontend Developer & AI Specialist",
    description:
      "Web designer e Frontend Developer freelance con oltre 14 anni di esperienza. Web design, tool AI personalizzati, siti WordPress, e-commerce e app React/Next.js. Basato a Verona, disponibile in tutto il Veneto e da remoto.",
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
      name: "Web Designer, Frontend Developer & AI Specialist",
      occupationLocation: { "@type": "City", name: "Verona" },
      skills: "Web Design, UI Design, UX Design, WordPress, React, Next.js, TypeScript, WooCommerce, Tool AI, Claude API, OpenAI API, Automazione AI",
    },
    knowsAbout: [
      "Web Design",
      "UI Design",
      "UX Design",
      "Progettazione siti web",
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
    name: "Simone Puliti — Web Design, Tool AI & Web Development",
    url: siteUrl,
    description:
      "Web design, sviluppo tool AI personalizzati, siti WordPress, e-commerce WooCommerce e app React/Next.js. Freelance a Verona, disponibile da remoto in tutta Italia.",
    provider: { "@type": "Person", name: "Simone Puliti" },
    areaServed: ["Verona", "Veneto", "Italia"],
    serviceType: [
      "Web Design",
      "UI/UX Design",
      "Progettazione siti web",
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
        name: "Web Design su misura",
        description: "Progettazione UI/UX e web design custom orientati a conversione e brand identity.",
      },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="sage-light"
          enableSystem={false}
          themes={["sage-light", "sage-dark"]}
        >
          {children}
        </ThemeProvider>
        <Analytics mode="production" />;
      </body>
    </html>
  );
}
