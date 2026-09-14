import { certifications, competitive, languages } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Achievements() {
  return (
    <SectionHeader
      id="achievements"
      eyebrow="Recognition"
      title="Achievements"
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
        </div>

        <div>
          <Reveal>
            <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              Languages
            </h3>
          </Reveal>
          <ul className="mt-5 space-y-4">
            {languages.map((lang, i) => (
              <Reveal key={lang.name} delay={i * 55} as="li">
                <div className="border-l-2 pl-4" style={{ borderColor: "var(--line-strong)" }}>
                  <h4 className="text-sm font-medium">{lang.name}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-faint">{lang.level}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </SectionHeader>
  );
}
