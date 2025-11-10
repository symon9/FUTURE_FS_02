"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Product } from "@/types";
import api from "@/lib/api";
import { FilterAndSearch } from "./FilterAndSearch";

// 3. Register the Flip plugin
gsap.registerPlugin(Flip, ScrollTrigger);

const ProductCollection = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 4. Memoize categories and filtered products for performance
  const categories = useMemo(() => {
    const cats = allProducts.map((p) => p.category);
    return ["All", ...Array.from(new Set(cats))]; // Get unique categories
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  // 5. GSAP Flip Animation for smooth filtering
  useEffect(() => {
    if (!gridRef.current || loading) return;

    const grid = gridRef.current;
    const state = Flip.getState(grid.children); // Get the initial state
    const lastHeight = grid.offsetHeight;

    // Let React re-render the DOM with the new filtered products.
    // The grid's height will collapse instantly here.

    // 3. Force the grid back to its old height before animating.
    // This pushes the Testimonials section back down, PREVENTING THE OVERLAP.
    gsap.set(grid, { height: lastHeight });
    // Let React re-render the filtered list
    // (This happens between getState and the Flip.from call)

    Flip.from(state, {
      duration: 0.7,
      scale: true,
      ease: "power3.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5 }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.5 }),
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
    gsap.to(grid, {
      height: "auto", // Animate to the new, auto-calculated height
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [filteredProducts, loading]); // Run this effect whenever the filtered list changes

  return (
    <section id="products">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-teal">Our Collection</h2>
        <p className="text-slate-500 mt-2">
          Discover the best products, curated for you.
        </p>
      </div>

      {/* 6. Render the FilterAndSearch component */}
      <FilterAndSearch
        categories={categories.slice(1)} // Pass categories without "All"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map((product) => (
              // The key is crucial for Flip to track the elements
              <div key={product._id}>
                <Link href={`/product/${product._id}`} className="block">
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-brand-teal">
            No Products Found
          </h3>
          <p className="text-slate-500 mt-2">
            Try adjusting your search or filter.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductCollection;
