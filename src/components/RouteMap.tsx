"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { route, stops } from "@/content/site";
import TrainIcon from "./TrainIcon";

type Marker = { id: string; label: string; short: string; color: string; pct: number };

const colorFor = (id: string) => stops.find((s) => s.id === id)?.color ?? "var(--brand)";

/**
 * A fixed route map down the left margin. Section markers sit at the scroll
 * position that brings each section into view, and the position indicator
 * rides the line as the visitor scrolls.
 */
export default function RouteMap() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  const measure = useCallback(() => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const anchor = window.innerHeight * 0.35;

    const next = route
      .map((stop) => {
        const el = document.getElementById(stop.id);
        if (!el) return null;
        const target = Math.min(
          Math.max(el.getBoundingClientRect().top + window.scrollY - anchor, 0),
          maxScroll,
        );
        return {
          id: stop.id,
          label: stop.label,
          short: stop.short,
          color: colorFor(stop.id),
          pct: target / maxScroll,
        };
      })
      .filter((s): s is Marker => s !== null);

    setMarkers(next);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        setProgress(Math.min(Math.max(window.scrollY / maxScroll, 0), 1));
      });
    };

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    // Section heights settle after fonts and reveal animations land.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  if (markers.length === 0) return null;

  return (
    <aside
      className="fixed top-1/2 left-6 z-40 hidden h-[62vh] -translate-y-1/2 xl:block"
      aria-hidden="true"
    >
      <div className="relative h-full w-3">
        <span className="track-rail absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2" />

        {/* Portion already scrolled */}
        <span
          className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%`, background: "var(--brand)", opacity: 0.85 }}
        />

        {markers.map((marker) => {
          const passed = progress >= marker.pct - 0.004;
          return (
            <span
              key={marker.id}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${marker.pct * 100}%` }}
            >
              <span
                className="block rounded-full border-2 transition-all duration-300"
                style={{
                  width: passed ? 10 : 8,
                  height: passed ? 10 : 8,
                  background: passed ? marker.color : "var(--bg)",
                  borderColor: passed ? marker.color : "var(--rail)",
                }}
              />
              <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 rounded-md border border-line bg-elev px-2 py-1 font-mono text-[0.62rem] whitespace-nowrap text-muted opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
                {marker.label}
              </span>
            </span>
          );
        })}

        {/* Position indicator */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-150 ease-out"
          style={{ top: `${progress * 100}%` }}
        >
          <span
            className="sway grid h-7 w-7 place-items-center rounded-full border shadow-card"
            style={{
              background: "var(--bg-elev)",
              borderColor: "var(--brand)",
              color: "var(--brand)",
            }}
          >
            <TrainIcon size={14} />
          </span>
        </span>
      </div>
    </aside>
  );
}
