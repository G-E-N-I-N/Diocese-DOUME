import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProviders } from "./providers/ThemeProviders";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const oldEnglish = localFont({
  src: "./fonts/OldEnglishFive.ttf",
  variable: "--font-oldEnglish",
  preload: true, // optimisation SEO / perf
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title:
    "Diocèse de Doumé Abong Mbang | Foi, Pastorale et Communauté au Cameroun",
  description:
    "Site officiel du Diocèse de Doumé Abong Mbang. Retrouvez l'Évêque, les zones pastorales, les ouvriers apostoliques et les activités chrétiennes qui animent la vie de foi dans l’Est du Cameroun.",
  metadataBase: new URL("https://diocese-doume.vercel.app/"),

  keywords: [
    "diocèse Doumé Abong Mbang",
    "église catholique Cameroun",
    "pastorale",
    "évêque Doumé",
    "zone pastorale Cameroun",
    "ouvriers apostoliques",
    "vie chrétienne Cameroun",
    "paroisse est Cameroun",
    "haut-nyong",
  ],

  authors: [{ name: "l0rd_9h057" }],

  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },

  openGraph: {
    title: "Diocèse de Doumé Abong Mbang - Site Officiel",
    description:
      "Découvrez la vie de foi, les zones pastorales et les activités chrétiennes du Diocèse de Doumé Abong Mbang.",
    url: "/",
    siteName: "Diocèse de Doumé Abong Mbang",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630/213b63/ffffff?text=Diocèse+Doumé+Abong+Mbang",
        width: 1200,
        height: 630,
        alt: "Cathédrale du Diocèse de Doumé Abong Mbang",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Diocèse de Doumé Abong Mbang",
    description:
      "Site officiel du Diocèse de Doumé Abong Mbang : foi, pastorale et vie communautaire dans l’Est du Cameroun.",
    images: [
      "https://placehold.co/1200x630/213b63/ffffff?text=Diocèse+Doumé+Abong+Mbang",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={oldEnglish.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "Diocèse de Doumé Abong Mbang",
              url: "https://diocese-doume.vercel.app/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Doumé",
                addressRegion: "Est",
                addressCountry: "CM",
              },
              description:
                "Site officiel du Diocèse de Doumé Abong Mbang, Cameroun.",
            }),
          }}
        />

        <ThemeProviders>
          <Header />
          <main role="main">{children}</main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
