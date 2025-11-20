"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface FilterBarProps {
  categories: string[];
  subCats: { [key: string]: string[] };
  selectedCategory: string;
  selectedSub: string;
  search: string;
  setCategory: (category: string) => void;
  setSub: (sub: string) => void;
  setSearch: (value: string) => void;
}

export function FilterBar({
  categories,
  subCats,
  selectedCategory,
  selectedSub,
  search,
  setCategory,
  setSub,
  setSearch,
}: FilterBarProps) {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="flex flex-wrap gap-4 w-full mb-6" data-aos="fade-down">

      <input
        type="text"
        placeholder="Rechercher un nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-3 rounded-l-2xl bg-background border border-border w-1/2"
      />

      <select
        className="px-4 py-3 bg-background border border-border"
        value={selectedCategory}
        onChange={(e) => {
          setCategory(e.target.value);
          setSub("");
        }}
      >
        <option value="">Toutes catégories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <select
          className="px-4 py-3 rounded-r-2xl bg-background border border-border"
          value={selectedSub}
          onChange={(e) => setSub(e.target.value)}
        >
          <option value="">Tous</option>
          {subCats[selectedCategory].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
