import { roadmap } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/** Current and longer-term goals, drawn as track that hasn't been laid yet. */
export default function Roadmap() {
  return (
    <SectionHeader
      id="roadmap"
      eyebrow="Roadmap"
      title="What's next"
      lead="Projects and goals I'm actively working toward."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {roadmap.map((item, i) => (
          <Reveal key={item.code} delay={i * 70}>
            <article
              className="relative h-full rounded-[0.875rem] border-2 border-dashed p-6 transition-colors md:p-7"
              style={{ borderColor: "var(--line-strong)", background: "var(--bg-elev)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
                  {item.code}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] tracking-wide uppercase"
                  style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
                >
                  <span
                    className="live-dot h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--brand)" }}
                  />
                  {item.status}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>

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
          If any of this overlaps with what you&apos;re building,{" "}
          <a href="#contact" className="link-underline hover:text-brand">
            I&apos;d like to hear from you
          </a>
          .
        </p>
      </Reveal>
    </SectionHeader>
  );
}
