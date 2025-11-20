"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { profiles, categories, subCategories } from "./data/profiles";
import { CardPerson } from "@/components/CardPerson";
import { ProfilePreviewCard } from "@/components/ProfilePreviewCard";
import { FilterBar } from "./FilterBar";

export default function OuvrierApostolique() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [modalPerson, setModalPerson] = useState<typeof profiles[number] | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const filtered = profiles.filter((p) => {
    const cat = selectedCategory ? p.type === selectedCategory : true;
    const sub = selectedSub ? p.role === selectedSub : true;
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
        {filtered.map((person) => (
          <ProfilePreviewCard
            key={person.id}
            person={person}
            onClick={() => setModalPerson(person)}
            data-aos="fade-up"
          />
        ))}
      </div>

      {modalPerson && (
        <CardPerson person={modalPerson} onClose={() => setModalPerson(null)} />
      )}
    </div>
  );
}
