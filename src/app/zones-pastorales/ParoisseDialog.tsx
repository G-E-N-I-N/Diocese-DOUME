
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { list } from 'postcss';

interface ParoisseDialogProps {
  open: boolean;
  zone: string;
  paroisse: string;
  onClose: () => void;
}

// Paroisses par zone
const paroisses = [
  { zone: "DOUME", name: "Sacré-Cœur", photo: "/cathedrale Doume.png", historique: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa maxime, itaque ratione porro deleniti officiis expedita, incidunt suscipit eligendi, exercitationem dolorem quis repellat reiciendis nisi quia explicabo delectus ullam? Eaque, dolorem assumenda.", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "DOUME", name: "Centre St Jean Paul II", photo: "/cathedrale Doume.png", historique: "1-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Abong-Mbang", name: "Sacré-Cœur", photo: "/cathedrale Doume.png", historique: "2-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Abong-Mbang", name: "Centre St Jean Paul II", photo: "/cathedrale Doume.png", historique: "3-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Messamena", name: "Sacré-Cœur", photo: "/cathedrale Doume.png", historique: "4-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Messamena", name: "Centre St Jean Paul II", photo: "/cathedrale Doume.png", historique: "5-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Lomié", name: "Sacré-Cœur", photo: "/cathedrale Doume.png", historique: "6-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Lomié", name: "Centre St Jean Paul II", photo: "/cathedrale Doume.png", historique: "7-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Nguélémendouka", name: "Sacré-Cœur", photo: "/cathedrale Doume.png", historique: "8-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Nguélémendouka", name: "Centre St Jean Paul II", photo: "/cathedrale Doume.png", historique: "9-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Ngoyla", name: "Sacré-Cœur", photo: "/cathedrale Doume.png", historique: "10-Historique Sacré-Cœur...", conseils: ["Conseil 1", "Conseil 2"] },
  { zone: "Ngoyla", name: "Centre St Jean Paul II", photo: "/cathedrale Doume.png", historique: "11-Historique St Jean Paul II...", conseils: ["Conseil 1", "Conseil 2"] },
];

const ParoisseDialog: React.FC<ParoisseDialogProps> = ({ open, zone, paroisse, onClose }) => {
  const [currentZone, setCurrentZone] = useState<string>(zone ? zone : 'DOUME');
  const [currentParoisse, setCurrentParoisse] = useState<string>(paroisse ? paroisse : 'Sacré-Cœur');

  useEffect(() => {
    if (zone) setCurrentZone(zone);
    if (paroisse) setCurrentParoisse(paroisse);
  }, [zone, paroisse]);

  const paroissesZone = paroisses.filter(p => p.zone === currentZone);
  const selectedParoisse = paroissesZone.find(p => p.name === currentParoisse) || paroissesZone[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-2xl shadow-xl border border-primary/50 p-6 max-w-5xl w-[90%] bg-card text-card-foreground flex gap-4"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Colonne gauche : liste des paroisses */}
            <div className="w-1/3 border-r border-footer/30 pr-4 overflow-y-auto max-h-[70vh]">
              {paroissesZone.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentParoisse(p.name)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition ${
                    p.name === currentParoisse
                      ? 'bg-footer text-primary-foreground font-semibold'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {p.name}
                </div>
              ))}
            </div>

            {/* Colonne droite : détails de la paroisse */}
            <div className="w-2/3 px-4 overflow-y-auto max-h-[70vh] flex flex-col items-start">
              <h2 className="text-2xl font-bold mb-4 text-center text-primary-foreground mt-6 px-8 py-2 rounded-lg bg-footer">
                {selectedParoisse.name}
              </h2>

              {/* Image de la paroisse */}
              <div className="w-full h-60 relative rounded-lg overflow-hidden shadow-md mb-4">
                <Image
                  src={selectedParoisse.photo || "/default-paroisse.jpg"}
                  alt={selectedParoisse.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Historique */}
              <div className="px-5 py-4 border-primary/80 mb-6 w-full rounded-2xl p-6 shadow-lg backdrop-blur-md border">
                <p className="mb-4 text-primary/80 w-full font-bold text-2xl">Historique</p>
                <p>{selectedParoisse.historique}</p>
              </div>

              {/* Conseils sous forme de liste */}
              <div className="w-full px-5 py-4 border-primary/80 mb-6 rounded-2xl p-6 shadow-lg backdrop-blur-md border">
                <p className="mb-4 text-primary/80 w-full font-bold text-2xl">Conseils</p>
                <ul className="list-none list-inside mt-2 text-foreground/80">
                  {selectedParoisse.conseils.map((c, i) => (
                    <li key={i} className="before:content-['*'] before:mr-2">{c}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onClose}
                className="mt-6 px-8 py-2 rounded-lg bg-footer text-primary-foreground hover:opacity-90 transition"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParoisseDialog;
