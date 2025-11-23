'use client';

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

interface City {
    id: string;
    name: string;
    coordinates: [number, number];
    url: string;
}

interface BertouaMarkersProps {
    cities: City[];
}

export default function BertouaMap({ cities }: BertouaMarkersProps) {
    const router = useRouter();

    // Empêche Leaflet d'être chargé avant que window existe
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const leaflet = await import("leaflet");

            // Fix des icônes Leaflet cassées en Next.js
            delete (leaflet.Icon.Default.prototype as any)._getIconUrl;

            leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: "/leaflet/marker-icon-2x.png",
                iconUrl: "/leaflet/marker-icon.png",
                shadowUrl: "/leaflet/marker-shadow.png",
            });

            setL(leaflet);
        })();
    }, []);

    // Tant que Leaflet n'est pas chargé → éviter crash
    if (!L) return <div className="w-full h-full">Chargement de la carte...</div>;

    const createIcon = (name: string) => {
        return L.divIcon({
            html: `
                <div class="text-primary text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="lucide lucide-map-pin">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <div class="text-xs font-semibold mt-1">${name}</div>
                </div>  
            `,
            className: "",
            iconSize: [28, 40],
            iconAnchor: [14, 40],
        });
    };

    return (
        <div className="w-full h-full shadow-lg">
            <MapContainer 
                center={[4.555, 13.700]} 
                zoom={10} 
                className="w-full h-full"
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {cities.map(city => (
                    <Marker
                        key={city.id}
                        position={city.coordinates}
                        icon={createIcon(city.name)}
                        eventHandlers={{
                            click: () => router.push(city.url),
                        }}
                    >
                        <Tooltip>{city.name}</Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
