"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "@/lib/gsap";

const STOPS = [
  { progress: 0, hue: 36, sat: 100, light: 50 },
  { progress: 0.33, hue: 31, sat: 92, light: 49 },
  { progress: 0.66, hue: 24, sat: 88, light: 46 },
  { progress: 1, hue: 36, sat: 100, light: 52 },
];

export function AmbientColorShift() {
  useEffect(() => {
    const root = document.documentElement;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const progress = self.progress;

        let start = STOPS[0];
        let end = STOPS[1];

        for (let index = 0; index < STOPS.length - 1; index += 1) {
          if (
            progress >= STOPS[index].progress &&
            progress <= STOPS[index + 1].progress
          ) {
            start = STOPS[index];
            end = STOPS[index + 1];
            break;
          }
        }

        const localProgress =
          (progress - start.progress) / (end.progress - start.progress || 1);
        const lerp = (from: number, to: number) =>
          from + (to - from) * localProgress;

        const hue = lerp(start.hue, end.hue).toFixed(1);
        const saturation = lerp(start.sat, end.sat).toFixed(1);
        const lightness = lerp(start.light, end.light).toFixed(1);

        root.style.setProperty("--primary", `${hue} ${saturation}% ${lightness}%`);
        root.style.setProperty("--ring", `${hue} ${saturation}% ${lightness}%`);
        root.style.setProperty(
          "--scroll-progress",
          `${(progress * 100).toFixed(2)}%`
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return null;
}
