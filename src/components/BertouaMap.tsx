'use client';

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';

interface City {
    id: string;
    name: string;
    coordinates: [number, number];
    url: string;
}

interface BertouaMarkersProps {
    cities: City[];
}

export function BertouaMap({ cities }: BertouaMarkersProps) {
    const router = useRouter();
    const defaultCenter: [number, number] = [4.555, 13.700]; // Centre de Bertoua
    const defaultZoom = 10;

    const createIcon = (name: string) => {
        return L.divIcon({
        html: `
            <div class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <div class="text-xs font-semibold text-center mt-1">${name}</div>
            </div>
            `,
            className: '',
            iconSize: [28, 40],
            iconAnchor: [14, 40],
        });
    };

    return (
        <div className="w-full h-screen overflow-hidden shadow-lg">
            <MapContainer center={defaultCenter} zoom={defaultZoom} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {cities.map((city) => (
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
