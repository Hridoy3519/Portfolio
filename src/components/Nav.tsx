"use client";

import { useEffect, useRef, useState } from "react";
import { profile, route } from "@/content/site";
import ThemeToggle from "./ThemeToggle";
import TrainIcon from "./TrainIcon";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState<string>(route[0].label);
  const frame = useRef<number | null>(null);

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
        setScrolled(window.scrollY > 12);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Name the section currently occupying the upper part of the viewport.
  useEffect(() => {
    const sections = route
      .map((stop) => document.getElementById(stop.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const labels = new Map(route.map((stop) => [stop.id, stop.label]));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrent(labels.get(visible.target.id) ?? "");
      },
      { rootMargin: "-18% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300"
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 84%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 transition hover:text-brand">
          <TrainIcon size={17} className="text-brand" />
          <span className="font-mono text-sm font-medium tracking-tight">
            {profile.shortName.toLowerCase()}
            <span className="text-faint">.chowdhury</span>
          </span>
        </a>

        {/* Current section, in place of a conventional nav list */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex">
          <span className="font-mono text-[0.68rem] tracking-widest text-faint uppercase">
            Viewing
          </span>
          <span className="truncate font-mono text-xs text-brand">{current}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[0.68rem] text-faint tabular-nums sm:inline">
            {Math.round(progress * 100)}%
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-subtle text-muted transition hover:text-brand"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Scroll progress, with a marker riding it */}
      <div className="relative h-[2px] w-full" style={{ background: "var(--line)" }}>
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%`, background: "var(--brand)" }}
        />
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-out"
          style={{ left: `${progress * 100}%`, color: "var(--brand)" }}
          aria-hidden="true"
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-full border"
            style={{ background: "var(--bg-elev)", borderColor: "var(--brand)" }}
          >
            <TrainIcon size={11} />
          </span>
        </span>
      </div>

      {open ? (
        <div className="border-b border-line bg-elev shadow-card">
          <ul className="shell grid max-h-[70vh] grid-cols-1 gap-px overflow-y-auto py-3 sm:grid-cols-2">
            {route.map((stop) => (
              <li key={stop.id}>
                <a
                  href={`#${stop.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm text-muted transition hover:text-brand"
                >
                  <span className="font-mono text-[0.65rem] text-faint">{stop.short}</span>
                  {stop.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
