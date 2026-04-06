"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const CARDS = [
  {
    label: "01",
    title: "HIS",
    body: "Admission, scheduling, billing, and discharge staged as one coherent operational surface.",
  },
  {
    label: "02",
    title: "ERP",
    body: "Supply, finance, and procurement with cleaner visibility and more confidence under pressure.",
  },
  {
    label: "03",
    title: "NPHIES Connect",
    body: "Claims communication designed to feel visible, fast, and less brittle across every handoff.",
  },
  {
    label: "04",
    title: "CDSS",
    body: "Clinical support that stays present without becoming noisy, heavy, or disruptive.",
  },
];

export function StackedCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

        cards.forEach((card, index) => {
          if (index === 0) {
            return;
          }

          gsap.from(card, {
            yPercent: 100,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.6,
            },
          });

          if (index < cards.length - 1) {
            gsap.to(card, {
              scale: 0.95,
              filter: "brightness(0.78)",
              ease: "none",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top bottom",
                end: "top 20%",
                scrub: 0.6,
              },
            });
          }
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: `+=${(cards.length - 1) * 100}vh`,
          pinSpacing: true,
        });
      });
    }, sectionRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-screen overflow-hidden px-6 py-20 md:px-10 lg:px-16"
    >
      {CARDS.map((card, index) => (
        <div
          key={card.label}
          className="stack-card absolute inset-0 flex items-center justify-center p-4 md:p-8"
          style={{ zIndex: index + 1 }}
        >
          <div
            className="w-full max-w-4xl rounded-[2.4rem] border border-black/10 p-10 md:p-14"
            style={{
              background:
                index % 2 === 0
                  ? "linear-gradient(180deg, rgba(255,251,244,0.96) 0%, rgba(246,234,218,0.98) 100%)"
                  : "linear-gradient(180deg, rgba(24,18,13,0.94) 0%, rgba(36,28,20,0.98) 100%)",
              boxShadow: "0 42px 120px rgba(0,0,0,0.14)",
              color: index % 2 === 0 ? "#17120d" : "#fff3df",
            }}
          >
            <span
              className="font-headline text-7xl font-semibold"
              style={{
                color:
                  index % 2 === 0
                    ? "rgba(255,153,0,0.22)"
                    : "rgba(255,190,97,0.2)",
              }}
            >
              {card.label}
            </span>
            <h3 className="mt-6 font-headline text-4xl font-semibold uppercase tracking-[-0.04em] md:text-6xl">
              {card.title}
            </h3>
            <p
              className="mt-5 max-w-xl text-lg leading-8 md:text-2xl"
              style={{
                color: index % 2 === 0 ? "#5a493c" : "#ecd8bb",
              }}
            >
              {card.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
