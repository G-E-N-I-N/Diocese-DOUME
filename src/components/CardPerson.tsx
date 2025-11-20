"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface CardPersonProps {
  person: {
    name: string;
    ordained: string;
    role: string;
    email: string;
    imageSrc: string;
  } | null;
  onClose: () => void;
}

export function CardPerson({ person, onClose }: CardPersonProps) {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  if (!person) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      data-aos="fade-up"
    >
      <div
        className="relative w-3xl bg-card text-card-foreground rounded-2xl p-6 shadow-xl"
        style={{
          boxShadow:
            "inset 0 0 0 4px rgba(255,255,255,0.25), 0 8px 18px rgba(0,0,0,0.35)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl font-bold text-destructive/50 hover:text-destructive transition"
        >
          &times;
        </button>

        <div className="flex items-start gap-5">
          <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0">
            <Image
              src={person.imageSrc}
              alt={person.name}
              width={112}
              height={112}
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-serif text-footer mb-2">
              {person.name}
            </h2>

            <p className="text-foreground/80 mb-1">{person.ordained}</p>
            <p className="text-foreground/80 mb-4">{person.role}</p>

            <div className="text-right">
              <a
                href={`mailto:${person.email}`}
                className="text-primary/50 underline hover:text-primary transition"
              >
                {person.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
