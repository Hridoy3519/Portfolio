import { extensions } from "@/content/site";
import Platform from "./Platform";
import Reveal from "./Reveal";

/** Stops that aren't on the map yet — drawn as unlaid, dashed track. */
export default function Extensions() {
  return (
    <Platform
      id="extensions"
      sign="Proposed extension · Not yet built"
      title="Where the line goes next"
      lead="Stops that aren't on the map yet — but the ground is being surveyed."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {extensions.map((ext, i) => (
          <Reveal key={ext.code} delay={i * 70}>
            <article
              className="relative h-full rounded-[0.875rem] border-2 border-dashed p-6 transition-colors md:p-7"
              style={{ borderColor: "var(--line-strong)", background: "var(--bg-elev)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
                  {ext.code}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] tracking-wide uppercase"
                  style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
                >
                  <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} />
                  {ext.status}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight">{ext.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{ext.text}</p>

              {/* Unlaid track running off the bottom of the card */}
              <span
                className="track-ties absolute inset-x-6 bottom-0 h-2 opacity-40 md:inset-x-7"
                aria-hidden="true"
              />
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <p className="mt-8 font-mono text-[0.68rem] leading-relaxed text-faint">
          Timetable subject to change. Suggestions for new stops are welcome at the{" "}
          <a href="#final-stop" className="link-underline hover:text-brand">
            ticket office
          </a>
          .
        </p>
      </Reveal>
    </Platform>
  );
}
