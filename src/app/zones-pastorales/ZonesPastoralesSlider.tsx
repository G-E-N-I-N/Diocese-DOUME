"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { createClient } from "@/utils/supabase/client";

export default function SectionAZonesTestimonial() {
    const supabase = createClient();
    
    const primary = "var(--primary)";
    const cardBg = "var(--card)";
    const cardFg = "var(--card-foreground)";
    const background = "var(--background)";
    const foreground = "var(--foreground)";

    const [zones, setZones] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        async function getZones() {
            const { data: zonesData } = await supabase.from('zones').select();
            if (zonesData && zonesData.length > 0) {
                setZones(zonesData);
            }
        }
        getZones();
    }, []);

    useEffect(() => {
        if (zones.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev === zones.length - 1 ? 0 : prev + 1));
        }, 90000);

        return () => clearInterval(interval);
    }, [zones]);

    const prevCard = () => {
        if (zones.length === 0) return;
        setCurrent((prev) => (prev === 0 ? zones.length - 1 : prev - 1));
    };

    const nextCard = () => {
        if (zones.length === 0) return;
        setCurrent((prev) => (prev === zones.length - 1 ? 0 : prev + 1));
    };

    // Récupère la photo actuelle ou null si inexistante
    const currentPhoto = zones[current]?.photo || null;
    const currentZone = zones[current]?.zone || "";
    const currentDoyen = zones[current]?.doyen || "";

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
                <div
                    className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex items-center"
                    style={{ backgroundColor: cardBg, color: cardFg, height: "60vh" }}
                >
                    {currentPhoto ? (
                        // <Image
                        //     src={currentPhoto}
                        //     alt={currentDoyen}
                        //     fill
                        //     sizes="(max-width: 768px) 100vw, 50vw"
                        //     className="object-cover"
                        // />
                        <img 
                            src={currentPhoto}
                            alt={currentDoyen}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-center text-gray-400">
                            Image non disponible
                        </div>
                    )}

                    <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
                        <div className="backdrop-blur-xs bg-[rgba(0,0,0,0)] rounded-3xl p-6 w-2/3 flex flex-col items-center">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground text-center">
                                {currentZone}
                            </h3>
                            <p className="text-center text-primary-foreground/90 text-xl md:text-2xl">
                                Doyen: {currentDoyen}
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
