import { skills } from "@/content/site";
import Platform from "./Platform";
import Reveal from "./Reveal";

export default function EngineRoom() {
  return (
    <Platform
      id="engine-room"
      sign="Carriage 02 · Engine room"
      title="What powers the train"
      lead="Mind the noise — this is where the work actually gets done."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 55}>
            <div className="card card-hover h-full p-6">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} aria-hidden="true" />
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
    </Platform>
  );
}
