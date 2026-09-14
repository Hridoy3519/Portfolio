import { milepost } from "@/content/site";
import Reveal from "./Reveal";

/**
 * A lineside milepost standing between the two degrees, marking how far apart
 * they are. Static by design — the Experience consist is the section that
 * earns an interactive element; this one just states a fact.
 */
export default function Milepost() {
  return (
    <Reveal>
      <div className="flex flex-col items-center py-8 md:py-10">
        {/* Post above the plate */}
        <span
          className="h-7 w-[2px] md:h-9"
          style={{ background: "var(--rail)" }}
          aria-hidden="true"
        />

        <div
          className="rounded-md border px-4 py-2 text-center shadow-card"
          style={{ borderColor: "var(--line-strong)", background: "var(--bg-elev)" }}
        >
          <span className="sr-only">{milepost.screenReaderText}</span>
          <p
            className="font-mono text-lg leading-none font-semibold tracking-tight"
            style={{ color: "var(--brand)" }}
            aria-hidden="true"
          >
            {milepost.distance}
          </p>
          <p
            className="mt-1 font-mono text-[0.55rem] tracking-[0.22em] text-faint uppercase"
            aria-hidden="true"
          >
            {milepost.unit}
          </p>
        </div>

        {/* Post below, planted in the ground */}
        <span
          className="h-7 w-[2px] md:h-9"
          style={{ background: "var(--rail)" }}
          aria-hidden="true"
        />
        <span
          className="h-[2px] w-6 rounded-full"
          style={{ background: "var(--rail)" }}
          aria-hidden="true"
        />

        <p className="mt-4 text-center font-mono text-[0.66rem] leading-relaxed text-faint">
          {milepost.caption}
        </p>
      </div>
    </Reveal>
  );
}
