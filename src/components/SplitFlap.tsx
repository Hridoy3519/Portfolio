"use client";

import { useCallback, useEffect, useState } from "react";

/** Letters and digits, so numeric values tumble through plausible glyphs. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export type FlapItem = { label: string; value: string };

type SplitFlapProps = {
  items: readonly FlapItem[];
  /** How long each item rests before flipping to the next. */
  holdMs?: number;
  className?: string;
  labelClassName?: string;
};

/**
 * Split-flap display: each character tumbles through random glyphs before
 * settling on the next value, with its label changing as the flaps start to
 * move. Renders the first item statically on the server so hydration matches,
 * then starts cycling once mounted.
 */
export default function SplitFlap({
  items,
  holdMs = 3000,
  className = "",
  labelClassName = "",
}: SplitFlapProps) {
  const width = Math.max(...items.map((i) => i.value.length));
  const pad = useCallback(
    (value: string) => value.toUpperCase().padEnd(width, " "),
    [width],
  );

  const [index, setIndex] = useState(0);
  const [labelIndex, setLabelIndex] = useState(0);
  const [display, setDisplay] = useState(() => pad(items[0].value));

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let flipTimer: ReturnType<typeof setInterval> | undefined;

    const hold = setTimeout(() => {
      const next = (index + 1) % items.length;
      const target = pad(items[next].value);
      let tick = 0;

      // The label belongs to the value arriving, so it switches as the
      // flaps start moving rather than after they settle.
      setLabelIndex(next);

      flipTimer = setInterval(() => {
        tick += 1;
        // Characters lock in left-to-right as the flaps settle.
        const locked = Math.floor(tick / 2);
        setDisplay(
          target
            .split("")
            .map((char, i) =>
              i < locked || char === " "
                ? char
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            )
            .join(""),
        );

        if (locked >= target.length) {
          clearInterval(flipTimer);
          setDisplay(target);
          setIndex(next);
        }
      }, 42);
    }, holdMs);

    return () => {
      clearTimeout(hold);
      if (flipTimer) clearInterval(flipTimer);
    };
  }, [index, items, holdMs, pad]);

  const current = items[labelIndex];

  return (
    <span
      className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1"
      aria-label={`${current.label}: ${current.value}`}
    >
      <span className={labelClassName} aria-hidden="true">
        {current.label}
      </span>
      <span className={`inline-flex gap-[2px] ${className}`} aria-hidden="true">
        {display.split("").map((char, i) => (
          <span
            key={i}
            className="inline-grid min-w-[0.62em] place-items-center rounded-[3px] px-[0.06em] tabular-nums"
            style={{
              background: char === " " ? "transparent" : "rgba(255,255,255,0.055)",
              boxShadow:
                char === " "
                  ? "none"
                  : "inset 0 -1px 0 rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
