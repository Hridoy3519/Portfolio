"use client";

import { useEffect, useState } from "react";
import type { Stop } from "@/content/site";

/**
 * The roles drawn as a train: the current one is the locomotive, earlier ones
 * are the carriages behind it. Each carriage's windows light up while its card
 * is on screen, and clicking one jumps to that role — a fun index that doubles
 * as a position indicator.
 */
export default function Consist({ stops }: { stops: Stop[] }) {
  const [lit, setLit] = useState<string[]>([]);

  useEffect(() => {
    const cards = stops
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setLit((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) next.add(entry.target.id);
            else next.delete(entry.target.id);
          }
          return [...next];
        });
      },
      // Lights a carriage once its card properly occupies the viewport,
      // rather than the instant an edge appears.
      { rootMargin: "-30% 0px -30% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [stops]);

  return (
    <div className="relative pb-3">
      <ol className="flex items-end gap-1.5 overflow-x-auto pb-1.5">
        {stops.map((stop, i) => (
          <li key={stop.id} className="shrink-0">
            <Carriage stop={stop} lit={lit.includes(stop.id)} isLocomotive={i === 0} />
          </li>
        ))}
      </ol>

      {/* Rail the consist stands on */}
      <span
        className="absolute inset-x-0 bottom-[0.55rem] h-[2px]"
        style={{ background: "var(--rail)" }}
        aria-hidden="true"
      />
      <span
        className="track-ties absolute inset-x-0 bottom-[0.15rem] h-2 opacity-50"
        aria-hidden="true"
      />
    </div>
  );
}

function Carriage({
  stop,
  lit,
  isLocomotive,
}: {
  stop: Stop;
  lit: boolean;
  isLocomotive: boolean;
}) {
  const windows = isLocomotive ? 3 : 4;

  return (
    <a
      href={`#${stop.id}`}
      className="group block focus-visible:outline-none"
      aria-label={`${stop.name} — ${stop.role}`}
    >
      <span
        className={`relative block border-2 px-2.5 py-2 transition-all duration-300 group-hover:-translate-y-0.5 ${
          isLocomotive ? "rounded-l-2xl rounded-r-md" : "rounded-md"
        }`}
        style={{
          borderColor: lit ? stop.color : "var(--rail)",
          background: "var(--bg-elev)",
          boxShadow: lit ? `0 0 18px -4px ${stop.color}` : "none",
        }}
      >
        {/* Headlight on the leading end */}
        {isLocomotive ? (
          <span
            className="absolute top-1/2 -left-[3px] h-1.5 w-1.5 -translate-y-1/2 rounded-full transition-colors duration-300"
            style={{ background: lit ? "var(--board-ink)" : "var(--rail)" }}
            aria-hidden="true"
          />
        ) : null}

        <span className="flex gap-1" aria-hidden="true">
          {Array.from({ length: windows }).map((_, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-[2px] transition-colors duration-300"
              style={{ background: lit ? "var(--board-ink)" : "var(--bg-subtle)" }}
            />
          ))}
        </span>
      </span>

      {/* Bogies */}
      <span className="mt-[3px] flex justify-around px-1.5" aria-hidden="true">
        {[0, 1].map((i) => (
          <span
            className="h-1.5 w-1.5 rounded-full"
            key={i}
            style={{ background: "var(--rail)" }}
          />
        ))}
      </span>

      <span
        className="mt-2 block font-mono text-[0.6rem] tracking-[0.12em] transition-colors duration-300"
        style={{ color: lit ? stop.color : "var(--text-faint)" }}
      >
        {stop.code}
      </span>
    </a>
  );
}
