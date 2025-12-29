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
        const interval = setInterval(() => {
            setcurrenIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div 
                className="relative w-full overflow-hidden min-h-[55vh] md:h-100 flex items-center justify-center shadow-lg z-5"
                data-aos="fade-down"
            >
                <Image
                    src={image}
                    alt={image}
                    fill
                    className="object-cover"
                />
            </div>

            <div
                className="
                z-10 absolute 
                top-32 md:top-80 
                w-4/5 
                px-4 md:px-0
                flex flex-col 
                items-start 
                text-xs md:text-sm
                "
                data-aos="fade-right"
            >
                <h3 className="
                    z-10 relative 
                    mx-0 md:mx-7 
                    text-lg md:text-2xl 
                    font-oldEnglish font-bold 
                    mb-4 text-start 
                    text-primary-foreground 
                    py-2 px-5 
                    bg-footer 
                    rounded 
                    w-fit
                ">
                    Histoire
                </h3>

                <p className="
                    z-5
                    absolute 
                    left-0 right-0
                    top-20 md:top-9
                    mx-auto 
                    w-[92%] md:w-auto
                    rounded-2xl 
                    p-4 md:p-7 
                    bg-primary-foreground
                    text-gray-900
                    text-xs md:text-sm
                    text-justify
                ">
                    {history}
                </p>
            </div>

            <div 
                className="z-10 relative -bottom-10 flex flex-col items-center text-xs md:text-sm text-justify w-full"
                data-aos="fade-up"
            >
                <svg 
                    width="400" 
                    height="100" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="z-10 absolute -top-8 w-4/5 md:w-auto"
                >
                    <polygon points="50,50 350,50 300,100 100,100" fill="currentColor" className="text-footer"/>
                    <text 
                        x="200" 
                        y="80" 
                        fontSize="20" 
                        fontWeight="bold" 
                        fill="currentColor"
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        className="text-primary-foreground font-oldEnglish md:text-2xl"
                    >
                        Evêque
                    </text>
                </svg>

                <div className="
                    z-9 relative 
                    w-full md:w-[90%]
                    mt-14 
                    rounded-4xl 
                    p-4 md:p-6 
                    text-white 
                    shadow-lg 
                    flex flex-col md:flex-row 
                    gap-6
                ">
                    <div className="md:w-2/3 z-10 rounded-2xl md:rounded-none">
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-ornate mb-4 md:mb-8 p-2 leading-tight">
                            Mgr. <br /> Jan Józef OZGA
                        </h2>

                        <p className="text-xs md:text-sm opacity-90 mb-4 leading-relaxed">
                            Mgr Jan Ozga est né le 17 Avril 1956 à Wola Raniżowska, dans le diocèse de Przemyśl en Pologne.
                            Il a été ordonné prêtre le 7 Juin 1981.
                            Après avoir travaillé dans la pastorale dans son diocèse, il est venu comme missionnaire au Cameroun en 1988.
                            Il a travaillé comme vicaire et après comme curé de la paroisse de Nguélémendouka.
                            Il était Vicaire Général du diocèse de Doumé Abong-Mbang.
                            Le 24 janvier 1997 le pape Jean Paul II l’a nommé évêque de ce diocèse. 
                            Il a reçu le sacre le 20 Avril 1997 des Mains du Card. Christian Tumi, alors archevêque de Douala.
                            Le 29 juillet 2011 il est devenu Chevalier de l’Ordre de la Valeur du Cameroun. Sa devise épiscopale :
                                « UT UNUM SINT  (« Qu’ils soient un »)
                        </p>
                    </div>

                    {/* IMAGE */}
                    <div className="
                        md:w-1/3 
                        flex items-center 
                        bg-footer 
                        rounded-4xl 
                        w-full 
                        justify-center 
                        mt-4 md:mt-0 
                        h-56 md:h-auto
                    ">
                        <div className="w-full h-full rounded-4xl overflow-hidden flex items-center justify-center">
                            <Image
                                src={images[currentIndex]}
                                alt="Eveque"
                                fill
                                className="object-cover rounded-4xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
