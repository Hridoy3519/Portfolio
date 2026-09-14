import { type Station, stations } from "@/content/site";
import Reveal from "./Reveal";
import TrainIcon from "./TrainIcon";

export default function Stations() {
  return (
    <div className="shell py-4">
      {stations.map((station, i) => (
        <div key={station.id}>
          {station.leg ? <TrackLeg text={station.leg} /> : null}
          <StationCard station={station} isLast={i === stations.length - 1} />
        </div>
      ))}
    </div>
  );
}

/**
 * The stretch of track between two stops. A small train rides down it the
 * first time it scrolls into view, and a milepost notes the distance.
 */
function TrackLeg({ text }: { text: string }) {
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

function StationCard({ station, isLast }: { station: Station; isLast: boolean }) {
  return (
    <Reveal>
      <article
        id={station.id}
        className="card card-hover group relative scroll-mt-24 overflow-hidden"
        style={{ borderTop: `3px solid ${station.color}` }}
      >
        {/* Ambient light in the station's colour */}
        <span
          className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full opacity-[0.14] blur-3xl"
          style={{ background: station.color }}
          aria-hidden="true"
        />
        {/* Station code, painted large on the platform wall */}
        <span
          className="font-display pointer-events-none absolute -right-2 -bottom-8 leading-none font-bold tracking-tighter select-none opacity-[0.045] md:-bottom-10"
          style={{ color: station.color, fontSize: "clamp(7rem, 16vw, 11rem)" }}
          aria-hidden="true"
        >
          {station.code}
        </span>

        {/* Platform sign */}
        <header
          className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 md:px-8"
          style={{ background: "color-mix(in srgb, var(--bg-subtle) 72%, transparent)" }}
        >
          <div className="flex min-w-0 items-center gap-4">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg font-mono text-sm font-semibold transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"
              style={{ background: station.color, color: "#0a0b0f" }}
            >
              {station.code}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-faint uppercase">
                Stop {station.number} · {station.kind}
              </p>
              <h3 className="mt-0.5 truncate text-lg font-semibold tracking-tight md:text-xl">
                {station.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {station.current ? (
              <span
                className="live-dot h-1.5 w-1.5 rounded-full"
                style={{ background: station.color }}
                aria-hidden="true"
              />
            ) : null}
            <span className="font-mono text-xs whitespace-nowrap text-muted">
              {station.period}
            </span>
          </div>
        </header>

        {/* Platform edge — the safety stripe */}
        <span
          className="relative block h-[3px] w-full opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, ${station.color} 0 8px, transparent 8px 16px)`,
          }}
          aria-hidden="true"
        />

        <div className="relative px-6 py-7 md:px-8 md:py-8">
          <p className="text-sm">
            <span className="font-medium">{station.role}</span>
            <span className="text-faint"> · </span>
            <span style={{ color: station.color }}>{station.operator}</span>
            <span className="text-faint"> · {station.place}</span>
          </p>

          {/* Platform announcement */}
          <p
            className="mt-5 border-l-2 pl-4 text-sm leading-relaxed text-muted italic"
            style={{ borderColor: station.color }}
          >
            “{station.announcement}”
          </p>

          <ul className="mt-6 space-y-2.5">
            {station.highlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span
                  className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full"
                  style={{ background: station.color }}
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {station.facts?.length ? (
            <dl
              className={`mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line ${
                station.facts.length >= 4 ? "md:grid-cols-4" : ""
              }`}
              style={{ background: "var(--line)" }}
            >
              {station.facts.map((fact) => (
                <div key={fact.label} className="bg-elev px-4 py-3.5">
                  <dt className="text-[0.65rem] leading-snug text-faint">{fact.label}</dt>
                  <dd className="mt-1 font-mono text-sm font-medium" style={{ color: station.color }}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {station.tech.map((tech) => (
              <span key={tech} className="chip font-mono">
                {tech}
              </span>
            ))}
          </div>

          {station.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-4">
              {station.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-xs"
                  style={{ color: station.color }}
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
              End of the line so far —{" "}
              <a href="#extensions" className="link-underline hover:text-brand">
                proposed extensions further down the map
              </a>
            </p>
          </footer>
        )}
      </article>
    </Reveal>
  );
}
