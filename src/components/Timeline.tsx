import { type Stop, stops } from "@/content/site";
import Reveal from "./Reveal";
import TrainIcon from "./TrainIcon";

export default function Timeline() {
  return (
    <div id="timeline" className="shell scroll-mt-24 py-4">
      {stops.map((stop, i) => (
        <div key={stop.id}>
          {stop.transition ? <Transition text={stop.transition} /> : null}
          <StopCard stop={stop} isLast={i === stops.length - 1} />
        </div>
      ))}
    </div>
  );
}

/**
 * The move from one role to the next. A marker travels down the track the
 * first time it scrolls into view, and a note records the transition.
 */
function Transition({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="flex flex-col items-center py-6 md:py-8">
        <div className="relative h-36 w-6 md:h-44" aria-hidden="true">
          <span className="absolute inset-y-0 left-[5px] w-[2px]" style={{ background: "var(--rail)" }} />
          <span className="absolute inset-y-0 right-[5px] w-[2px]" style={{ background: "var(--rail)" }} />
          <span className="track-ties-v absolute inset-0 opacity-70" />

          <span
            className="leg-train grid h-7 w-7 place-items-center rounded-full border shadow-card"
            style={{
              background: "var(--bg-elev)",
              borderColor: "var(--brand)",
              color: "var(--brand)",
            }}
          >
            <TrainIcon size={14} />
          </span>
        </div>

        <p className="mt-4 max-w-md rounded-md border border-line bg-elev px-3 py-1.5 text-center font-mono text-[0.66rem] leading-relaxed text-faint">
          {text}
        </p>
      </div>
    </Reveal>
  );
}

function StopCard({ stop, isLast }: { stop: Stop; isLast: boolean }) {
  return (
    <Reveal>
      <article
        id={stop.id}
        className="card card-hover group relative scroll-mt-24 overflow-hidden"
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
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg font-mono text-sm font-semibold transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"
              style={{ background: stop.color, color: "#0a0b0f" }}
            >
              {stop.code}
            </span>
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
            <span className="text-faint"> · {stop.place}</span>
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
              className={`mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line ${
                stop.facts.length >= 4 ? "md:grid-cols-4" : ""
              }`}
              style={{ background: "var(--line)" }}
            >
              {stop.facts.map((fact) => (
                <div key={fact.label} className="bg-elev px-4 py-3.5">
                  <dt className="text-[0.65rem] leading-snug text-faint">{fact.label}</dt>
                  <dd className="mt-1 font-mono text-sm font-medium" style={{ color: stop.color }}>
                    {fact.value}
                  </dd>
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

        {!isLast ? null : (
          <footer
            className="relative border-t border-line px-6 py-3.5 md:px-8"
            style={{ background: "var(--bg-subtle)" }}
          >
            <p className="font-mono text-[0.65rem] tracking-wide text-faint uppercase">
              Most recent role —{" "}
              <a href="#roadmap" className="link-underline hover:text-brand">
                see what&apos;s next below
              </a>
            </p>
          </footer>
        )}
      </article>
    </Reveal>
  );
}
