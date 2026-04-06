"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { gsap } from "@/lib/gsap";

const headlineWords = [
  "Healthcare",
  "software",
  "with",
  "the",
  "weight",
  "of",
  "a",
  "beautiful",
  "book.",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.2 });

      timeline
        .from(".hero-word", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.055,
          ease: "expo.out",
        })
        .from(
          ".hero-sub",
          {
            opacity: 0,
            y: 28,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 18,
            scale: 0.96,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.42"
        )
        .from(
          ".hero-card",
          {
            opacity: 0,
            y: 48,
            rotateX: 10,
            transformOrigin: "center bottom",
            duration: 1.1,
            ease: "expo.out",
          },
          "-=0.55"
        )
        .from(
          ".hero-scroll-hint",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "62% top",
          scrub: 1,
        },
      });

      gsap.to(".hero-card", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.fromTo(
        ".hero-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.inOut",
          delay: 1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 md:px-12 lg:px-16"
    >
      <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-4xl">
          <div className="overflow-hidden">
            <p className="hero-word inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.36em] text-[hsl(var(--primary))]">
              <Sparkles className="h-4 w-4" />
              Warm luxury healthcare systems
            </p>
          </div>

          <h1 className="mt-8 max-w-5xl text-[clamp(3.4rem,8vw,8.4rem)] font-headline font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-[#18120d]">
            {headlineWords.map((word) => (
              <span key={word} className="mr-[0.16em] inline-block overflow-hidden">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <div className="hero-line mt-8 h-px w-36 bg-[hsl(var(--primary))]" />

          <p className="hero-sub mt-10 max-w-2xl text-xl leading-relaxed text-[#59493c] md:text-2xl">
            SuperGIT turns operational complexity into something deliberate,
            tactile, and deeply legible. Every movement on the page should feel
            expensive on purpose.
          </p>

          <div className="hero-cta mt-12 flex flex-wrap gap-4">
            <a
              href="#story"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full bg-[#16110b] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff9f1] transition-transform duration-300 hover:-translate-y-1"
            >
              Enter the story
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#explainer"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#16110b] shadow-[0_20px_50px_rgba(17,12,8,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              Try the explainer
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative min-h-[28rem] lg:min-h-[42rem]">
          <div
            className="hero-card absolute left-[4%] top-[6%] w-[76%] rounded-[2.4rem] border border-white/10 bg-[#18120d] p-8 text-[#fff7ea] shadow-[0_55px_140px_rgba(17,12,8,0.28)]"
            data-speed="0.9"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#ffca75]">
              Operating note / 01
            </p>
            <p className="mt-8 font-headline text-4xl font-semibold uppercase leading-none">
              Layered clarity
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#ecd8bb]">
              Editorial pacing, cinematic reveals, and grounded system language
              for people who run complex healthcare organizations.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Claims", "Operations", "Finance", "Clinical"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs uppercase tracking-[0.18em] text-[#fff0d3]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="hero-card absolute bottom-[8%] right-[2%] w-[64%] rounded-[2rem] border border-black/10 bg-[rgba(255,250,244,0.8)] p-6 shadow-[0_36px_100px_rgba(17,12,8,0.12)] backdrop-blur"
            data-speed="1.08"
            data-lag="0.18"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#8a6e58]">
              Scroll behavior
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Pinned storytelling panels",
                "Text that reveals like a printed folio",
                "Velocity-aware surfaces and cursor treatment",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/8 bg-[#fff7ec] px-4 py-4 text-sm leading-6 text-[#2d2119]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute left-[12%] top-[58%] h-48 w-48 rounded-full border border-dashed border-[rgba(255,153,0,0.34)]"
            data-speed="0.75"
          />
          <div
            aria-hidden="true"
            className="absolute right-[10%] top-[12%] h-32 w-32 rounded-full border border-[rgba(24,18,13,0.08)] bg-white/40 backdrop-blur"
            data-speed="1.1"
          />
        </div>
      </div>

      <div className="hero-scroll-hint absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <span className="text-[0.7rem] uppercase tracking-[0.32em]">Scroll</span>
        <div className="h-14 w-px bg-[#16110b]/30" />
      </div>
    </section>
  );
}
