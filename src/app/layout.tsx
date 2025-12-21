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
  preload: true,
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
  metadataBase: new URL("https://www.diocesededoumeabong-mbang.com"),

  title: {
    default:
      "Diocèse de Doumé-Abong-Mbang | Église Catholique dans l’Est du Cameroun",
    template: "%s | Diocèse de Doumé-Abong-Mbang",
  },

  description:
    "Site officiel du Diocèse de Doumé-Abong-Mbang au Cameroun. Informations sur l’Évêque, les zones pastorales, les ouvriers apostoliques et les activités de la vie chrétienne dans l’Est du Cameroun.",

  keywords: [
    "diocèse de Doumé Abong-Mbang",
    "église catholique Cameroun",
    "diocèse catholique Est Cameroun",
    "paroisses Haut-Nyong",
    "zones pastorales Cameroun",
    "ouvriers apostoliques",
  ],

  authors: [
    {
      name: "Diocèse de Doumé-Abong-Mbang",
      url: "https://www.diocesededoumeabong-mbang.com",
    },
  ],

  alternates: {
    canonical: "/",
    languages: {
      "fr-CM": "/",
      "fr-FR": "/",
    },
  },

  openGraph: {
    title: "Diocèse de Doumé-Abong-Mbang – Site Officiel",
    description:
      "Découvrez la mission, les activités pastorales et la vie chrétienne du Diocèse de Doumé-Abong-Mbang au Cameroun.",
    url: "/",
    siteName: "Diocèse de Doumé-Abong-Mbang",
    locale: "fr_CM",
    type: "website",
    images: [
      {
        url: "https://www.diocesededoumeabong-mbang.com/logo couleur.png",
        width: 1200,
        height: 630,
        alt: "Diocèse de Doumé-Abong-Mbang",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Diocèse de Doumé-Abong-Mbang",
    description:
      "Site officiel du Diocèse de Doumé-Abong-Mbang : foi, pastorale et vie communautaire dans l’Est du Cameroun.",
    images: ["https://www.diocesededoumeabong-mbang.com/logo couleur.png"],
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
              "@id": "https://www.diocesededoumeabong-mbang.com/#church",
              name: "Diocèse de Doumé-Abong-Mbang",
              url: "https://www.diocesededoumeabong-mbang.com",
              logo: "https://www.diocesededoumeabong-mbang.com/logo couleur.png",
              description:
                "Diocèse de l’Église catholique situé dans la région de l’Est du Cameroun, couvrant le département du Haut-Nyong.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Doumé",
                addressRegion: "Est",
                addressCountry: "CM",
              },
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Région de l’Est, Cameroun",
              },
              sameAs: [
                "https://www.facebook.com/diocesededoume",
                "https://www.youtube.com/@diocesededoume"
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.diocesededoumeabong-mbang.com/#organization",
              name: "Diocèse de Doumé-Abong-Mbang",
              url: "https://www.diocesededoumeabong-mbang.com",
              logo: "https://www.diocesededoumeabong-mbang.com/logo couleur.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Service pastoral",
                areaServed: "CM",
                availableLanguage: "French",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.diocesededoumeabong-mbang.com/#website",
              url: "https://www.diocesededoumeabong-mbang.com",
              name: "Diocèse de Doumé-Abong-Mbang",
              inLanguage: "fr-CM",
              publisher: {
                "@id": "https://www.diocesededoumeabong-mbang.com/#organization",
              },
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
