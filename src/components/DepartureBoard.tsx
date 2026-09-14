"use client";

import { useEffect, useState } from "react";
import { profile, stations, stats } from "@/content/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SplitFlap from "./SplitFlap";
import TrainIcon from "./TrainIcon";
import TrainScene from "./TrainScene";

const DESTINATIONS = ["Moulvibazar", "Sylhet", "Dhaka", "Helsinki"] as const;

export default function DepartureBoard() {
  return (
    <section id="departures" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <div
        className="glow-orb pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 font-mono text-[0.7rem] tracking-widest text-muted uppercase">
              <TrainIcon size={14} className="text-brand" />
              {profile.lineName}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 font-mono text-[0.7rem] text-muted">
              <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} />
              Service running · {profile.location}
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-7 text-[2.1rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={110}>
          <p className="mt-4 font-mono text-sm text-muted md:text-base">
            {profile.role}
            <span className="text-faint"> · </span>
            {profile.subRole}, University of Helsinki
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-muted md:text-lg">
            {profile.tagline}
          </p>
        </Reveal>

        {/* ---- The train, passing the platform ---- */}
        <Reveal delay={200}>
          <div className="mt-10">
            <TrainScene />
          </div>
        </Reveal>

        {/* ---- The board ---- */}
        <Reveal delay={260}>
          <div className="board board-scan mt-5 overflow-hidden">
            <BoardHeader />

            <div className="px-4 py-3 md:px-6 md:py-4">
              <div className="mb-2 hidden grid-cols-[10rem_1fr_4rem_7rem] gap-4 border-b pb-2 font-mono text-[0.65rem] tracking-widest text-white/35 uppercase md:grid" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span>Period</span>
                <span>Destination</span>
                <span>Plat.</span>
                <span className="text-right">Status</span>
              </div>

              <ul>
                {stations.map((station, i) => (
                  <li key={station.id}>
                    <a
                      href={`#${station.id}`}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 rounded-md px-1 py-2.5 transition-colors hover:bg-white/[0.04] md:grid-cols-[10rem_1fr_4rem_7rem] md:items-center md:py-2"
                    >
                      <span className="order-2 font-mono text-[0.7rem] text-white/40 md:order-1 md:text-xs">
                        {station.period}
                      </span>
                      <span className="order-1 flex min-w-0 items-center gap-2.5 md:order-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: station.color }}
                          aria-hidden="true"
                        />
                        <span className="truncate text-sm font-medium text-white/90">
                          {station.name}
                        </span>
                        <span className="hidden truncate font-mono text-xs text-white/35 sm:inline">
                          {station.operator}
                        </span>
                      </span>
                      <span className="order-4 hidden font-mono text-xs text-white/40 md:order-3 md:block">
                        {station.number}
                      </span>
                      <span className="order-3 justify-self-end md:order-4 md:text-right">
                        <span
                          className="font-mono text-[0.68rem] tracking-wide uppercase"
                          style={{ color: station.current ? "var(--board-ink)" : "rgba(255,255,255,0.35)" }}
                        >
                          {station.current ? "● Boarding" : i === stations.length - 1 ? "Arrived" : "Departed"}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service information ticker */}
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
              href="#driver"
              className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
              style={{ background: "var(--brand)", color: "var(--bg)" }}
            >
              Board the train
              <TrainIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#final-stop"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:text-brand"
              style={{ borderColor: "var(--line-strong)" }}
            >
              Skip to the ticket office
            </a>
          </div>
        </Reveal>
      </div>
    </section>
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
      className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3.5 md:px-6"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Wraps so the 11-tile flap row drops under the label on phones */}
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] whitespace-nowrap text-white/35 uppercase">
          Now departing
        </span>
        <SplitFlap words={DESTINATIONS} className="flap font-mono text-sm font-semibold sm:text-base md:text-lg" />
      </div>
      <span className="font-mono text-xs text-white/35 tabular-nums">
        {clock ?? "--:--"} · Platform 01
      </span>
    </div>
  );
}
