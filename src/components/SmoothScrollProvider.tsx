"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      ScrollSmoother.get()?.kill();

      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.4,
        smoothTouch: 0.08,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      ScrollTrigger.refresh();
    });

    return () => {
      media.revert();
      smoother.current?.kill();
      smoother.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
