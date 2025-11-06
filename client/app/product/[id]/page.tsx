"use client";

import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ArrowLeft, Plus, Minus, ShieldCheck, Truck } from "lucide-react";
import gsap from "gsap";
import ProductCard from "@/components/ProductCard";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter(); // Using router for navigation
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const { addToCart } = useCartStore();
  const pageRef = useRef(null);

  // Data Fetching and Gallery Generation
  useEffect(() => {
    // Reset state on ID change
    setLoading(true);
    setProduct(null);

    if (id) {
      const fetchProductData = async () => {
        try {
          const [productRes, allProductsRes] = await Promise.all([
            api.get(`/products/${id}`),
            api.get(`/products`),
          ]);

          const currentProduct: Product = productRes.data;
          setProduct(currentProduct);
          setMainImage(currentProduct.image);

          // --- THE FIX: DYNAMICALLY GENERATE GALLERY IMAGES ---
          // This creates a gallery specific to the product's image
          if (currentProduct.image.includes("unsplash.com")) {
            const baseUrl = currentProduct.image.split("?")[0];
            const generatedGallery = [
              currentProduct.image, // The original image
              `${baseUrl}?w=800&h=800&fit=crop&crop=center`, // A centered square crop
              `${baseUrl}?w=800&h=800&fit=crop&fp-y=0.2`, // A crop focusing on the top part
            ];
            setGalleryImages(generatedGallery);
          } else {
            // Fallback for non-unsplash images
            setGalleryImages([currentProduct.image]);
          }
          // --------------------------------------------------------

          const related = allProductsRes.data
            .filter(
              (p: Product) =>
                p.category === currentProduct.category &&
                p._id !== currentProduct._id
            )
            .slice(0, 4);
          setRelatedProducts(related);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
          // Optionally redirect to a 404 page or show an error state
        } finally {
          setLoading(false);
        }
      };
      fetchProductData();
    }
  }, [id]);

  // Entrance Animations
  useLayoutEffect(() => {
    if (!loading && product) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(".product-image-gallery", {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
        }).from(
          ".product-details",
          { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
      }, pageRef);
      return () => ctx.revert();
    }
  }, [loading, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    // A more detailed skeleton loader for a better UX
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 animate-pulse">
        <div className="lg:col-span-3 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3">
            <div className="w-20 h-20 rounded-lg bg-slate-200"></div>
            <div className="w-20 h-20 rounded-lg bg-slate-200"></div>
            <div className="w-20 h-20 rounded-lg bg-slate-200"></div>
          </div>
          <div className="flex-1 h-96 md:h-[500px] bg-slate-200 rounded-xl"></div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-10 bg-slate-200 rounded w-3/4"></div>
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="h-12 bg-slate-200 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-20 text-red-500">Product not found.</p>;
  }

  return (
    <div ref={pageRef}>
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-teal mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <section className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="product-image-gallery lg:col-span-3 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3">
            {galleryImages.map((img, index) => (
              <button
                key={index} // Using index is safe here as the array order is stable
                className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  mainImage === img
                    ? "border-brand-amber"
                    : "border-transparent"
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
          <div className="relative flex-1 h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="relative! transition-transform duration-500 hover:scale-110"
              />
            )}
          </div>
        </div>

        <div className="product-details lg:col-span-2 flex flex-col">
          <p className="text-brand-green font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold text-brand-teal mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-brand-teal mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <p className="font-semibold">Quantity:</p>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-slate-100 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <span className="px-6 font-medium text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 hover:bg-slate-100 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary w-full text-lg py-3 mb-6"
          >
            Add to Cart
          </button>
          <div className="space-y-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-green" />
              <span>Secure Checkout & Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-brand-green" />
              <span>Fast & Reliable Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-brand-teal mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                href={`/product/${relatedProduct._id}`}
                className="block"
              >
                <ProductCard product={relatedProduct} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
