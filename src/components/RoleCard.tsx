import Image from "next/image";
import type { Stop } from "@/content/site";
import Reveal from "./Reveal";

/** One role or degree. Shared by the Experience and Education sections. */
export default function RoleCard({ stop }: { stop: Stop }) {
  return (
    <Reveal>
      <article
        id={stop.id}
        className="card card-hover group relative scroll-mt-44 overflow-hidden"
        style={{ borderTop: `3px solid ${stop.color}` }}
      >
        {/* Ambient light in the stop's colour */}
        <span
          className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full opacity-[0.14] blur-3xl"
          style={{ background: stop.color }}
          aria-hidden="true"
        />
        {/* Location code, set large as a watermark */}
        <span
          className="font-display pointer-events-none absolute -right-2 -bottom-8 leading-none font-bold tracking-tighter opacity-[0.045] select-none md:-bottom-10"
          style={{ color: stop.color, fontSize: "clamp(7rem, 16vw, 11rem)" }}
          aria-hidden="true"
        >
          {stop.code}
        </span>

        <header
          className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 md:px-8"
          style={{ background: "color-mix(in srgb, var(--bg-subtle) 72%, transparent)" }}
        >
          <div className="flex min-w-0 items-center gap-4">
            {stop.logo ? (
              // Logos sit on white so each keeps its own brand colours in both
              // themes; the ring carries the stop's accent colour.
              <span
                className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"
                style={{ boxShadow: `0 0 0 2px ${stop.color}` }}
              >
                <Image
                  src={stop.logo}
                  alt={`${stop.name} logo`}
                  width={48}
                  height={48}
                  className={stop.logoFill ? "h-full w-full object-cover" : "h-9 w-9 object-contain"}
                />
              </span>
            ) : (
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg font-mono text-sm font-semibold transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"
                style={{ background: stop.color, color: "#0a0b0f" }}
              >
                {stop.code}
              </span>
            )}
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-faint uppercase">
                {stop.number} · {stop.kind}
              </p>
              <h3 className="mt-0.5 truncate text-lg font-semibold tracking-tight md:text-xl">
                {stop.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {stop.current ? (
              <span
                className="live-dot h-1.5 w-1.5 rounded-full"
                style={{ background: stop.color }}
                aria-hidden="true"
              />
            ) : null}
            <span className="font-mono text-xs whitespace-nowrap text-muted">{stop.period}</span>
          </div>
        </header>

        {/* Platform-edge stripe */}
        <span
          className="relative block h-[3px] w-full opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, ${stop.color} 0 8px, transparent 8px 16px)`,
          }}
          aria-hidden="true"
        />

        <div className="relative px-6 py-7 md:px-8 md:py-8">
          <p className="text-sm">
            <span className="font-medium" style={{ color: stop.color }}>
              {stop.role}
            </span>
            {stop.place ? <span className="text-faint"> · {stop.place}</span> : null}
          </p>

          <p
            className="mt-5 border-l-2 pl-4 text-sm leading-relaxed text-muted"
            style={{ borderColor: stop.color }}
          >
            {stop.summary}
          </p>

          <ul className="mt-6 space-y-2.5">
            {stop.highlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span
                  className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full"
                  style={{ background: stop.color }}
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {stop.facts?.length ? (
            <dl
              className={`mt-7 grid gap-px overflow-hidden rounded-lg border border-line ${
                stop.facts.length >= 4
                  ? "grid-cols-2 md:grid-cols-4"
                  : stop.facts.length === 3
                    ? "grid-cols-1 sm:grid-cols-3" // avoids a lone tile on a 2-column row
                    : "grid-cols-2"
              }`}
              style={{ background: "var(--line)" }}
            >
              {stop.facts.map((fact) => (
                <div key={fact.label} className="bg-elev px-4 py-3.5">
                  <dt className="text-[0.65rem] leading-snug text-faint">{fact.label}</dt>
                  <dd className="mt-1 font-mono text-sm font-medium" style={{ color: stop.color }}>
                    {fact.value}
                  </dd>
                  {fact.progress !== undefined ? (
                    <div
                      className="mt-2 h-1 overflow-hidden rounded-full"
                      style={{ background: "var(--line)" }}
                      role="progressbar"
                      aria-label={fact.label}
                      aria-valuenow={Math.round(fact.progress * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(Math.max(fact.progress, 0), 1) * 100}%`,
                          background: stop.color,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {stop.tech.map((tech) => (
              <span key={tech} className="chip font-mono">
                {tech}
              </span>
            ))}
          </div>

          {stop.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-4">
              {stop.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-xs"
                  style={{ color: stop.color }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}
