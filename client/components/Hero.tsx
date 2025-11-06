"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef(null);
  const blobRef = useRef(null);
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  const shape3Ref = useRef(null);
  const shape4Ref = useRef(null);
  const shape5Ref = useRef(null);

  // Entrance & Continuous Animation Timelines
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const blobTl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: 10, ease: "sine.inOut" },
      });
      blobTl
        .to(blobRef.current, { scale: 1.2, rotation: 45, x: "+=50", y: "+=30" })
        .to(blobRef.current, { scale: 1, rotation: -45, x: "-=50", y: "-=30" });

      // --- 2. Animate all five shapes ---
      const shapes = [
        shape1Ref.current,
        shape2Ref.current,
        shape3Ref.current,
        shape4Ref.current,
        shape5Ref.current,
      ];
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: `random(-40, 40, ${i})`, // Give each a unique random seed
          x: `random(-40, 40, ${i})`,
          rotation: "random(-90, 90)",
          duration: "random(10, 20)", // Each shape moves at a different speed
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i,
        });
      });

      // Entrance animation
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      entranceTl
        .from(blobRef.current, { scale: 0.5, opacity: 0, duration: 1 })
        .from(
          imageRef.current,
          { scale: 0.8, opacity: 0, duration: 1 },
          "-=0.7"
        )
        .from(
          ".hero-line-content",
          { y: "110%", duration: 1, stagger: 0.15, ease: "expo.out" },
          "-=0.8"
        )
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.7")
        .from(".hero-button", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        // Animate shapes in
        .from(shapes, { scale: 0, opacity: 0, stagger: 0.1, duration: 1 }, 0.2); // Stagger them in slightly after the blob
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Interactive Mouse Parallax Effect
  useLayoutEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    // --- 3. Create quickTo functions for all shapes ---
    const quickToFunctions = [
      {
        x: gsap.quickTo(shape1Ref.current, "x", { duration: 1.8 }),
        y: gsap.quickTo(shape1Ref.current, "y", { duration: 1.8 }),
        factor: -15,
      },
      {
        x: gsap.quickTo(shape2Ref.current, "x", { duration: 1.2 }),
        y: gsap.quickTo(shape2Ref.current, "y", { duration: 1.2 }),
        factor: 25,
      },
      {
        x: gsap.quickTo(shape3Ref.current, "x", { duration: 0.9 }),
        y: gsap.quickTo(shape3Ref.current, "y", { duration: 0.9 }),
        factor: -25,
      },
      {
        x: gsap.quickTo(shape4Ref.current, "x", { duration: 1.5 }),
        y: gsap.quickTo(shape4Ref.current, "y", { duration: 1.5 }),
        factor: 10,
      },
      {
        x: gsap.quickTo(shape5Ref.current, "x", { duration: 1.1 }),
        y: gsap.quickTo(shape5Ref.current, "y", { duration: 1.1 }),
        factor: -20,
      },
      // Image and blob parallax
      {
        x: gsap.quickTo(imageRef.current, "x", { duration: 0.8 }),
        y: gsap.quickTo(imageRef.current, "y", { duration: 0.8 }),
        factor: 20,
      },
      {
        x: gsap.quickTo(blobRef.current, "x", { duration: 1.2 }),
        y: gsap.quickTo(blobRef.current, "y", { duration: 1.2 }),
        factor: 10,
      },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = heroElement.getBoundingClientRect();
      const xPercent = (clientX / width - 0.5) * 2;
      const yPercent = (clientY / height - 0.5) * 2;

      quickToFunctions.forEach((func) => {
        func.x(xPercent * func.factor);
        func.y(yPercent * func.factor);
      });
    };

    heroElement.addEventListener("mousemove", handleMouseMove);
    return () => heroElement.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-white rounded-2xl overflow-hidden"
    >
      <div
        ref={shape1Ref}
        className="sphere bg-brand-green/50 w-24 h-24 top-[15%] left-[20%] z-0"
      ></div>
      <div
        ref={shape2Ref}
        className="sphere bg-brand-amber/50 w-32 h-32 top-[30%] right-[15%] z-0"
      ></div>
      <div
        ref={shape3Ref}
        className="sphere bg-brand-teal/50 w-16 h-16 top-[65%] left-[10%] z-0"
      ></div>
      <div
        ref={shape4Ref}
        className="sphere bg-brand-green/50 w-28 h-28 top-[75%] right-[25%] z-0"
      ></div>
      <div
        ref={shape5Ref}
        className="sphere bg-brand-amber/50 w-12 h-12 top-[20%] right-[30%] z-0"
      ></div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left z-20">
            <div className="hero-line-mask inline-block overflow-hidden">
              <h1 className="hero-line-content text-4xl md:text-6xl font-extrabold text-brand-teal leading-tight">
                Your World of
              </h1>
            </div>
            <br />
            <div className="hero-line-mask inline-block overflow-hidden mb-4">
              <h1 className="hero-line-content text-4xl md:text-6xl font-extrabold text-brand-teal leading-tight">
                Smart Shopping
              </h1>
            </div>
            <p className="hero-subtitle text-slate-500 max-w-lg mx-auto md:mx-0 text-lg mb-8">
              Discover an intuitive, seamless, and enjoyable marketplace
              experience. We empower buyers and vendors to connect effortlessly.
            </p>
            <a href="#products" className="hero-button inline-block group">
              <button className="btn-primary text-lg py-3 px-8">
                Explore Collection
              </button>
            </a>
          </div>

          <div className="relative h-80 md:h-96 flex items-center justify-center">
            <div
              ref={blobRef}
              className="absolute w-full h-full bg-gradient-to-br from-brand-amber/20 to-brand-green/20 rounded-full blur-3xl z-10"
            ></div>
            <div
              ref={imageRef}
              className="relative w-4/5 h-4/5 md:w-full md:h-full z-20"
            >
              <Image
                src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto-format&fit-crop"
                alt="Joyful Shopping"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
