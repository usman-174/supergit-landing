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
      force3D: true,
    });

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const dotState = { x: pointer.x, y: pointer.y };
    const ringState = { x: pointer.x, y: pointer.y };

    const render = () => {
      dotState.x += (pointer.x - dotState.x) * 0.34;
      dotState.y += (pointer.y - dotState.y) * 0.34;
      ringState.x += (pointer.x - ringState.x) * 0.18;
      ringState.y += (pointer.y - ringState.y) * 0.18;

      setDotX(dotState.x);
      setDotY(dotState.y);
      setRingX(ringState.x);
      setRingY(ringState.y);
    };

    const handleMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const handleEnterInteractive = () => {
      gsap.to(ring, { scale: 2.15, opacity: 0.52, duration: 0.22, overwrite: true });
      gsap.to(dot, { scale: 0.42, opacity: 0.28, duration: 0.18, overwrite: true });
    };

    const handleLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 0.72, duration: 0.22, overwrite: true });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.18, overwrite: true });
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
      gsap.to([dot, ring], { opacity: 0, duration: 0.18, overwrite: true });
    };

    const handleWindowEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: true });
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleWindowLeave);
    window.addEventListener("focus", handleWindowEnter);
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleWindowLeave);
      window.removeEventListener("focus", handleWindowEnter);
      gsap.ticker.remove(render);
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
