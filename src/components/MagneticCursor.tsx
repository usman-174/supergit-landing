"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

export function MagneticCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!hasFinePointer || !cursorDot.current || !cursorRing.current) {
      return;
    }

    const dot = cursorDot.current;
    const ring = cursorRing.current;

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
    });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.14, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.14, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const handleEnterInteractive = () => {
      gsap.to(ring, { scale: 2.6, opacity: 0.45, duration: 0.28 });
      gsap.to(dot, { scale: 0.1, opacity: 0.18, duration: 0.2 });
    };

    const handleLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 0.75, duration: 0.28 });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest(
        "a, button, [data-magnetic]"
      );

      if (target) {
        handleEnterInteractive();
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest(
        "a, button, [data-magnetic]"
      );

      if (target) {
        handleLeaveInteractive();
      }
    };

    const handleWindowLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const handleWindowEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.24 });
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleWindowLeave);
    window.addEventListener("focus", handleWindowEnter);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleWindowLeave);
      window.removeEventListener("focus", handleWindowEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[hsl(var(--primary))] mix-blend-multiply"
      />
      <div
        ref={cursorRing}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-[hsl(var(--primary))] opacity-75"
      />
    </>
  );
}
