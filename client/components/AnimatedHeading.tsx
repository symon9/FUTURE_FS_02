"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;
  subtext?: string;
  className?: string;
}

const AnimatedHeading = ({
  text,
  subtext,
  className,
}: AnimatedHeadingProps) => {
  // --- THE FIX: Provide the specific HTML element type to useRef ---
  // We tell TypeScript that this ref will eventually hold an HTMLDivElement.
  const headingRef = useRef<HTMLDivElement>(null);
  // ----------------------------------------------------------------

  useLayoutEffect(() => {
    // Now, TypeScript knows that headingRef.current is either an HTMLDivElement or null.
    const el = headingRef.current;

    // We add a "type guard" to ensure 'el' is not null before using it.
    if (!el) return;

    // Because of the guard, TypeScript now knows 'el' is definitely an HTMLDivElement,
    // so it allows access to .querySelectorAll without any error.
    gsap.from(el.querySelectorAll(".heading-line, .subheading"), {
      scrollTrigger: { trigger: el, start: "top 85%" },
      y: "100%",
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div ref={headingRef} className={`text-center ${className}`}>
      {/* We need to wrap each line in its own div for the stagger to work correctly */}
      <div className="overflow-hidden">
        <h2 className="heading-line text-4xl font-bold text-brand-teal">
          {text}
        </h2>
      </div>
      {subtext && (
        <div className="overflow-hidden mt-2">
          <p className="subheading text-slate-500 text-lg">{subtext}</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedHeading;
