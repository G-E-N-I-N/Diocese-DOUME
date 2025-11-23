'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ParoisseDialogProps {
    open: boolean;
    zone: string;
    onClose: () => void;
}

const paroisses = [
    { zone: "DOUME", name: "Sacré-Cœur", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa maxime, itaque ratione porro deleniti officiis expedita, incidunt suscipit eligendi, exercitationem dolorem quis repellat reiciendis nisi quia explicabo delectus ullam? Eaque, dolorem assumenda.", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "DOUME", name: "Centre St Jean Paul II", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "1-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Abong-Mbang", name: "Sacré-Cœur", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "2-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Abong-Mbang", name: "Centre St Jean Paul II", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "3-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Messamena", name: "Sacré-Cœur", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "4-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Messamena", name: "Centre St Jean Paul II", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "5-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Lomié", name: "Sacré-Cœur", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "6-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Lomié", name: "Centre St Jean Paul II", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "7-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Nguélémendouka", name: "Sacré-Cœur", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "8-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Nguélémendouka", name: "Centre St Jean Paul II", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "9-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Ngoyla", name: "Sacré-Cœur", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "10-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
    { zone: "Ngoyla", name: "Centre St Jean Paul II", photo: ["/cathedrale Doume.png", "/cath St Paul et Pierre Abng Mbang.png"], historique: "11-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
];

const ParoisseDialog: React.FC<ParoisseDialogProps> = ({ open, zone, onClose }) => {
    const [currentZone, setCurrentZone] = useState<string>(zone || 'DOUME');
    const [currentParoisse, setCurrentParoisse] = useState(paroisses[0]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [open]);

    useEffect(() => {
        if(zone) setCurrentZone(zone);
        setCurrentParoisse(paroisses[0]);
    }, [zone])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === currentParoisse.photo.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [currentParoisse.photo.length]);

    return(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed top-20 inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-sm px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="relative rounded-2xl shadow-xl border border-primary/50 p-4 md:p-6 w-full max-w-6xl h-[85vh] max-h-[90vh] bg-card text-card-foreground flex flex-col md:flex-row gap-4 overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {/* Liste des paroisses */}
                        <div className="md:w-1/3 w-full border-b md:border-b-0 md:border-r border-footer/30 pr-0 md:pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                            {paroisses.map((p, i) => (
                                <div
                                    key={i}
                                    onClick={() => { setCurrentParoisse(p); setCurrent(0); }}
                                    className={`p-3 mb-2 rounded-lg cursor-pointer text-center md:text-left transition ${
                                        p.name === currentParoisse.name
                                            ? 'bg-footer text-primary-foreground font-semibold'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                    {p.name}
                                </div>
                            ))}
                        </div>

                        {/* Détails de la paroisse */}
                        <div className="flex-1 items-start px-2 md:px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                            <h2 className="text-xl max-w-1/2 md:text-2xl font-bold mb-4 text-center text-primary-foreground py-2 rounded-lg bg-footer">
                                {currentParoisse.name}
                            </h2>

                            {/* Image */}
                            <div className="w-full h-48 md:h-64 max-w-7/8 relative rounded-lg overflow-hidden shadow-md">
                                <Image src={currentParoisse.photo[current]} alt={currentParoisse.name} fill className="object-cover" />
                            </div>

                            {/* Indicateurs */}
                            <div className="flex gap-2 mt-4 w-full justify-center mb-2">
                                {currentParoisse.photo.map((_, i) => (
                                    <span
                                        key={i}
                                        className={
                                            `w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all
                                            ${ i === current ? "bg-primary" : "bg-primary/30"}`
                                        }
                                    />
                                ))}
                            </div>
                            
                            {/* Historique */}
                            <div className="mt-4 px-4 py-3 border border-primary/60 rounded-xl shadow-md backdrop-blur-[1px]">
                                <p className="mb-2 text-primary font-bold text-lg">Historique</p>
                                <p className="text-sm md:text-base">{currentParoisse.historique}</p>
                            </div>
                            
                            {/* Conseils */}
                            <div className="mt-4 px-4 py-3 border border-primary/60 rounded-xl shadow-md backdrop-blur-[1px]">
                                <p className="mb-2 text-primary font-bold text-lg">Conseils</p>
                                <ul className="list-none list-inside text-sm md:text-base"> 
                                    {currentParoisse.conseils.map((c, i) => (
                                        <li
                                            key={i}
                                            className="before:content-['•'] before:mr-2"
                                        >{c}</li>
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// const ParoisseDialog: React.FC<ParoisseDialogProps> = ({ open, zone, onClose }) => {
//     const [currentZone, setCurrentZone] = useState<string>(zone || 'DOUME');
//     const [currentParoisse, setCurrentParoisse] = useState<string>('');
//     const [current, setCurrent] = useState(0);

//     const paroissesZone = paroisses.filter(p => p.zone === currentZone);
//     useEffect(() => {
//         if (zone) setCurrentZone(zone);
//     console.log({ name: paroissesZone[0]?.name });
//         setCurrentParoisse(paroissesZone[0]?.name || '');
//     }, [zone]);

//     useEffect(() => {
//         if (open) document.body.style.overflow = 'hidden';
//         else document.body.style.overflow = 'auto';
//         return () => { document.body.style.overflow = 'auto'; };
//     }, [open]);
//     // console.log({ currentZone, currentParoisse });

//     const selectedParoisse = paroisses.find(p => p.zone === currentZone && p.name === currentParoisse)!;
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrent(prev => (prev === selectedParoisse.photo.length - 1 ? 0 : prev + 1));
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [selectedParoisse.photo.length]);

//     return (
//         <AnimatePresence>
//             {open && (
//                 <motion.div
//                     className="fixed top-20 inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-sm px-2"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className="relative rounded-2xl shadow-xl border border-primary/50 p-4 md:p-6 w-full max-w-6xl h-[85vh] max-h-[90vh] bg-card text-card-foreground flex flex-col md:flex-row gap-4 overflow-hidden"
//                         initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                         animate={{ scale: 1, opacity: 1, y: 0 }}
//                         exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                         transition={{ duration: 0.4, ease: "easeOut" }}
//                     >
//                         {/* Liste des paroisses */}
//                         <div className="md:w-1/3 w-full border-b md:border-b-0 md:border-r border-footer/30 pr-0 md:pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
//                             {paroissesZone.map((p, i) => (
//                                 <div
//                                     key={i}
//                                     onClick={() => { setCurrentParoisse(p.name); setCurrent(0); }}
//                                     className={`p-3 mb-2 rounded-lg cursor-pointer text-center md:text-left transition ${
//                                         p.name === currentParoisse
//                                             ? 'bg-footer text-primary-foreground font-semibold'
//                                             : 'hover:bg-accent hover:text-accent-foreground'
//                                     }`}
//                                 >
//                                     {p.name}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Détails de la paroisse */}
//                         <div className="flex-1 items-start px-2 md:px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
//                             <h2 className="text-xl max-w-1/2 md:text-2xl font-bold mb-4 text-center text-primary-foreground py-2 rounded-lg bg-footer">
//                                 {selectedParoisse.name}
//                             </h2>

//                             {/* Image */}
//                             <div className="w-full h-48 md:h-64 max-w-7/8 relative rounded-lg overflow-hidden shadow-md">
//                                 <Image
//                                     src={selectedParoisse.photo[current]}
//                                     alt={selectedParoisse.name}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>

//                             {/* Indicateurs */}
//                             <div className="flex gap-2 mt-4 w-full justify-center mb-2">
//                                 {selectedParoisse.photo.map((_, i) => (
//                                     <span
//                                         key={i}
//                                         className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
//                                             i === current ? "bg-primary" : "bg-primary/30"
//                                         }`}
//                                     />
//                                 ))}
//                             </div>

//                             {/* Historique */}
//                             <div className="mt-4 px-4 py-3 border border-primary/60 rounded-xl shadow-md backdrop-blur-[1px]">
//                                 <p className="mb-2 text-primary font-bold text-lg">Historique</p>
//                                 <p className="text-sm md:text-base">{selectedParoisse.historique}</p>
//                             </div>

//                             {/* Conseils */}
//                             <div className="mt-4 px-4 py-3 border border-primary/60 rounded-xl shadow-md backdrop-blur-[1px]">
//                                 <p className="mb-2 text-primary font-bold text-lg">Conseils</p>
//                                 <ul className="list-none list-inside text-sm md:text-base">
//                                     {selectedParoisse.conseils.map((c, i) => (
//                                         <li key={i} className="before:content-['•'] before:mr-2">{c}</li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div className="flex items-start mt-6">
//                                 <button
//                                     onClick={onClose}
//                                     className="px-6 py-2 rounded-lg bg-footer text-primary-foreground hover:opacity-90 transition w-full md:w-auto"
//                                 >
//                                     Fermer
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

export default ParoisseDialog;
