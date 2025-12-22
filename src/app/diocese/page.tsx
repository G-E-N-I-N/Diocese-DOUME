'use client';

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Hero from "./Hero";
import StaffCard from "./StaffCard";
import Image from "next/image";

export default function Home() {
  const historyText = `
                        L’actuel diocèse de Doumé Abong-Mbang faisait d’abord partie de la Préfecture Apostolique du Cameroun qui fut détachée du Vicariat Apostolique du Gabon, le 18 Mars 1890.
                        Issu de la division du Vicariat apostolique de Yaoundé, Doumé devient Vicariat Apostolique le 3 Mars 1949.
                        Il deviendra diocèse le 14 septembre 1955, et sera divisé le 23 Mars 1983, où il prendra le nom de Doumé Abong-Mbang.
                        Sa superficie est de 36 375 km2, soit la superficie du département du Haut-Nyong.
                        Le diocèse de Doumé Abong-Mbang fait ainsi partie depuis le 11 novembre 1994 de la Province Ecclésiastique de Bertoua qui comprend les diocèses de Bertoua, Batouri, Doumé Abong-Mbang et Yokadouma.
                        Le diocèse compte en son sein 29 paroisses, et a une population estimée à 206.000 d’habitants.
                      `;
  
  React.useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: false,
    });
  }, []);

  const { ref: presentationRef, isVisible: presentationVisible } = useScrollAnimation();
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === 3 ? 0 : prev + 1));
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container min-h-screen relative bg-background">
        {/* === Section 1 : Presentation === */}
        <section
          ref={presentationRef}
          className={`relative min-h-screen bg-footer/10 container py-2 md:py-2 transition-all duration-1000 rounded-br-4xl mb-25 ${
            presentationVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          // data-aos="fade-up"
        >
          <header className="text-center mb-6" data-aos="fade-down" data-aos-delay="100">
            <h1 className="text-2xl md:text-4xl font-oldEnglish text-footer/90 font-bold w-full text-center mb-6">Diocèse</h1>
          </header>

          <Hero
            image={`/diocese 0${current + 1}.png`}
            history={historyText}
          />
        </section>

        {/* Curie Diocésaine */}
        <section className="mt-5 mx-auto px-4 md:px-0" data-aos="fade-up" data-aos-delay="200">
          <span className="text-2xl md:text-4xl font-oldEnglish text-footer/90 font-bold w-full text-center mb-6" data-aos="slide-down" data-aos-delay="250">Curie Diocésaine</span>

          <div className="bg-primary w-full space-y-3 px-4 md:px-30 py-4 rounded-lg" data-aos="fade-up" data-aos-delay="300">
            <StaffCard
              role="Chancelier"
              name="P. Josue SANKOUONDJOU"
              subtitle="Ordonné Prêtre le : 17 Mars 2018"
              email="sandjo50@yahoo.fr"
              img="/chancelier.jpg"
            />
            <StaffCard
              role="Econome"
              name="P. Christel Mvogo Nomo"
              subtitle="Ordonné Prêtre le : 05 Décembre 2020"
              phone="+237 698 12 52 58"
              img="/econome.jpg"
            />
            <StaffCard
              role="Secrétaire"
              name="S. Fabiana LEITGEBER"
              subtitle="Consacrée le : 28 Juin 1981"
              email="Fabianadoume@gmail.com"
              img="/secretaire1.jpg"
            />
            <StaffCard
              role="Secrétaire"
              name="Diacre Loïc"
              subtitle="Ordonné le : 16 Mai 2025"
              img="/secretaire2.jpg"
            />
          </div>
        </section>

        {/* Commission & Conseil */}
        <section className="mt-5 max-w-3xl mx-auto px-4 md:px-0" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-2xl md:text-4xl font-oldEnglish text-footer/90 font-bold w-full text-center mb-6" data-aos="slide-down" data-aos-delay="450">Commission et Conseil</h3>
          <div className="h-36 bg-primary border rounded shadow-sm" data-aos="zoom-in" data-aos-delay="500"></div>
        </section>

        {/* Structures Diocésaines */}
        <section className="mt-5 mx-auto overflow-hidden px-4 md:px-0" data-aos="fade-up" data-aos-delay="550">
          <span className="text-2xl md:text-4xl font-oldEnglish text-footer/90 font-bold w-full text-center mb-6" data-aos="slide-down" data-aos-delay="600">Structures Diocésaines</span>

          <div className="space-y-4 container px-0" data-aos="fade-up" data-aos-delay="650">
            <div className="bg-destructive/80 text-primary-foreground p-2 rounded-md flex flex-col md:flex-row items-center justify-between gap-4" data-aos="slide-right" data-aos-delay="700">
              <div className="text-4xl md:text-6xl text-center w-full md:w-1/4 font-bold">SEDUC</div>

              <div className="flex flex-col md:flex-row items-center rounded-md md:pl-8 h-auto md:h-32 bg-primary-foreground w-full md:w-3/4 gap-3">
                <div className="text-sm w-full md:w-3/4 text-muted-foreground text-center md:text-left">Soeur Alice <br /> CONGREGATION</div>
                <img src="/soeur Alice.jpg" alt="SEDUC" className="object-cover w-24 md:w-32 h-24 md:h-32 rounded-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-between w-full">
              <button disabled className="px-6 md:px-10 py-2 bg-destructive text-primary-foreground rounded text-sm md:text-base">Écoles maternelles</button>
              <button disabled className="px-6 md:px-10 py-2 bg-primary text-primary-foreground rounded text-sm md:text-base">Écoles primaires</button>
              <button disabled className="px-6 md:px-10 py-2 bg-secondary text-primary-foreground rounded text-sm md:text-base">Collèges</button>
            </div>

            <div className="bg-destructive/80 text-primary-foreground p-2 rounded-md flex flex-col md:flex-row items-center justify-between gap-4" data-aos="slide-left" data-aos-delay="750">
              <div className="text-2xl md:text-4xl text-center w-full md:w-1/4 font-bold">Coordination de la santé</div>

              <div className="flex flex-col md:flex-row items-center rounded-md md:pl-8 h-auto md:h-32 bg-primary-foreground w-full md:w-3/4 gap-3">
                <div className="w-full md:w-3/4 text-muted-foreground text-center md:text-left">
                  <div className="text-sm text-muted-foreground">Soeur Anuncjata WASZEWSKA <br /> Divine Providence d'essiengbot</div>
                  <div className="text-end text-primary/80 text-xs md:text-sm">Anuncjata@gmail.com</div>
                </div>
                <img src="/soeur Anuncjata.jpg" alt="coordination de la sante" className="object-cover w-24 md:w-32 h-24 md:h-32 rounded-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-between w-full">
              <button disabled className="px-6 md:px-10 py-2 bg-destructive text-primary-foreground rounded text-sm md:text-base">CENTRE DE SANTE</button>
              <button disabled className="px-6 md:px-10 py-2 bg-primary text-primary-foreground rounded text-sm md:text-base">BUREAU</button>
              <button disabled className="px-6 md:px-10 py-2"></button>
            </div>

            <div className="bg-destructive/80 text-primary-foreground p-2 rounded-md flex flex-col md:flex-row items-center justify-between gap-4" data-aos="slide-left" data-aos-delay="750">
              <div className="text-2xl md:text-4xl text-center w-full md:w-1/4 font-bold">CARITAS</div>

              <div className="flex flex-col md:flex-row items-center rounded-md md:pl-8 h-auto md:h-32 bg-primary-foreground w-full md:w-3/4 gap-3">
                <div className="w-full md:w-3/4 text-muted-foreground text-center md:text-left">
                  <div className="text-sm text-muted-foreground">Soeur Fabiana LEITGEBER <br /> </div>
                  <div className="text-end text-primary/80 text-xs md:text-sm">Fabianadoume@gmail.com</div>
                </div>
                <img src="/secretaire1.jpg" alt="coordination de la sante" className="object-cover w-24 md:w-32 h-24 md:h-32 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Caritas */}
        <section className="mt-5 mb-30 max-w-3xl mx-auto text-xs md:text-sm text-gray-700 px-4 md:px-0" data-aos="fade-up" data-aos-delay="800">
          <div className="flex flex-col md:flex-row w-full items-center bg-primary-foreground overflow-hidden rounded-md shadow-sm p-4 border gap-4" data-aos="fade-left" data-aos-delay="900">
            <div className="p-2 w-full md:w-auto flex justify-center">
              <Image
                src="/logo caritas.png"
                alt="Logo Caritas"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="w-full md:w-3/4 rounded text-justify text-xs md:text-sm">
              La Caritas du Diocèse... (texte explicatif). Cette zone contient l'information institutionnelle et de contact.
              La Caritas du Diocèse... (texte explicatif). Cette zone contient l'information institutionnelle et de contact.
              La Caritas du Diocèse... (texte explicatif). Cette zone contient l'information institutionnelle et de contact.
              La Caritas du Diocèse... (texte explicatif). Cette zone contient l'information institutionnelle et de contact.
              La Caritas du Diocèse... (texte explicatif). Cette zone contient l'information institutionnelle et de contact.
              La Caritas du Diocèse... (texte explicatif). Cette zone contient l'information institutionnelle et de contact.
            </p>
          </div>
        </section>
    </main>
  )
}