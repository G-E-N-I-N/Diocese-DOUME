'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-8xl font-extrabold text-destructive mb-6 animate-fade-in-up">
                404
            </h1>
        
            <h2 className="text-3xl font-bold mb-4 animate-slide-in-left">
                Oups ! Page introuvable
            </h2>
        
            <p className="text-lg text-muted-foreground mb-6 animate-slide-in-right">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
        
            <Link
                href="/"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-red transition-colors animate-scale-in"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
}
