"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Product } from "@/types";
import api from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productGridRef = useRef(null);

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

  useEffect(() => {
    if (!loading && productGridRef.current) {
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [loading]);

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-teal mb-3">
          Your World of Smart Shopping
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Discover an intuitive, seamless, and enjoyable marketplace experience.
          We empower buyers and vendors to connect effortlessly.
        </p>
      </div>
      <div
        ref={productGridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <div key={product._id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
}
