"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
    React.useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-out-cubic",
            once: false,
        });
    }, []);

    const primary = "var(--primary)";
    const primaryFg = "var(--primary-foreground)";
    const cardBg = "var(--card)";
    const cardFg = "var(--card-foreground)";
    const background = "var(--background)";
    const foreground = "var(--foreground)";

    return (
        <main className="container min-h-screen py-12" style={{ backgroundColor: background, color: foreground }}>
        
            {/* Section 1 - Curie */}
            <section className="py-16 px-6 md:px-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: primary }}>
                    Curie
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[ 
                        { title: "Chancelier", mail: "chancelier@diocese-doume.cm", tel: "+237 6XX XX XX XX" },
                        { title: "Économe", mail: "econome@diocese-doume.cm", tel: "+237 6XX XX XX XX" },
                        { title: "Secrétaire", mail: "secretaire@diocese-doume.cm", tel: "+237 6XX XX XX XX" },
                    ].map((person, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-6 shadow-lg backdrop-blur-md border border-primary/50 transition hover:shadow-xl"
                            style={{ backgroundColor: cardBg, color: cardFg }}
                            data-aos="zoom-in"
                            data-aos-delay={i * 150}
                        >
                            {/* Titre centré */}
                            <h3 className="text-center text-xl font-semibold mb-6 text-primary/150">
                                {person.title}
                            </h3>

                            {/* Mail et téléphone sur une ligne chacun */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm text-foreground">
                                    <Mail size={20} className="text-primary" />
                                    <span className="truncate">{person.mail}</span>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-foreground">
                                    <Phone size={20} className="text-primary" />
                                    <span className="truncate">{person.tel}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Vicaires épiscopaux */}
                    <div
                        className="overflow-hidden rounded-2xl p-6 shadow-lg backdrop-blur-md border border-primary/50 md:col-span-2 lg:col-span-3 transition hover:shadow-xl"
                        style={{ backgroundColor: cardBg, color: cardFg }}
                        data-aos="fade-right"
                        data-aos-delay={400}
                    >
                        <h3 className="text-center text-xl font-semibold mb-4 text-primary">
                            Vicaires Épiscopaux
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-primary" />
                                <span>De la pastorale — pastorale@diocese-doume.cm</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-primary" />
                                <span>Des catéchistes — catechistes@diocese-doume.cm</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 2 - Structures diocésaines */}
            <section className="py-20 px-6 md:px-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: primary }}>
                    Structures Diocésaines
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[ 
                        { name: "SEDUC", desc: "Service diocésain de l’éducation catholique", mail: "seduc@diocese-doume.cm" },
                        { name: "Coordination de Santé", desc: "Réseau des structures sanitaires diocésaines", mail: "sante@diocese-doume.cm" },
                        { name: "CARITAS", desc: "Œuvre caritative du diocèse", mail: "caritas@diocese-doume.cm" },
                    ].map((structure, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-6 shadow-lg backdrop-blur-md border border-primary/50 transition hover:shadow-xl"
                            style={{ backgroundColor: cardBg, color: cardFg }}
                            data-aos="flip-up"
                            data-aos-delay={i * 150}
                        >
                            <h3 className="text-xl font-semibold mb-3 text-primary">{structure.name}</h3>
                            <p className="mb-2 text-foreground/90">{structure.desc}</p>
                            <div className="flex items-center gap-3 text-sm text-foreground">
                                <Mail size={20} className="text-primary" />
                                <span>{structure.mail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
