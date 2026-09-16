import { recommendations, recommendationsUrl } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Recommendations() {
  return (
    <SectionHeader
      id="recommendations"
      eyebrow="Recommendations"
      title="From people I've worked with"
      lead="Excerpts from LinkedIn recommendations by a manager, a client, a teammate and a fellow student."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((rec, i) => (
          <Reveal key={rec.name} delay={i * 70}>
            <figure className="card card-hover relative flex h-full flex-col p-6 md:p-7">
              <span
                className="font-display pointer-events-none absolute top-3 right-5 text-6xl leading-none select-none"
                style={{ color: "var(--brand)", opacity: 0.18 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="relative flex-1 text-[0.92rem] leading-relaxed text-muted">
                &ldquo;{rec.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {/* Initials rather than LinkedIn photos, which aren't ours to republish */}
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold"
                  style={{ background: "var(--bg-subtle)", color: "var(--brand)" }}
                  aria-hidden="true"
                >
                  {rec.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{rec.name}</span>
                  <span className="block text-xs leading-snug text-faint">{rec.title}</span>
                  <span className="mt-0.5 block font-mono text-[0.66rem] text-brand">
                    {rec.relationship} · {rec.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <a
          href={recommendationsUrl}
          target="_blank"
          rel="noreferrer"
          className="link-underline mt-7 inline-block font-mono text-xs text-muted hover:text-brand"
        >
          Read the full recommendations on LinkedIn ↗
        </a>
      </Reveal>
    </SectionHeader>
  );
}
