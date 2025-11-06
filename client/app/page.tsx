"use client";

import Hero from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ProductCollection } from "@/components/ProductCollection";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <Hero />
      <WhyChooseUs />
      <ProductCollection />
      <Testimonials />
    </div>
  );
}
