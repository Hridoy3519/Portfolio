"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, applied as a CSS transition delay. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts its children into view once, the first time they intersect.
 * Falls back to visible content when IntersectionObserver is unavailable.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.dataset.reveal = "shown";
    };

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);

    // Some embedded viewports report nothing intersecting at hydration and
    // stay silent until the first scroll. Anything already on screen when
    // the page lands should never wait for that — check it by hand once.
    const frame = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        show();
        observer.disconnect();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
