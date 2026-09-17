"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  boardStops,
  currentRoles,
  highlights,
  profile,
  serviceInfo,
  socials,
} from "@/content/site";
import Reveal from "./Reveal";
import SplitFlap from "./SplitFlap";
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
                className="mb-2 hidden grid-cols-[10rem_1fr_7rem] gap-4 border-b pb-2 font-mono text-[0.65rem] tracking-widest text-white/35 uppercase md:grid"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span>Period</span>
                <span>Organisation</span>
                <span className="text-right">Status</span>
              </div>

              <ul>
                {boardStops.map((stop) => (
                  <li key={stop.id}>
                    <a
                      href={`#${stop.id}`}
                      className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 rounded-md px-1 py-3 transition-colors hover:bg-white/[0.04] md:grid-cols-[10rem_1fr_7rem] md:items-center md:gap-y-0 md:py-2.5"
                    >
                      {/* On phones the name/role column spans both rows, so the
                          period and status stack flush against the right edge. */}
                      <span className="order-2 col-start-2 justify-self-end font-mono text-[0.7rem] text-white/40 md:order-1 md:col-start-auto md:justify-self-start md:text-xs">
                        {stop.period}
                      </span>

                      <span className="order-1 row-span-2 flex min-w-0 items-start gap-2.5 md:order-2 md:row-span-1">
                        {stop.logo ? (
                          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md bg-white">
                            <Image
                              src={stop.logo}
                              alt=""
                              width={28}
                              height={28}
                              className={stop.logoFill ? "h-full w-full object-cover" : "h-5 w-5 object-contain"}
                            />
                          </span>
                        ) : (
                          <span
                            className="mt-[0.4rem] h-2 w-2 shrink-0 rounded-full"
                            style={{ background: stop.color }}
                            aria-hidden="true"
                          />
                        )}
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

                      <span className="order-3 col-start-2 justify-self-end md:order-3 md:col-start-auto md:text-right">
                        <span
                          className="font-mono text-[0.68rem] tracking-wide uppercase"
                          style={{
                            color: stop.current ? "var(--board-live)" : "rgba(255,255,255,0.35)",
                            textShadow: stop.current ? "0 0 12px rgba(74, 222, 128, 0.35)" : undefined,
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

            {/* Service information */}
            <div
              className="border-t px-4 py-4 md:px-6"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
                {serviceInfo.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-[0.6rem] tracking-[0.18em] text-white/30 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.8rem] leading-snug text-white/75">
                      {item.href ? (
                        <a
                          href={item.href}
                          download={item.download}
                          target={item.download ? undefined : "_blank"}
                          rel="noreferrer"
                          className="link-underline transition-colors"
                          style={{ color: "var(--board-ink)" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Direct contact, right where a recruiter decides to reach out */}
        <Reveal delay={320}>
          <ul className="mt-8 flex flex-wrap items-center gap-2.5">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition hover:border-[var(--brand)] hover:text-brand"
                  style={{ borderColor: "var(--line-strong)", background: "var(--bg-elev)" }}
                >
                  <ContactIcon name={link.icon} />
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

type ContactIconName = "linkedin" | "github" | "email" | "phone";

const contactLinks: {
  label: string;
  href: string;
  icon: ContactIconName;
  external?: boolean;
}[] = [
  {
    label: "LinkedIn",
    href: socials.find((s) => s.label === "LinkedIn")!.href,
    icon: "linkedin",
    external: true,
  },
  {
    label: "GitHub",
    href: socials.find((s) => s.label === "GitHub")!.href,
    icon: "github",
    external: true,
  },
  { label: profile.email, href: `mailto:${profile.email}`, icon: "email" },
  // tel: needs the number without spaces to dial reliably
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: "phone" },
];

function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === "linkedin") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }
  if (name === "github") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
        <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
      </svg>
    );
  }
  if (name === "email") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
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
