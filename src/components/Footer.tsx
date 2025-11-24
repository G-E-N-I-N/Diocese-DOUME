'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <footer className="relative bg-footer text-footer-foreground py-1">
            <div
                className="absolute right-8 bottom-4 text-sm md:text-xl text-white/20 font-[Great_Vibes] select-none"
                style={{
                transform: 'rotate(-5deg)',
                whiteSpace: 'nowrap',
                }}
            >
                l0rd_9h057
            </div>
            {/* Découpe inclinée visible */}
            <div className="absolute top-0 left-0 w-full h-16 bg-footer transform skew-y-2 origin-top-right"></div>

            <div className="container mx-auto px-2 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo Section */}
                    <div className="text-center md:text-left min-h-25 w-auto mx-auto relative overflow-hidden flex items-center">
                        <Image 
                            src="/Logo Noir et Blanc.png"
                            alt="Logo du Diocèse de Doumé Abong Mbang"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <p className="text-sm text-muted-foreground z-10">DIOCÈSE DE DOUMÉ, Abong Mbang</p>
                    </div>

                    {/* Contact Section */}
                    <div className="text-center">
                        <Link
                            href='/contacts'
                            className={`
                                text-lg font-bold mb-4 rounded-lg transition-all duration-300 transform
                                'text-foreground hover:text-primary-foreground hover:underline hover:scale-105'}
                            `}
                        >
                            Contactez-nous   
                        </Link>
                    </div>

                    {/* Address Section */}
                    <div className="text-center md:text-right">
                        <h4 className="text-lg font-bold mb-4 text-primary-foreground">Adresse</h4>
                        <div className="flex items-start justify-center md:justify-end gap-2 text-sm">
                            <MapPin size={16} className="mt-1 shrink-0 text-primary-foreground" />
                            <span className="text-foreground">
                                BP DOUME 042
                                <br />
                                Doumé, Cameroun
                            </span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-foreground/20 my-4"></div>

                {/* Bottom Section */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 Diocèse de Doumé Abong Mbang. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}