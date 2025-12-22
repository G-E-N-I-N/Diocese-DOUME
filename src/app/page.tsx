'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { createClient } from '@/utils/supabase/client';

import dynamic from "next/dynamic";

const BertouaMap = dynamic(() => import('@/components/BertouaMap'), {
  ssr: false,
});

export default function Home() {
  const supabase = createClient();

  const [news, setNews] = useState<any[]>([]);
  useEffect(() => {
    async function getNews() {
      const { data: newsData } = await supabase.from('news').select();
      if (newsData && newsData.length > 0) {
          setNews(newsData.reverse());
      }
    }

    getNews();
  }, []);

  const [current, setCurrent] = useState(0);
  // useEffect(() => {
  //   if (news.length === 0) return;
  
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === news.length - 1 ? 0 : prev + 1));
  //   }, 90000);
  
  //   return () => clearInterval(interval);
  // }, [news]);

  const { ref: cathedralRef, isVisible: cathedralVisible } = useScrollAnimation();
  const { ref: announcementRef, isVisible: announcementVisible } = useScrollAnimation();
  const { ref: pastoralRef, isVisible: pastoralVisible } = useScrollAnimation();
  const { ref: crossRef, isVisible: crossVisible } = useScrollAnimation();
  const { ref: carteRef, isVisible: carteVisible } = useScrollAnimation();

  // Thème
  const heroGradient = 'bg-gradient-to-b from-primary/50 to-primary/30';
  const accentColor = 'bg-destructive text-destructive-foreground';
  const backgroundColor = 'bg-footer/10';
  const foregroundColor = 'text-foreground';

  return (
    <main className="flex-1">
      {/* === Section 1 : Cathédrale === */}
      <section
        ref={cathedralRef}
        className={`relative ${heroGradient} ${foregroundColor} py-20 md:py-32 overflow-hidden transition-all duration-1000 ${
          cathedralVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <Image
          src="/cathedrale sacré coeur.png"
          alt="Cathédrale"
          fill
          className="object-cover"
        />

        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-oldEnglish text-primary-foreground lg:text-6xl font-bold mb-6 leading-tight">
              Cathédrale<br />Sacré Coeur.
            </h1>
            <div className={`${accentColor} px-4 py-2 inline-block rounded font-bold mb-6 text-sm`}>
              PRÉSENTATION
            </div>
            <p className="text-base md:text-lg leading-relaxed opacity-95 backdrop-blur-2xl p-5 rounded-4xl">
              Le diocèse de Doumé-Abong Mbang est un diocèse catholique situé dans la région de l'Est du Cameroun. 
              Il couvre le département de Haut-Nyong, avec une superficie de 16 379 km². 
              Son territoire comprend deux principaux sièges : Doumé (cathédrale Sacré-Cœur) 
              et Abong Mbang (cathédrale Saint-Pierre et Paul).
            </p>
          </div>
        </div>
      </section>

      {/* === Section 2 : Carte === */}
      <section
        ref={carteRef}
        className={`relative w-auto h-[80vh] container overflow-hidden transition-all duration-1000 ${
          carteVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      > 
        <BertouaMap
          cities={[
            { id: 'Doumé', name: 'Doumé', coordinates: [4.2328, 13.4637], url: '/zones-pastorales?zone=Doumé' },
            { id: 'Abong-Mbang', name: 'Abong-Mbang', coordinates: [3.9828, 13.1740], url: '/zones-pastorales?zone=Abong-Mbang' },
            { id: 'Messamena', name: 'Messamena', coordinates: [3.7369491, 12.8298452], url: '/zones-pastorales?zone=Messamena' },
            { id: 'Lomié', name: 'Lomié', coordinates: [3.155, 13.634], url: '/zones-pastorales?zone=Lomié' },
            { id: 'Nguélémendouka', name: 'Nguélémendouka', coordinates: [4.3849, 12.9227], url: '/zones-pastorales?zone=Nguélémendouka' },
            { id: 'Ngoyla', name: 'Ngoyla', coordinates: [2.6222, 14.0240], url: '/zones-pastorales?zone=Ngoyla' },
          ]}
        />

      </section>

      {/* === Section 3 : Annonces === */}
      <section
        ref={announcementRef}
        className={`${backgroundColor} container py-16 md:py-24 transition-all duration-1000 ${
          announcementVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
            <img
              src={news[current]?.images[0]}
              alt={`Annonce fond ${current}`}
              className="absolute inset-0 w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 mt-auto p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 px-4 py-2 rounded font-bold text-sm">
                ACTUALITE
              </div>
              </div>
              <p className="text-sm md:text-base leading-relaxed">
              {news[current]?.description}
              </p>
            </div>
            </div>

          <div>
            <h2 className={`text-3xl md:text-4xl font-bold ${foregroundColor} mb-6 leading-tight`}>
              {news[current]?.title}
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {news[current]?.images?.map((src: any, i: number) => (
                <div
                  key={i}
                  className="relative rounded-lg h-32 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={src}
                    alt={`${i + 1}`}
                    // fill
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className={`${accentColor} p-6 rounded-lg mb-6 shadow-md`}>
              <p className="text-sm md:text-base leading-relaxed font-semibold">
                {news[current]?.message}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[ 
                { text: 'Universelle', color: accentColor },
                { text: 'Nationale', color: 'bg-yellow-500 text-foreground hover:bg-yellow-600' },
                { text: 'Provenciale', color: 'bg-green-600 text-white hover:bg-green-700' },
                { text: 'Diocésaines', color: 'bg-primary text-primary-foreground hover:bg-primary/80' },
              ].map((btn, i) => (
                <button
                  key={i}
                  className={`${btn.color} px-3 py-2 md:px-4 md:py-3 rounded font-semibold text-xs md:text-sm transition-all duration-300 transform hover:scale-105 shadow-md`}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === Section 4 : Axes Pastoraux === */}
      <section
        ref={pastoralRef}
        className={`relative container bg-primary md:pb-4 overflow-hidden transition-all duration-1000 ${
          pastoralVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 relative z-11 flex-1 gap-12 items-center text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-bold mb-8 animate-fade-in">
            Axes pastoraux
          </h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-2 leading-relaxed animate-fade-in opacity-90">
            Un Diocèse vivant et rayonnant de la vie de foi des fidèles et de leurs pasteurs ; 
            un Diocèse disposant des ouvriers apostoliques et des laïcs engagés, ainsi que des 
            infrastructures opérationnelles en nombre suffisant ; un Diocèse en marche et bien organisé…
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
            Découvrir nos axes pastoraux
            <ArrowRightCircle size={50} />
          </button>
        </div>
        <div className="absolute -bottom-70 left-0 w-full h-80 bg-background transform -skew-y-12 origin-bottom-left"></div>
      </section>

      {/* === Section 5 : Sainte Croix (remplacée) === */}
      <section
        ref={crossRef}
        className={`relative container pb-20 bg-background transition-all duration-1000 ${
          crossVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="absolute -top-11 left-0 w-full z-10 h-34 bg-primary transform -skew-y-12 origin-top-left"></div>
        <div className="absolute top-23 left-0 w-full z-11 h-2 bg-background transform -skew-y-12 origin-top-left"></div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image de la croix */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/grande croix.png"
                  alt="La Sainte Croix"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Logo en bas */}
              <div className="mt-8 flex justify-center items-center space-x-8">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Image
                    src="/logo caritas.png"
                    alt="Logo Diocèse"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Image
                    src="/redemptoris.jpg"
                    alt="Logo Diocèse"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Image
                    src="/miva polska.jpg"
                    alt="Logo Diocèse"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Texte descriptif */}
            <div className="space-y-6 animate-slide-in-right">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                La Sainte Croix
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  La Sainte Croix est le signe de notre salut, car c'est sur elle que Jésus-Christ a donné 
                  sa vie pour l'humanité. Ce bois d'infamie est devenu le symbole de l'amour de Dieu, de la 
                  victoire sur le mal et de l'espérance qui ne déçoit pas.
                </p>
                <p>
                  Dans le diocèse de Doumé-Abong Mbang, ce mystère de la Croix est rendu visible à travers 
                  la Croix géante qui s'élève comme un signe fort au cœur de la région.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
