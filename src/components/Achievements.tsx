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
        {competitive.achievements.map((item, i) => {
          const body = (
            <>
              <h3 className="flex items-baseline justify-between gap-3 text-sm leading-snug font-medium">
                {item.title}
                {item.href ? (
                  <span className="font-mono text-xs text-faint transition-colors group-hover:text-brand">
                    ↗
                  </span>
                ) : null}
              </h3>
              <p className="mt-1.5 font-mono text-xs text-brand">{item.detail}</p>
            </>
          );
          return (
            <Reveal key={item.title} delay={i * 45}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card card-hover group block h-full p-5"
                >
                  {body}
                </a>
              ) : (
                <div className="card card-hover h-full p-5">{body}</div>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-faint">
          <span className="tracking-[0.18em] uppercase">Profiles</span>
          {competitive.profiles.map((profile) => (
            <a
              key={profile.label}
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-muted hover:text-brand"
            >
              {profile.label} ↗
            </a>
          ))}
        </p>
      </Reveal>

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
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline mt-1.5 inline-block font-mono text-xs text-muted hover:text-brand"
                    >
                      Certificate ↗
                    </a>
                  ) : null}
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
