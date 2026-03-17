import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    default: "Simone Puliti — Frontend Developer Verona",
    template: "%s | Simone Puliti Frontend Developer",
  },
  description:
    "Frontend Developer freelance a Verona con 14 anni di esperienza. Specializzato in WordPress, JavaScript e interfacce fintech/DeFi. Temi custom, e-commerce, tool finanza digitale.",
  keywords: [
    "frontend developer Verona",
    "sviluppatore web Verona",
    "WordPress Verona",
    "freelance frontend Veneto",
    "sviluppatore WordPress Verona",
    "JavaScript developer Verona",
    "sviluppatore freelance Verona",
    "web developer Veneto",
    "DeFi frontend developer",
    "fintech developer Verona",
    "temi WordPress personalizzati Verona",
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
    siteName: "Simone Puliti — Frontend Developer",
    title: "Simone Puliti — Frontend Developer Verona",
    description:
      "Frontend Developer freelance a Verona. 14 anni di esperienza in WordPress, JavaScript e interfacce fintech. Temi custom, WooCommerce, tool DeFi.",
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
    title: "Simone Puliti — Frontend Developer Verona",
    description:
      "Frontend Developer freelance a Verona. 14 anni in WordPress, JavaScript, fintech e DeFi.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@simonepuliti",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Simone Puliti",
  jobTitle: "Frontend Developer",
  description:
    "Frontend Developer freelance con oltre 14 anni di esperienza. Specializzato in WordPress, JavaScript, e-commerce e interfacce fintech/DeFi. Basato a Verona, disponibile in tutto il Veneto e da remoto.",
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
    name: "Frontend Developer",
    occupationLocation: {
      "@type": "City",
      name: "Verona",
    },
    skills: "WordPress, React, Next.js, TypeScript, WooCommerce, DeFi, Fintech",
  },
  knowsAbout: [
    "WordPress",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "WooCommerce",
    "DeFi",
    "Uniswap",
    "Fintech",
    "Tailwind CSS",
  ],
};

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
      </body>
    </html>
  );
}
