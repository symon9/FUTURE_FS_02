"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah L.",
    role: "Happy Customer",
    text: "ShopVerse is a game-changer! The interface is so clean and the entire process was incredibly smooth. I found exactly what I needed.",
    image: "/images/sarah.jpg",
  },
  {
    name: "David C.",
    role: "Vendor Partner",
    text: "As a vendor, the platform is intuitive and powerful. It has allowed me to reach a wider audience effortlessly. Truly smart shopping.",
    image: "/images/david.jpg",
  },
  {
    name: "Emily R.",
    role: "Tech Enthusiast",
    text: "The security and speed are top-notch. I love the modern feel and trust ShopVerse with my purchases. Finally, an e-commerce site that gets it right!",
    image: "/images/emily.jpg",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 70%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        stagger: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-50 py-24">
      <div className="container mx-auto px-4 text-center">
        <AnimatedHeading
          text="Loved by Our Community"
          subtext="Don't just take our word for it. Here's what people are saying."
          className="mb-16"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white p-8 rounded-xl shadow-lg text-left"
            >
              <div className="flex text-brand-amber mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={20} />
                ))}
              </div>
              <p className="text-slate-600 mb-6">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  {/* //TODO: Note: You will need to add these images to your /public/images folder */}
                  {/* <Image src={testimonial.image} alt={testimonial.name} layout="fill" objectFit="cover" /> */}
                </div>
                <div>
                  <p className="font-bold text-brand-teal">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
