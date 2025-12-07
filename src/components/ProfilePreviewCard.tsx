'use client';

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProfilePreviewCardProps {
    person: {
        name: string;
        imageSrc: string;
    };
    onClick: () => void;
}

export function ProfilePreviewCard({ person, onClick }: ProfilePreviewCardProps) {
    const { ref: profilrRef, isVisible: profilVisible } = useScrollAnimation();

    useEffect(() => {
        AOS.init({ duration: 600, once: false });
    }, []);

    return (
        <div
            className="cursor-pointer group flex flex-col items-center bg-card text-card-foreground rounded-xl p-4 shadow hover:shadow-lg transition"
            onClick={onClick}
            ref={profilrRef}
            data-aos="fade-up"
        >
            <div className="w-32 h-32 rounded-lg overflow-hidden mb-3">
                <Image
                    src={person.imageSrc || "/unknown.png"}
                    alt={person.name}
                    width={128}
                    height={128}
                    className="object-cover"
                />
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition">
                {person.name}
            </h3>
        </div>
    );
}
