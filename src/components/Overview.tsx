"use client";

import { useEffect, useState } from "react";
import { boardStops, currentRoles, highlights, profile, stats } from "@/content/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SplitFlap from "./SplitFlap";
import TrainIcon from "./TrainIcon";
import TrainScene from "./TrainScene";

export default function Overview() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <div
        className="glow-orb pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 font-mono text-[0.7rem] text-muted">
              <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} />
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 font-mono text-[0.7rem] tracking-widest text-muted uppercase">
              {profile.location}
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-7 text-[2.1rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
        </Reveal>

        {/* Current positions, as a caption under the name. Read as one
            sentence by assistive tech, shown as an icon row to everyone else. */}
        <Reveal delay={110}>
          <div className="mt-5">
            <p className="sr-only">{profile.headline}</p>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-hidden="true">
              {currentRoles.map((role) => (
                <li key={role.id}>
                  <a
                    href={`#${role.id}`}
                    className="group inline-flex items-center gap-2 text-sm md:text-[0.95rem]"
                  >
                    <RoleIcon name={role.icon} style={{ color: role.color }} />
                    <span className="text-muted">
                      <span className="font-medium text-[var(--text)] transition-colors group-hover:text-brand">
                        {role.title}
                      </span>
                      <span className="text-faint"> · </span>
                      {role.org}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-muted md:text-lg">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10">
            <TrainScene />
          </div>
        </Reveal>

        {/* ---- Timetable ---- */}
        <Reveal delay={260}>
          <div className="board board-scan mt-5 overflow-hidden">
            <BoardHeader />

            <div className="px-4 py-3 md:px-6 md:py-4">
              <div
                className="mb-2 hidden grid-cols-[10rem_1fr_4rem_7rem] gap-4 border-b pb-2 font-mono text-[0.65rem] tracking-widest text-white/35 uppercase md:grid"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span>Period</span>
                <span>Organisation</span>
                <span>No.</span>
                <span className="text-right">Status</span>
              </div>

              <ul>
                {boardStops.map((stop) => (
                  <li key={stop.id}>
                    <a
                      href={`#${stop.id}`}
                      className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 rounded-md px-1 py-3 transition-colors hover:bg-white/[0.04] md:grid-cols-[10rem_1fr_4rem_7rem] md:items-center md:gap-y-0 md:py-2.5"
                    >
                      {/* On phones the name/role column spans both rows, so the
                          period and status stack flush against the right edge. */}
                      <span className="order-2 col-start-2 justify-self-end font-mono text-[0.7rem] text-white/40 md:order-1 md:col-start-auto md:justify-self-start md:text-xs">
                        {stop.period}
                      </span>

                      <span className="order-1 row-span-2 flex min-w-0 items-start gap-2.5 md:order-2 md:row-span-1">
                        <span
                          className="mt-[0.4rem] h-2 w-2 shrink-0 rounded-full"
                          style={{ background: stop.color }}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-white/90">
                            {stop.name}
                          </span>
                          {/* Wraps rather than truncates — a clipped degree
                              title tells the reader nothing. */}
                          <span className="mt-0.5 block font-mono text-[0.68rem] leading-snug text-white/40">
                            {stop.role}
                          </span>
                        </span>
                      </span>

                      <span className="order-4 hidden font-mono text-xs text-white/40 md:order-3 md:block">
                        {stop.number}
                      </span>

                      <span className="order-3 col-start-2 justify-self-end md:order-4 md:col-start-auto md:text-right">
                        <span
                          className="font-mono text-[0.68rem] tracking-wide uppercase"
                          style={{
                            color: stop.current ? "var(--board-ink)" : "rgba(255,255,255,0.35)",
                          }}
                        >
                          {stop.current ? "● Current" : "Completed"}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary metrics */}
            <div className="border-t px-4 py-3 md:px-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="flap font-mono text-lg font-semibold tracking-tight md:text-xl">
                      <CountUp value={stat.value} />
                    </dt>
                    <dd className="mt-0.5 text-[0.68rem] leading-snug text-white/40">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
              style={{ background: "var(--brand)", color: "var(--bg)" }}
            >
              View the timeline
              <TrainIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:text-brand"
              style={{ borderColor: "var(--line-strong)" }}
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Small line icon marking what kind of position a caption entry is. */
function RoleIcon({ name, style }: { name: "work" | "study"; style?: React.CSSProperties }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      style={style}
      aria-hidden="true"
    >
      {name === "work" ? (
        <>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
          <path d="M3 12.5h18" />
        </>
      ) : (
        <>
          <path d="M12 4 2.5 8.6 12 13.2l9.5-4.6L12 4Z" />
          <path d="M6.5 10.8v3.9c0 1.2 2.5 2.3 5.5 2.3s5.5-1.1 5.5-2.3v-3.9" />
        </>
      )}
    </svg>
  );
}

function BoardHeader() {
  const [clock, setClock] = useState<string | null>(null);

  // Rendered only after mount — a server-rendered time would never match.
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b px-4 py-3.5 md:px-6"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <SplitFlap
        items={highlights}
        labelClassName="shrink-0 font-mono text-[0.65rem] tracking-[0.2em] whitespace-nowrap text-white/35 uppercase md:min-w-[8.5rem] md:text-right"
        className="flap font-mono text-sm font-semibold sm:text-base"
      />
      <span className="font-mono text-xs text-white/35 tabular-nums">
        Helsinki · {clock ?? "--:--"}
      </span>
    </div>
  );
}
