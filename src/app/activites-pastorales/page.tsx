"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ActivitesPastoralesPage() {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: false,
        });
    }, []);

    return (
        <div className="p-6 md:p-10 space-y-10 text-foreground min-h-screen container">

            {/* Header */}
            <div className="text-end space-y-3" data-aos="fade-left">
                <h1 className="text-3xl md:text-4xl font-bold font-oldEnglish text-footer">
                    Activités Pastorales
                </h1>
                <p className="text-foreground/70 max-w-2xl mx-auto">
                    Retrouvez ici les différents synodes, la pastorale post-synodale et 
                    l’organisation des mouvements et aumôneries du diocèse.
                </p>
            </div>

            {/* ---------------- SYNODES ---------------- */}
            <h2
                className="text-2xl font-semibold text-primary"
                data-aos="fade-right"
            >
                Synodes Diocésains
            </h2>

            <section className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    {
                        title: "1er Synode (2000–2005)",
                        theme: "Lorem ipsum dolor sit amet.",
                        resume:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim quam ac mi vulputate, vel aliquet turpis tempus. Suspendisse potenti.",
                        resolutions: [
                            "Lorem ipsum dolor sit amet.",
                            "Integer vitae lectus a est pulvinar scelerisque.",
                            "Mauris ac libero sit amet sapien feugiat.",
                            "Aenean fermentum velit at velit feugiat rhoncus."
                        ]
                    },
                    {
                        title: "2ème Synode (2013–2015)",
                        theme: "Lorem ipsum dolor sit amet.",
                        resume:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis elit ut odio condimentum rutrum. Nullam volutpat dictum dapibus.",
                        resolutions: [
                            "Integer pulvinar magna in libero consequat varius.",
                            "Suspendisse in mi eget mi sagittis ultricies.",
                            "Phasellus dapibus enim nec est elementum porta.",
                            "Pellentesque sit amet tortor sagittis."
                        ]
                    },
                    {
                        title: "3ème Synode (2022–2025)",
                        theme: "Lorem ipsum dolor sit amet.",
                        resume:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie magna a sem finibus hendrerit. Vivamus lobortis lorem sit amet sem malesuada.",
                        resolutions: [
                            "Sed laoreet velit et suscipit cursus.",
                            "Donec aliquam justo nec dui dignissim ultricies.",
                            "Suspendisse potenti.",
                            "Cras mollis ex vel sem congue."
                        ]
                    }
                ].map((synode, i) => (
                    <div
                        key={i}
                        data-aos="fade-up"
                        className="border border-ring rounded-xl p-6 shadow-md bg-background"
                    >
                        <h3 className="text-xl font-bold text-primary">{synode.title}</h3>

                        <p className="mt-3">
                            <span className="font-semibold text-foreground">Thème : </span>
                            {synode.theme}
                        </p>

                        <p className="mt-3 text-foreground/80 leading-relaxed">
                            {synode.resume}
                        </p>

                        <div className="mt-4">
                            <h4 className="font-semibold text-foreground">Résolutions :</h4>
                            <ul className="list-disc ml-6 mt-2 space-y-1 text-foreground/80">
                                {synode.resolutions.map((r, idx) => (
                                    <li key={idx}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>

            {/* ---------------- PASTORALE POST SYNODALE ---------------- */}
            <section className="space-y-4">
                <h2
                    className="text-2xl font-semibold text-primary"
                    data-aos="fade-right"
                >
                    Pastorale Post-Synodale (2015–2023)
                </h2>

                <div
                    data-aos="zoom-in"
                    className="border border-ring rounded-xl p-6 bg-background shadow-md"
                >
                    <p className="text-foreground/80 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac facilisis odio.
                        Vivamus ultricies eros id est ultricies, ac sodales dui pulvinar. Maecenas interdum, 
                        eros at auctor malesuada, orci lorem luctus purus, eget malesuada nibh sem sit amet orci.
                    </p>
                </div>
            </section>

            {/* ---------------- MACs ET AUMÔNERIES ---------------- */}
            <h2
                className="text-2xl font-semibold text-primary"
                data-aos="fade-right"
            >
                MAC’s et Aumôneries
            </h2>

            <section className="space-y-8 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                {[
                    {
                        mouvement: "Mouvement 1",
                        responsable: "Lorem Ipsum",
                        point: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        repartition: [
                            { paroisse: "Paroisse 1", nombre: 45 },
                            { paroisse: "Paroisse 2", nombre: 32 },
                            { paroisse: "Paroisse 3", nombre: 18 }
                        ]
                    },
                    {
                        mouvement: "Mouvement 2",
                        responsable: "Lorem Ipsum",
                        point: "Suspendisse feugiat turpis vitae justo blandit.",
                        repartition: [
                            { paroisse: "Paroisse 1", nombre: 22 },
                            { paroisse: "Paroisse 4", nombre: 16 },
                            { paroisse: "Paroisse 5", nombre: 33 }
                        ]
                    }
                ].map((m, i) => (
                    <div
                        key={i}
                        data-aos="fade-up"
                        className="border border-ring rounded-xl p-6 bg-background shadow-md space-y-3"
                    >
                        <h3 className="text-xl font-bold text-primary">{m.mouvement}</h3>

                        <p>
                            <span className="font-semibold">Responsable : </span>
                            {m.responsable}
                        </p>

                        <p className="text-foreground/80">{m.point}</p>

                        <div className="mt-3">
                            <h4 className="font-semibold">Présence dans les paroisses :</h4>
                            <ul className="list-disc ml-6 mt-2 text-foreground/80 space-y-1">
                                {m.repartition.map((p, idx) => (
                                    <li key={idx}>{p.paroisse} : {p.nombre} membres</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                <div
                    data-aos="fade-left"
                    className="border border-ring rounded-xl p-6 bg-background shadow-md"
                >
                    <h3 className="text-xl font-bold text-primary mb-2">
                        Chorales Diocésaines
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas aliquet diam, 
                        sed faucibus mauris tristique eget. Aenean non euismod lorem, et pellentesque massa.
                    </p>
                </div>
            </section>

        </div>
    );
}
