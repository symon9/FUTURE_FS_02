"use-client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Product } from "@/types";
import api from "@/lib/api";

// Register ScrollTrigger plugin if it's not already registered globally
gsap.registerPlugin(ScrollTrigger);

export const ProductCollection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Animate cards when they scroll into view
  useEffect(() => {
    // We wait for loading to be false AND for products to be available.
    if (!loading && products.length > 0) {
      gsap.fromTo(
        ".product-card-container",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
          },
        }
      );
    }
  }, [loading, products]);

  return (
    <section id="products" ref={sectionRef}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-teal">Our Collection</h2>
        <p className="text-slate-500 mt-2">
          Discover the best products, curated for you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <div key={product._id} className="product-card-container">
                <Link href={`/product/${product._id}`} className="block">
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
      </div>
    </section>
  );
};
