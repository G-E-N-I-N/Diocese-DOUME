'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { createClient } from "@/utils/supabase/client";

interface ParoisseDialogProps {
    open: boolean;
    zone: string;
    onClose: () => void;
}

const ParoisseDialog: React.FC<ParoisseDialogProps> = ({ open, zone, onClose }) => {
    const supabase = createClient();
    
    const [paroisses, setParoisses] = useState<any[]>([]);
    const [currentParoisse, setCurrentParoisse] = useState<any>(null);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    // Charger les paroisses
    useEffect(() => {
        if (!zone) return;

        const fetchParoisses = async () => {
            setLoading(true);

            const { data, error } = await supabase
                                        .from("paroisses")
                                        .select("*, zones!inner(zone)")
                                        .eq("zones.zone", zone);

            if (error) {
                console.error(error);
            } else {
                setParoisses(data);
                setCurrentParoisse(data[0]);
            }

            setLoading(false);
        };

        fetchParoisses();
    }, [zone]);

    // Bloquer le scroll
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';

        return () => { document.body.style.overflow = 'auto'; };
    }, [open]);

    // Carousel photos
    useEffect(() => {
        if (!currentParoisse?.photo?.length) return;

        const interval = setInterval(() => {
            setCurrent(prev => (prev === currentParoisse.photo.length - 1 ? 0 : prev + 1));
        }, 30000);

        return () => clearInterval(interval);
    }, [currentParoisse?.photo]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed top-15 inset-0 z-50 text-justify flex items-center justify-center bg-background/20 backdrop-blur-sm px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative rounded-2xl shadow-xl border border-primary/50 p-4 md:p-6 w-full max-w-6xl h-[80vh] max-h-[90vh] bg-card text-card-foreground flex flex-col md:flex-row gap-4 overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {loading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                                <p className="mt-4 text-primary font-semibold">Chargement...</p>
                            </div>
                        ) : (
                            <>
                                <div className="md:w-1/3 w-full border-b md:border-b-0 md:border-r border-footer/30 pr-0 md:pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                                    {paroisses.map((p, i) => (
                                        <div
                                            key={i}
                                            onClick={() => { setCurrentParoisse(p); setCurrent(0); }}
                                            className={`p-3 mb-2 rounded-lg cursor-pointer text-center md:text-left transition ${
                                                p.name === currentParoisse?.name
                                                    ? 'bg-footer text-primary-foreground font-semibold'
                                                    : 'hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                        >
                                            {p.name}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex-1 items-start px-2 md:px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                                    <h2 className="text-xl p-2 max-w-5/6 md:text-2xl font-bold mb-4 text-center text-primary-foreground py-2 rounded-lg bg-footer">
                                        {currentParoisse?.name}
                                    </h2>

                                    {/* Image */}
                                    <div className="w-full h-48 md:h-64 max-w-7/8 relative rounded-lg overflow-hidden shadow-md">
                                        {currentParoisse?.photo?.[current] ? (
                                            <img
                                                src={currentParoisse.photo[current]}
                                                alt={currentParoisse.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-center text-gray-900">
                                                Image non disponible
                                            </div>
                                        )}
                                    </div>

                                    {/* Indicateurs */}
                                    <div className="flex gap-2 mt-4 w-full justify-center mb-2">
                                        {currentParoisse?.photo?.map((_: any, i: number) => (
                                            <span
                                                key={i}
                                                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all
                                                    ${i === current ? "bg-primary" : "bg-primary/30"}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Historique */}
                                    <div className="mt-4 px-4 py-3 border border-primary/60 rounded-xl shadow-md backdrop-blur-[1px]">
                                        <p className="mb-2 text-primary font-bold text-lg">Historique</p>
                                        <div className="text-sm md:text-base">{currentParoisse?.historique}</div>
                                    </div>

                                    {/* Conseils */}
                                    <div className="mt-4 px-4 py-3 border border-primary/60 rounded-xl shadow-md backdrop-blur-[1px]">
                                        <p className="mb-2 text-primary font-bold text-lg">Conseils</p>
                                        <ul className="list-none list-inside text-sm md:text-base">
                                            {currentParoisse?.conseils?.map((c: string, i: any) => (
                                                <li key={i} className="before:content-['•'] before:mr-2">
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-start mt-6">
                                        <button
                                            onClick={onClose}
                                            className="px-6 py-2 rounded-lg bg-footer text-primary-foreground hover:opacity-90 transition w-full md:w-auto"
                                        >
                                            Fermer
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ParoisseDialog;
