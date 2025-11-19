'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface StaffCardProps {
    role: string;
    name: string;
    email?: string;
    phone?: string;
    subtitle?: string;
    img?: string;
};


export default function StaffCard({ role, name, subtitle, email, phone, img }: StaffCardProps) {
    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out' });
    }, []);

    return (
        <div className="flex flex-col overflow-hidden md:flex-row w-full items-center bg-primary-foreground rounded-md shadow-sm p-2 md:p-4 border gap-4 md:gap-0" data-aos="fade-up">
            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0" data-aos="zoom-in" data-aos-delay="100">
                <img src={img? img : "/unknown.png"} alt={name} className="w-full h-full object-cover" />
            </div>

            <div className="p-2 md:p-4 flex flex-col flex-1 space-y-2 w-full" data-aos="fade-left" data-aos-delay="200">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <div className="w-full md:w-1/4 text-center text-sm md:text-lg px-3 md:px-5 py-2 font-semibold bg-footer text-primary-foreground rounded" data-aos="slide-left" data-aos-delay="300">
                        {role}
                    </div>
                    <div className="text-2xl md:text-4xl font-semibold text-primary text-center md:text-left w-full md:w-auto" data-aos="slide-left" data-aos-delay="350">{name}</div>
                </div>
                
                {subtitle && <div className="text-sm md:text-lg text-gray-900 text-center md:text-left">{subtitle}</div>}
                <div className="text-center md:text-right">
                    {email && <div className="text-xs md:text-sm text-primary/50">{email}</div>}
                    {phone && <div className="text-xs md:text-sm text-primary/50">{phone}</div>}
                </div>
            </div>
        </div>
    )
}