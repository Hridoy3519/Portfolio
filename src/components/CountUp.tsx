"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure like "10M+" or "40%" up from zero the first time it
 * scrolls into view. Renders the final value on the server, so crawlers
 * and reduced-motion visitors see the real number straight away.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits.replace(/,/g, ""), 10);
    const duration = 1300;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setText(`${prefix}${Math.round(target * eased)}${suffix}`);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
