"use client";

import { useCallback, useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type SplitFlapProps = {
  words: readonly string[];
  /** How long each word rests before flipping to the next. */
  holdMs?: number;
  className?: string;
};

/**
 * Split-flap display: each character tumbles through random glyphs before
 * settling on the next word. Renders the first word statically on the server
 * so hydration matches, then starts cycling once mounted.
 */
export default function SplitFlap({ words, holdMs = 2600, className = "" }: SplitFlapProps) {
  const width = Math.max(...words.map((w) => w.length));
  const pad = useCallback(
    (word: string) => word.toUpperCase().padEnd(width, " "),
    [width],
  );

  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(() => pad(words[0]));

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let flipTimer: ReturnType<typeof setInterval> | undefined;

    const hold = setTimeout(() => {
      const next = (index + 1) % words.length;
      const target = pad(words[next]);
      let tick = 0;

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
      }, 45);
    }, holdMs);

    return () => {
      clearTimeout(hold);
      if (flipTimer) clearInterval(flipTimer);
    };
  }, [index, words, holdMs, pad]);

  return (
    <span className={`inline-flex gap-[2px] ${className}`} aria-label={words[index]}>
      {display.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-grid min-w-[0.62em] place-items-center rounded-[3px] px-[0.06em] tabular-nums"
          style={{
            background: char === " " ? "transparent" : "rgba(255,255,255,0.055)",
            boxShadow:
              char === " " ? "none" : "inset 0 -1px 0 rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
