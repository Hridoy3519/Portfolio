import { background } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TrainIcon from "./TrainIcon";

/**
 * The years before the first professional role: a short run of milestones,
 * the point where a field of study was chosen, and the principles carried since.
 */
export default function Background() {
  return (
    <SectionHeader
      id="background"
      eyebrow="Background · Before 2019"
      title="Early years"
      lead={background.lead}
    >
      <Milestones />

      <div className="mt-12 grid gap-4 md:grid-cols-[1.55fr_1fr]">
        <Reveal delay={60}>
          <Choice />
        </Reveal>

        <Reveal delay={120}>
          <div className="card h-full p-6">
            <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              What I value
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The principles that have stayed constant across every role since.
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {background.values.map((value) => (
                <li key={value} className="chip">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionHeader>
  );
}

/** Four milestones along a single stretch of track. */
function Milestones() {
  return (
    <div className="relative">
      {/* Horizontal track on wide screens */}
      <span
        className="track-ties absolute inset-x-0 top-[2px] hidden h-2 opacity-50 md:block"
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-0 top-[5px] hidden h-[2px] md:block"
        style={{ background: "var(--rail)" }}
        aria-hidden="true"
      />
      {/* Vertical track on narrow screens */}
      <span
        className="track-link absolute top-2 bottom-2 left-[5px] w-[2px] md:hidden"
        aria-hidden="true"
      />

      <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
        {background.milestones.map((milestone, i) => (
          <Reveal key={milestone.place} as="li" delay={i * 70} className="relative pl-7 md:pl-0">
            <span
              className="absolute top-0.5 left-0 h-3 w-3 rounded-full border-2 md:relative md:top-0 md:block"
              style={{ background: "var(--bg)", borderColor: "var(--brand)" }}
              aria-hidden="true"
            />
            <p className="font-mono text-[0.65rem] tracking-widest text-faint uppercase md:mt-5">
              {milestone.year}
            </p>
            <h3 className="mt-1 text-sm font-semibold tracking-tight">{milestone.place}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{milestone.text}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={280}>
        <a
          href="#leading-university"
          className="link-underline mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-brand"
        >
          Timeline continues at Leading University, 2019
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </a>
      </Reveal>
    </div>
  );
}

/**
 * Three possible fields of study diverging from one point. The two not taken
 * are drawn as unlaid, dashed track; the one taken is solid.
 */
function Choice() {
  const rows = [16, 50, 84] as const; // branch end heights, in % of the diagram
  const taken = background.choice.tracks.findIndex((t) => t.taken);

  return (
    <div className="card h-full p-6">
      <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
        Choosing a field · 2019
      </h3>

      {/* Taller on phones so three two-line labels never overlap */}
      <div className="relative mt-5 h-60 md:h-44">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-0 h-full w-[40%] md:w-[56%]"
          aria-hidden="true"
        >
          {/* Trunk into the junction */}
          <path
            d="M0 50 H26"
            pathLength={1}
            className="fork-draw"
            stroke="var(--brand)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />

          {background.choice.tracks.map((track, i) => {
            const y = rows[i];
            const d = y === 50 ? "M26 50 H100" : `M26 50 C 52 50, 52 ${y}, 74 ${y} H100`;
            return (
              <path
                key={track.label}
                d={d}
                fill="none"
                className={track.taken ? "fork-draw" : "fork-fade"}
                pathLength={track.taken ? 1 : undefined}
                stroke={track.taken ? "var(--brand)" : "var(--rail)"}
                strokeWidth="2"
                strokeDasharray={track.taken ? undefined : "4 5"}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          <circle
            cx="26"
            cy="50"
            r="1.6"
            fill="var(--bg-elev)"
            stroke="var(--brand)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Marker at the end of the chosen track */}
        <span
          className="fork-fade absolute left-[40%] grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-card md:left-[56%]"
          style={{
            top: `${rows[taken]}%`,
            background: "var(--bg-elev)",
            borderColor: "var(--brand)",
            color: "var(--brand)",
          }}
          aria-hidden="true"
        >
          <TrainIcon size={14} />
        </span>

        {/* Labels, aligned to each branch end */}
        <ol className="absolute inset-y-0 right-0 left-[45%] md:left-[60%]">
          {background.choice.tracks.map((track, i) => (
            <li
              key={track.label}
              className="absolute right-0 left-0 -translate-y-1/2 pl-2"
              style={{ top: `${rows[i]}%` }}
            >
              <p
                className="text-sm leading-tight font-semibold tracking-tight"
                style={{ color: track.taken ? "var(--brand)" : "var(--text-muted)" }}
              >
                {track.label}
                {track.taken ? (
                  <span className="ml-2 font-mono text-[0.6rem] font-normal tracking-widest uppercase">
                    Chosen
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-[0.72rem] leading-snug text-faint">{track.note}</p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        {background.choice.caption}
      </p>
    </div>
  );
}
