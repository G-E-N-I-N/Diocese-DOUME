"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ouvriersProfiles, categories, subCategories } from "./data/profiles";
import { CardPerson } from "@/components/CardPerson";
import { ProfilePreviewCard } from "@/components/ProfilePreviewCard";
import { FilterBar } from "./FilterBar";
import { a } from "framer-motion/client";

export default function OuvrierApostolique() {
  const [profiles, setProfiles] = useState<typeof ouvriersProfiles extends () => Promise<infer U> ? U : never>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProfiles() {
      const data = await ouvriersProfiles();
      setProfiles(data);
      setIsLoading(false);
    }
    fetchProfiles();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [modalPerson, setModalPerson] = useState<typeof profiles[number] | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const filtered = profiles.filter((p) => {
    const cat = selectedCategory ? p.role === selectedCategory : true;
    const sub = selectedSub ? p.type === selectedSub : true;
    const match = p.name.toLowerCase().includes(search.toLowerCase());
    return cat && sub && match;
  });

  return (
    <div className="container py-12 bg-background min-h-screen text-foreground">
      <FilterBar
        categories={categories}
        subCats={subCategories}
        selectedCategory={selectedCategory}
        selectedSub={selectedSub}
        search={search}
        setCategory={setSelectedCategory}
        setSub={setSelectedSub}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-300 rounded-lg h-64" />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">Aucun profil trouvé</p>
          </div>
        ) : (
          filtered.map((person) => (
            <ProfilePreviewCard
              key={person.id}
              person={person}
              onClick={() => setModalPerson(person)}
              data-aos="fade-up"
            />
          ))
        )}
      </div>

      {modalPerson && (
        <CardPerson person={modalPerson} onClose={() => setModalPerson(null)} />
      )}
    </div>
  );
}
