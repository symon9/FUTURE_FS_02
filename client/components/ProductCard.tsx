"use client";

import Image from "next/image";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartStore();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-brand-green font-medium mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-semibold text-brand-teal truncate h-7">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-brand-teal">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-brand-amber text-brand-teal p-2.5 rounded-full shadow-md hover:scale-110 transition-all duration-300"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
