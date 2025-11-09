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
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diocèse de Doumé Abong Mbang | Foi, Pastorale et Communauté au Cameroun",
  
  description: "Site officiel du Diocèse de Doumé Abong Mbang. Découvrez notre Évêque, les Zones Pastorales, les Ouvriers Apostoliques, et toutes les activités qui animent la vie de foi et le développement communautaire dans la région Est du Cameroun.",
  
  keywords: [
    "diocèse", "Doumé Abong Mbang", "catholique", "église", "Cameroun", 
    "pastorale", "jeunesse", "évêque", "foi", "zones pastorales", 
    "ouvriers apostoliques", "activités chrétiennes", "haut-nyong", "l0rd_9h057"
  ],
  
  authors: [{ name: "l0rd_9h057" }],
  
  metadataBase: new URL('https://diocese-doume.vercel.app/'),
  
  openGraph: {
    title: 'Diocèse de Doumé Abong Mbang - Site Officiel',
    description: 'Découvrez la vie de foi, les zones pastorales et les activités de la communauté dans l’Est du Cameroun.',
    url: '/',
    siteName: 'Diocèse de Doumé Abong Mbang',
    images: [
        {
            // Remplacer par l'URL d'une image représentative du Diocèse ou de la Cathédrale
            url: 'https://placehold.co/1200x630/213b63/ffffff?text=Diocèse+Doumé+Abong+Mbang', 
            width: 1200,
            height: 630,
            alt: 'Cathédrale Saint Paul et Pierre du Diocèse',
        }
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  // --- Configuration pour l'indexation ---
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={oldEnglish.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
