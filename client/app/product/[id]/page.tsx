"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ArrowLeft } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading)
    return <p className="text-center py-20">Loading product details...</p>;
  if (!product)
    return <p className="text-center py-20 text-red-500">Product not found.</p>;

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-teal mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Collection
      </Link>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-brand-green font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold text-brand-teal mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-brand-teal mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            {product.description}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => addToCart(product)}
              className="btn-primary text-lg py-3 px-10"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
