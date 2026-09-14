import { certifications, competitive, languages, research } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Achievements() {
  return (
    <SectionHeader
      id="achievements"
      eyebrow="Recognition"
      title="Achievements & research"
      lead={competitive.intro}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {competitive.achievements.map((item, i) => (
          <Reveal key={item.title} delay={i * 45}>
            <div className="card card-hover h-full p-5">
              <h3 className="text-sm leading-snug font-medium">{item.title}</h3>
              <p className="mt-1.5 font-mono text-xs text-brand">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Reveal>
            <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              Publication & thesis
            </h3>
          </Reveal>
          <ul className="mt-5 space-y-6">
            {research.map((item, i) => (
              <Reveal key={item.title} delay={i * 55} as="li">
                <span className="chip font-mono">{item.type}</span>
                <h4 className="mt-2.5 text-sm leading-relaxed font-medium">{item.title}</h4>
                <p className="mt-1 text-xs text-faint">{item.venue}</p>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline mt-1.5 inline-block font-mono text-xs text-muted hover:text-brand"
                  >
                    {item.linkLabel} ↗
                  </a>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <Reveal>
            <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              Certifications & programs
            </h3>
          </Reveal>
          <ul className="mt-5 space-y-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 55} as="li">
                <div className="border-l-2 pl-4" style={{ borderColor: "var(--line-strong)" }}>
                  <h4 className="text-sm font-medium">{cert.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-faint">{cert.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={60}>
            <h3 className="mt-10 font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              Languages
            </h3>
          </Reveal>
          <dl className="mt-5 space-y-3">
            {languages.map((lang, i) => (
              <Reveal key={lang.name} delay={i * 55}>
                <dt className="text-sm font-medium">{lang.name}</dt>
                <dd className="mt-0.5 text-xs leading-relaxed text-faint">{lang.level}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </SectionHeader>
  );
}
