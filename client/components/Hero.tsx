"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(".hero-button", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="bg-slate-50 rounded-2xl overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="hero-title text-4xl md:text-6xl font-extrabold text-brand-teal mb-4 leading-tight">
              Your World of Smart Shopping
            </h1>
            <p className="hero-subtitle text-slate-500 max-w-lg mx-auto md:mx-0 text-lg mb-8">
              Discover an intuitive, seamless, and enjoyable marketplace
              experience. We empower buyers and vendors to connect effortlessly.
            </p>
            <Link href="#products" className="hero-button inline-block">
              <button className="btn-primary text-lg py-3 px-8">
                Explore Collection
              </button>
            </Link>
          </div>
          <div className="hero-image relative h-64 md:h-96">
            <Image
              src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop"
              alt="Joyful Shopping"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
