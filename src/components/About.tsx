import { languages, profile, socials } from "@/content/site";
import Reveal from "./Reveal";
import Scenery from "./Scenery";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <SectionHeader
      id="about"
      eyebrow="Profile"
      title="About me"
      lead="A short introduction before the timeline."
    >
      <Reveal>
        <Scenery />
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.55fr_1fr] md:gap-14">
        <Reveal delay={80}>
          <div className="space-y-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="card p-6">
            <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              At a glance
            </h3>
            <dl className="mt-5 space-y-4 text-sm">
              <Row label="Based in" value={profile.location} />
              <Row label="Focus" value="Full-stack · Systems · Mobile" />
              <Row label="Open to" value="Graduate & new-grad SWE roles" />
            </dl>

            <h3 className="mt-8 font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
              Languages
            </h3>
            <dl className="mt-5 space-y-4 text-sm">
              {languages.map((lang) => (
                <Row key={lang.name} label={lang.name} value={lang.level} />
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="link-underline font-mono text-xs text-muted hover:text-brand"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionHeader>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-0.5 leading-snug">{value}</dd>
    </div>
  );
}
