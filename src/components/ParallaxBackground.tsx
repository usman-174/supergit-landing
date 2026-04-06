"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb-1", {
        y: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      gsap.to(".bg-grain", {
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "35% top",
          scrub: 1,
        },
      });

      gsap.to(".bg-orb-2", {
        y: "18%",
        x: "6%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      gsap.fromTo(
        ".bg-grid",
        { opacity: 0 },
        {
          opacity: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "20% top",
            end: "60% top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="bg-orb-1 absolute -left-[10%] -top-[20%] h-[70vw] w-[70vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,153,0,0.22) 0%, rgba(255,153,0,0.06) 50%, transparent 75%)",
          filter: "blur(44px)",
        }}
      />

      <div
        className="bg-orb-2 absolute right-[-15%] top-[28%] h-[45vw] w-[45vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,50,0.15) 0%, rgba(255,120,0,0.05) 50%, transparent 75%)",
          filter: "blur(64px)",
        }}
      />

      <div
        className="bg-grain absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.88\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          mixBlendMode: "multiply",
        }}
      />

      <div
        className="bg-grid absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,153,0,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.28) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 72%)",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,244,0.78)_0%,rgba(255,248,239,0.48)_40%,rgba(24,18,13,0.06)_100%)]" />
    </div>
  );
}
