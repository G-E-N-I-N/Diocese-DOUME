'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const pathname = usePathname();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const navItems = [
        { label: 'ACCUEIL', href: '/' },
        { label: 'LE DIOCÈSE', href: '/diocese' },
        { label: 'ZONES PASTORALES', href: '/zones-pastorales' },
        { label: 'OUVRIERS APOSTOLIQUES', href: '/ouvriers-apostoliques' },
        { label: 'ACTIVITÉS PASTORALES', href: '/activites-pastorales' },
        { label: 'CONTACTS', href: '/contacts' },
    ];

    return (
        <>
        {/* Header fixe */}
            <header className="sticky top-0 left-0 w-full bg-background/70 backdrop-blur-md shadow-md z-9999">
                <div className="mx-auto px-4 py-4 gap-2 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="text-center">
                            <span className="text-xl md:text-xl font-oldEnglish text-footer transition-all duration-300">
                                Diocèse de Doumé Abong-Mbang
                            </span>
                        </div>
                    </Link>

                    {/* Navigation desktop */}
                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform
                                        ${isActive
                                        ? 'bg-footer text-primary-foreground shadow-lg scale-105'
                                        : 'text-foreground hover:text-primary-foreground hover:bg-footer/50 hover:scale-105'}
                                    `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions: thème + menu mobile */}
                    <div className="flex items-center gap-4">
                        {/* Toggle thème */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted transition-all duration-300 transform hover:scale-110"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {/* Hamburger mobile */}
                        <button
                            className="block md:hidden p-2 hover:bg-muted rounded-lg transition-all duration-300 transform hover:scale-110"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu mobile */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-9998 transform transition-transform duration-300 md:hidden
                ${isMenuOpen ? 'animate-slide-in-right' : 'translate-x-full'}
                `}
            >
                <nav className="flex flex-col gap-4 mt-24 px-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform
                                ${isActive
                                    ? 'bg-footer text-primary-foreground shadow-md scale-105 text-center'
                                    : 'text-foreground hover:text-primary-foreground hover:bg-footer/50 hover:scale-105 hover:text-center'}
                                `}
                            >
                        {item.label}
                    </Link>
                    );
                })}
            </nav>
        </div>

        {/* Overlay mobile */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black/50 bg-opacity-30 z-9997 md:hidden"
                onClick={() => setIsMenuOpen(false)}
            />
        )}
        </>
    );
}
