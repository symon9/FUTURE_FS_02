"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Electronics",
    href: "/#products",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    href: "/#products",
    image:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1887&auto=format&fit=crop",
  },
  {
    name: "Furniture",
    href: "/#products",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
  },
];

const ShopByCategory = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".category-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 100,
        stagger: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-teal">Shop By Category</h2>
        <p className="text-slate-500 mt-2">
          Find what you&apos;re looking for, faster.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <div className="category-card relative h-80 rounded-xl overflow-hidden group shadow-lg">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-3xl font-bold">{category.name}</h3>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Shop Now</span> <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
