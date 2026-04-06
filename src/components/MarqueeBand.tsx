"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  "Hospital",
  "Flow",
  "·",
  "Claims",
  "Velocity",
  "·",
  "Clinical",
  "Clarity",
  "·",
  "Operational",
  "Calm",
  "·",
];

export function MarqueeBand() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 22,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        onUpdate(self) {
          const velocity = self.getVelocity() / 1000;
          const skew = gsap.utils.clamp(-12, 12, velocity * -0.3);

          gsap.to(track, {
            skewX: skew,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative my-16 overflow-hidden border-y border-black/10 bg-[rgba(255,252,247,0.72)] py-8 backdrop-blur">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-6 select-none font-headline text-4xl font-semibold uppercase tracking-[0.18em] text-[#16110b]/10 transition-colors hover:text-[hsl(var(--primary))] md:text-6xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
