'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

interface HeroProps {
    image: string;
    history: string;
}

const images = ["/Eveque 01.png", "/Eveque 02.png"];

export default function Hero({ image, history }: HeroProps) {
    const [currentIndex, setcurrenIndex] = useState(0);
    
    useEffect(() => {
        AOS.init({
          duration: 1200,
            easing: "ease-out-cubic",
        once: false,
        });
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1200 });
        const interval = setInterval(() => {
            setcurrenIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="relative w-full overflow-hidden min-h-115 md:h-100 flex items-center justify-center shadow-lg z-5" data-aos="fade-down">
                <Image
                    src={image}
                    alt="Cathédrale"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="z-10 absolute top-40 md:top-80 items-start mt-3 text-xs md:text-sm text-justify w-full md:w-4/5 px-4 md:px-0" data-aos="fade-right">
                <h3 className="z-10 relative mx-0 md:mx-7 text-lg md:text-2xl font-oldEnglish w-full md:w-1/4 font-bold mb-4 text-start text-primary-foreground py-2 px-5 bg-footer rounded">
                    Histoire
                </h3>

                <p className="z-5 absolute top-16 md:top-9 rounded-2xl p-4 md:p-7 bg-primary-foreground text-xs md:text-sm">{history}{history}{history}{history}</p>
            </div>

            <div className="z-10 relative -bottom-17 flex flex-col items-center text-xs md:text-sm text-justify w-full" data-aos="fade-up">
                <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg" className="z-10 absolute -top-13 w-3/4 md:w-auto">
                    <polygon points="50,50 350,50 300,100 100,100" fill="currentColor" className="text-footer"/>
                    
                    <text x="200" y="80" fontSize="24" fontWeight="bold" fill="currentColor" textAnchor="middle" dominantBaseline="middle" className="text-primary-foreground font-oldEnglish">
                        Evêque
                    </text>
                </svg>

                <div className="z-9 relative w-full mt-9 rounded-4xl p-4 md:p-6 text-white shadow-lg flex flex-col md:flex-row gap-4 md:gap-0">
                    <div className="md:w-2/3 z-10 rounded-2xl md:rounded-none">
                        <h1 className="text-4xl md:text-8xl font-ornate mb-4 md:mb-8 p-2">Mgr. <br /> Jan Józef OZGA</h1>
                        <p className="text-xs md:text-sm opacity-90 mb-4">
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                            Né au Congo en ... (texte biographique de l'evêque). Extraits et détails.
                        </p>
                    </div>
                    <div className="md:w-1/3 flex items-center bg-footer rounded-4xl w-full justify-center mt-4 md:mt-0 h-48 md:h-auto">
                        <div className="w-full h-full rounded-4xl overflow-hidden flex items-center justify-center">
                            <Image
                                src={images[currentIndex]}
                                alt="Cathédrale"
                                fill
                                className="object-cover rounded-4xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}