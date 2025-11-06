"use client";

import { useEffect, useState, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Product } from "@/types";
import api from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    if (products.length > 0 && marqueeRef.current) {
      const marquee = marqueeRef.current;
      const cards = Array.from(marquee.children); // Get initial cards

      // Check if we have enough cards to animate
      if (cards.length === 0) return;

      const cardWidth = cards[0].clientWidth + 32; // width + gap
      const totalWidth = cardWidth * cards.length;

      // Only duplicate if not already done
      if (marquee.children.length === products.length) {
        cards.forEach((card) => {
          marquee.appendChild(card.cloneNode(true));
        });
      }

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(marquee, { x: -totalWidth, duration: 30 });

      // --- THE FIX: Use curly braces to ensure 'void' is returned ---
      return () => {
        tl.kill();
      };
      // ----------------------------------------------------------------
    }
  }, [products]);

  // Use a skeleton loader while products are being fetched
  if (loading) {
    return (
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-teal">
            Featured Products
          </h2>
          <p className="text-slate-500 mt-2">
            Handpicked for you from our collection.
          </p>
        </div>
        <div className="flex gap-8 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shrink-0 w-80">
              <ProductSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-teal">
          Featured Products
        </h2>
        <p className="text-slate-500 mt-2">
          Handpicked for you from our collection.
        </p>
      </div>
      <div className="relative">
        <div ref={marqueeRef} className="flex gap-8">
          {products.map((product) => (
            <div key={product._id} className="shrink-0 w-80">
              <Link href={`/product/${product._id}`} className="block">
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
          {/* Duplicates will be added here by the GSAP effect */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
