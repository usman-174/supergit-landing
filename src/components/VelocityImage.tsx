"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type VelocityImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function VelocityImage({
  src,
  alt,
  className,
}: VelocityImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!frameRef.current || !imageRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: frameRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const velocity = Math.min(Math.abs(self.getVelocity()) / 3000, 1);

          gsap.to(imageRef.current, {
            scaleY: 1 - velocity * 0.08,
            scaleX: 1 + velocity * 0.04,
            duration: 0.45,
            ease: "power2.out",
          });
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, frameRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={frameRef}
      className={`relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#1a140f] shadow-[0_40px_120px_rgba(17,12,8,0.16)] ${className ?? ""}`}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#ffbe61] to-transparent opacity-80" />
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="will-change-transform h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,242,0.06)_0%,rgba(255,250,242,0)_40%,rgba(10,8,6,0.16)_100%)]" />
    </div>
  );
}
