import { skills } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  return (
    <SectionHeader
      id="skills"
      eyebrow="Capabilities"
      title="Technical skills"
      lead="Tools and technologies I work with, grouped by layer of the stack."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 55}>
            <div className="card card-hover h-full p-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--brand)" }}
                  aria-hidden="true"
                />
                <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-brand uppercase">
                  {group.group}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionHeader>
  );
}
