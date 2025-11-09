"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function SectionAZonesTestimonial() {
    const primary = "var(--primary)";
    const cardBg = "var(--card)";
    const cardFg = "var(--card-foreground)";
    const background = "var(--background)";
    const foreground = "var(--foreground)";

    const zones = [
        { zone: "DOUME", doyen: "P. Mirek", photo: "/cathedrale Doume.png" },
        { zone: "Abong-Mbang", doyen: "L’Abbé Laurent", photo: "/cath St Paul et Pierre Abng Mbang.png" },
        { zone: "Messamena", doyen: "P. Yves", photo: "/Messamena - Sanctuaire Misericorde Divine d'atok.png" },
        { zone: "Lomié", doyen: "Abbé Sylvain", photo: "/Lomie - Paroisse saint jean de mindourou.jpg" },
        { zone: "Nguélémendouka", doyen: "Abbé Jovanie", photo: "/Sanctuaire Notre Dame de l'assomption de Nguelemendouka.png" },
        { zone: "Ngoyla", doyen: "Abbé Olivier", phote: "/cathedrale Doume.png" },
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === zones.length - 1 ? 0 : prev + 1));
        }, 10000);

        return () => clearInterval(interval);
    }, [zones.length]);

    const prevCard = () => {
        setCurrent((prev) => (prev === 0 ? zones.length - 1 : prev - 1));
    };

    const nextCard = () => {
        setCurrent((prev) => (prev === zones.length - 1 ? 0 : prev + 1));
    };

    return (
        <section
            className="relative py-2 px-6 md:px-2 flex flex-col items-center"
            style={{ backgroundColor: background, color: foreground }}
        >
            <h2
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                style={{ color: primary }}
            >
                Zones Pastorales et Doyens
            </h2>

            <div className="relative w-full max-w-5xl">
                {/* Carte principale */}
                <div
                    className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex items-center"
                    style={{ backgroundColor: cardBg, color: cardFg, height: "60vh" }}
                >
                    <Image
                        src={zones[current].photo || "/cathedrale Doume.PNG"}
                        alt={zones[current].doyen}
                        fill
                        className="object-cover"
                    />

                    <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
                        <div className="backdrop-blur-xs bg-[rgba(0,0,0,0)] rounded-3xl p-6 w-2/3 flex flex-col items-center">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground text-center">
                                {zones[current].zone}
                            </h3>
                            <p className="text-center text-primary-foreground/90 text-xl md:text-2xl">
                                Doyen: {zones[current].doyen}
                            </p>
                        </div>
                    </div>
                </div>


                {/* Chevrons */}
                <button
                    onClick={prevCard}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-primary/20 rounded-full hover:bg-primary/40 transition z-30"
                >
                    <ChevronLeft size={28} className="text-primary-foreground" />
                </button>
                <button
                    onClick={nextCard}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-primary/20 rounded-full hover:bg-primary/40 transition z-30"
                >
                    <ChevronRight size={28} className="text-primary-foreground" />
                </button>
            </div>

            {/* Indicateurs */}
            <div className="flex gap-2 mt-6">
                {zones.map((_, i) => (
                    <span
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${
                            i === current ? "bg-primary" : "bg-primary/30"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
