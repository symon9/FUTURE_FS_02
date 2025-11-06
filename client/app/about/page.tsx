"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Target, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".about-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".mission-card", {
        scrollTrigger: { trigger: ".mission-section", start: "top 80%" },
        opacity: 0,
        y: 100,
        stagger: 0.2,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const missionData = [
    {
      icon: <Target size={32} className="text-brand-amber" />,
      title: "Our Mission",
      description:
        "To empower buyers and vendors through an intuitive, seamless, and enjoyable marketplace experience that fosters connection and trust.",
    },
    {
      icon: <Users size={32} className="text-brand-amber" />,
      title: "Our Community",
      description:
        "We're building a forward-thinking community where smart, secure, and accessible shopping is the standard for everyone.",
    },
    {
      icon: <Zap size={32} className="text-brand-amber" />,
      title: "Our Vision",
      description:
        "To be the most trusted and innovative e-commerce platform, creating a universe of possibilities for shoppers and sellers alike.",
    },
  ];

  return (
    <div ref={pageRef} className="space-y-24">
      {/* Hero Section for About Page */}
      <section className="text-center">
        <h1 className="about-title text-5xl md:text-6xl font-extrabold text-brand-teal mb-4">
          We are ShopVerse.
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-500">
          A fresh take on e-commerce, built around smart, secure, and accessible
          shopping for a modern world.
        </p>
      </section>

      {/* Main Image */}
      <div className="about-image relative h-96 max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
          alt="ShopVerse Team"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Mission/Vision Section */}
      <section className="mission-section text-center">
        <div className="grid md:grid-cols-3 gap-8">
          {missionData.map((item, index) => (
            <div
              key={index}
              className="mission-card bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="mb-4 inline-block bg-brand-teal p-3 rounded-full">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold text-brand-teal mb-2">
                {item.title}
              </h2>
              <p className="text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
