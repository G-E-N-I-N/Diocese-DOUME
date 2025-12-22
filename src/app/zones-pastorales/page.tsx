"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ZonesPastoralesSlider from "./ZonesPastoralesSlider";
import ParoisseDialog from "./ParoisseDialog";
import { getZoneAndParoisse } from "@/hooks/zoneAndParoisseUrlHandler";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function ZonePastoralePage() {
    const supabase = createClient();
    
    React.useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-out-cubic",
            once: false,
        });
    }, []);

    const [isVisible, setIsVisible] = React.useState(false);
    const [zone, setZone] = React.useState("");
    const [zones, setZones] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchZoneAndParoisse = async () => {
            const result = await getZoneAndParoisse();
            if(result.success) {
                setZone(result.zone);
                setIsVisible(result.success);
            }
        };

        fetchZoneAndParoisse();
    }, []);


    const primary = "var(--primary)";
    const cardBg = "var(--card)";
    const cardFg = "var(--card-foreground)";
    const background = "var(--background)";
    const foreground = "var(--foreground)";

    // Zones pastorales
    React.useEffect(() => {
        async function getZones() {
            const { data: zonesData } = await supabase.from('zones').select();
            if (zonesData && zonesData.length > 0) {
                setZones(zonesData);
            }
        }
        getZones();
    }, []);

    // Programme pastoral
    const programme = [
        { title: "Visite pastorale" },
        { title: "Messe" },
        { title: "Autres activités" },
    ];

    return (
        <main
            className="container min-h-screen py-12 relative"
            style={{ backgroundColor: background, color: foreground }}
        >
            {/* Section A : Zones pastorales et Doyens */}
            <section data-aos="fade-up">
                <ZonesPastoralesSlider />
            </section>

            {/* Section B : Paroisses et détails */}
            <section className="py-16 px-6 md:px-16" data-aos="fade-up">
                <h1
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    style={{ color: primary }}
                >
                    Paroisses par Zone Pastorale
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {zones.map((z, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-6 text-center shadow-lg backdrop-blur-md border border-primary/50 transition hover:shadow-xl hover:shadow-primary cursor-pointer"
                            style={{ backgroundColor: cardBg, color: cardFg }}
                            data-aos="fade-right"
                            data-aos-delay={i * 100}
                            onClick={() => {
                                setZone(z.zone);
                                setIsVisible(true);
                            }}
                        >
                            <h3 className="text-lg font-semibold text-primary-foreground/150">
                                {z.zone}
                            </h3>
                            <p className="text-sm opacity-70">{z.doyen}</p>
                        </div>
                    ))}
                </div>
            </section>
            <ParoisseDialog
                open={isVisible}
                zone={zone}
                onClose={() => {
                    setIsVisible(false)
                    redirect('/zones-pastorales');
                }}
            />

            {/* Section C : Programme pastoral */}
            {/* <section className="py-16 px-6 md:px-16" data-aos="fade-up">
                <h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    style={{ color: primary }}
                >
                    Programme Pastoral
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programme.map((p, i) => (
                    <div
                    key={i}
                    className="rounded-2xl p-6 shadow-lg backdrop-blur-md border border-primary/50 transition hover:shadow-xl"
                    style={{ backgroundColor: cardBg, color: cardFg }}
                    data-aos="zoom-in"
                    data-aos-delay={i * 100}
                    >
                    <h3 className="text-lg font-semibold text-primary-foreground/105">
                        {p.title}
                    </h3>
                    <p className="text-foreground/80 mt-2">
                        Détails du programme {p.title.toLowerCase()}.
                    </p>
                    </div>
                ))}
                </div>
            </section> */}
        </main>
    );
}
