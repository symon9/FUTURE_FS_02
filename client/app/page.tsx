"use client";

import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ShopByCategory from "@/components/ShopByCategory";
import ProductCollection from "@/components/ProductCollection";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <Hero />
      <WhyChooseUs />
      <ShopByCategory />
      <FeaturedProducts />
      <ProductCollection />
      <Testimonials />
    </div>
  );
}
