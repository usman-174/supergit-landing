"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

import { gsap } from "@/lib/gsap";

export function useSplitReveal(stagger = 0.06) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const words = ref.current?.querySelectorAll(".reveal-word");

      if (!words?.length) {
        return;
      }

      gsap.from(words, {
        yPercent: 105,
        duration: 0.9,
        stagger,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [stagger]);

  return ref;
}

export function SplitHeading({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useSplitReveal();

  return (
    <h2 ref={ref as RefObject<HTMLHeadingElement>} className={className}>
      {children.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.2em] inline-block overflow-hidden">
          <span className="reveal-word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

export function SplitCopy({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useSplitReveal(0.03);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
