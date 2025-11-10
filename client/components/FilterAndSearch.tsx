"use client";

import { Search, X } from "lucide-react";

interface FilterAndSearchProps {
  categories: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const FilterAndSearch = ({
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: FilterAndSearchProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-primary w-full pl-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-teal"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === "All"
                ? "bg-brand-teal text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-brand-teal text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
