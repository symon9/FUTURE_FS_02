"use client";

import { useEffect, useState, useRef, useMemo, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Product } from "@/types";
import api from "@/lib/api";
import { FilterAndSearch } from "./FilterAndSearch";

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);

export const ProductCollection = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  // Effect for fetching the initial product data from the API
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

  // Memoized calculations for categories and filtered products to optimize performance
  const categories = useMemo(() => {
    const cats = allProducts.map((p) => p.category);
    return ["All", ...Array.from(new Set(cats))];
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

  // Main animation effect that handles all states (Loading, Initial Reveal, Filtering)
  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const grid = gridRef.current;

    // Phase 1: LOADING STATE
    // While loading, measure the skeleton grid and set a min-height.
    // This prevents the container from collapsing when we swap skeletons for real cards.
    if (loading) {
      const rect = grid.getBoundingClientRect();
      if (rect.height > 0) {
        gsap.set(grid, { minHeight: rect.height });
      }
      return; // Stop here if still loading
    }

    // Phase 2: INITIAL REVEAL (runs only once after loading is complete)
    // We check a ref to see if this is the very first time we have data.
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // Set flag to false for all future re-renders

      // A simple, clean entrance animation for the cards. No complex Flip needed here.
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          // When done, remove the min-height and refresh ScrollTrigger
          onComplete: () => {
            gsap.set(grid, { minHeight: "auto" });
            ScrollTrigger.refresh();
          },
        }
      );
      return; // Do not run the Flip logic on this first render
    }

    // Phase 3: FILTERING ANIMATION (runs on all subsequent filter/search changes)
    // Capture the state of the container AND its children together.
    const state = Flip.getState([grid, ...Array.from(grid.children)]);

    // Animate from the captured state.
    // GSAP will now automatically handle the height animation of the `grid`
    // while simultaneously animating the children.
    Flip.from(state, {
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.05,
      // Target only the children for scale/fade effects
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5 }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.8, absolute: true }), // `absolute` is needed for leaving items

      // Refresh ScrollTrigger when the entire flip animation (including container resize) is done.
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
  }, [loading, filteredProducts]); // This effect re-runs when loading state or filters change

  return (
    <section id="products">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-teal">Our Collection</h2>
        <p className="text-slate-500 mt-2">
          Discover the best products, curated for you.
        </p>
      </div>

      <FilterAndSearch
        categories={categories.slice(1)}
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
