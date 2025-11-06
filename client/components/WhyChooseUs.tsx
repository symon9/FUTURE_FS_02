"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Package, Tag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main heading and subheading
      gsap.from(".section-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        opacity: 0,
        y: 50,
        duration: 0.6,
      });
      // Animate the feature cards
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 0.5,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <ShieldCheck size={40} className="text-brand-amber" />,
      title: "Secure Shopping",
      description: "Your data is protected with top-tier security measures.",
    },
    {
      icon: <Package size={40} className="text-brand-amber" />,
      title: "Fast Delivery",
      description: "Get your products delivered to your doorstep in no time.",
    },
    {
      icon: <Tag size={40} className="text-brand-amber" />,
      title: "Best Prices",
      description:
        "We offer competitive prices on our vast selection of products.",
    },
  ];

  return (
    <section ref={sectionRef} className="text-center">
      <div className="section-header">
        <h2 className="text-4xl font-bold text-brand-teal mb-4">
          Why Choose ShopVerse?
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-12">
          We provide a seamless and trustworthy shopping experience.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="feature-card bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <div className="inline-block bg-brand-teal p-4 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-teal mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
