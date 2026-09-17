"use client";

import { useEffect, useRef, useState } from "react";
import { profile, route } from "@/content/site";
import ThemeToggle from "./ThemeToggle";
import TrainIcon from "./TrainIcon";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentId, setCurrentId] = useState<string>(route[0].id);
  const frame = useRef<number | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const current = route.find((stop) => stop.id === currentId) ?? route[0];

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

  // Track the section currently occupying the upper part of the viewport.
  useEffect(() => {
    const sections = route
      .map((stop) => document.getElementById(stop.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrentId(visible.target.id);
      },
      { rootMargin: "-18% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // While the route is open: lock page scroll, close on Escape or an outside click.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!shellRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const raised = scrolled || open;

  return (
    <header className="nav-header fixed inset-x-0 top-0 z-50">
      <div className="shell pt-3">
        <div ref={shellRef} className="nav-shell relative" data-raised={raised}>
          <nav className="flex h-14 items-center justify-between gap-3 pr-2 pl-2">
            <a
              href="#top"
              onClick={() => setOpen(false)}
              className="group flex min-w-0 items-center gap-2.5 rounded-lg py-1 pr-2 pl-1"
            >
              <span className="nav-badge grid h-8 w-8 shrink-0 place-items-center rounded-lg text-brand">
                <TrainIcon size={16} />
              </span>
              <span className="truncate font-mono text-sm font-medium tracking-tight transition group-hover:text-brand">
                {profile.shortName.toLowerCase()}
                <span className="text-faint">.chowdhury</span>
              </span>
            </a>

            {/* Current stop, like the next-station display inside a carriage */}
            <div className="nav-stop hidden min-w-0 items-center gap-2.5 rounded-full py-1.5 pr-3.5 pl-2.5 sm:flex">
              <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--brand)" }} />
              {/* Only the stop announces. The percentage below changes on nearly
                  every scroll frame, so it stays outside the live region. */}
              <span className="flex min-w-0" aria-live="polite">
                <span key={current.id} className="nav-stop-text flex min-w-0 items-baseline gap-2">
                  <span className="font-mono text-[0.65rem] tracking-wider text-faint">{current.short}</span>
                  <span className="truncate text-[0.8rem] font-medium">{current.label}</span>
                </span>
              </span>
              <span className="font-mono text-[0.65rem] text-faint tabular-nums">
                {Math.round(progress * 100)}%
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close navigation" : "Open navigation"}
                aria-expanded={open}
                aria-controls="nav-route"
                className="nav-btn flex h-9 items-center gap-2 rounded-lg px-2.5"
                data-active={open}
              >
                <span className="hidden font-mono text-[0.7rem] tracking-wider uppercase sm:inline">Route</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                  <path className="nav-burger nav-burger-top" d="M4 8h16" />
                  <path className="nav-burger nav-burger-bottom" d="M4 16h16" />
                </svg>
              </button>
            </div>
          </nav>

          {/* The route: every stop on the journey, with the current one marked */}
          <div id="nav-route" className="nav-route" data-open={open} inert={!open}>
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-line px-2 pt-3 pb-2">
                <p className="mb-2 flex items-center justify-between px-2 font-mono text-[0.65rem] tracking-widest text-faint uppercase">
                  <span>Route</span>
                  <span>{route.length} stops</span>
                </p>
                <ol className="grid max-h-[65vh] grid-cols-1 gap-0.5 overflow-y-auto sm:grid-cols-2">
                  {route.map((stop) => {
                    const here = stop.id === current.id;
                    return (
                      <li key={stop.id}>
                        <a
                          href={`#${stop.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={here ? "location" : undefined}
                          className="nav-link flex items-center gap-3 rounded-lg px-2 py-2 text-sm"
                          data-here={here}
                        >
                          <span className="nav-code grid h-6 w-10 shrink-0 place-items-center rounded-md font-mono text-[0.62rem] tracking-wider">
                            {stop.short}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{stop.label}</span>
                          {here ? (
                            <span className="font-mono text-[0.6rem] tracking-widest text-brand uppercase">
                              You are here
                            </span>
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>

          {/* Scroll progress: a rail along the bottom edge with the train riding it */}
          <div
            className="nav-rail pointer-events-none absolute inset-x-5 -bottom-px h-px"
            aria-hidden="true"
          >
            <div className="h-full origin-left" style={{ transform: `scaleX(${progress})`, background: "var(--brand)" }} />
            <span
              className="absolute top-1/2 grid h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-brand"
              style={{ left: `${progress * 100}%`, background: "var(--bg-elev)", borderColor: "var(--brand)" }}
            >
              <TrainIcon size={10} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
