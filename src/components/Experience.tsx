import { experience } from "@/content/site";
import Consist from "./Consist";
import Reveal from "./Reveal";
import RoleCard from "./RoleCard";

export default function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            Experience
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Where I&apos;ve worked
          </h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            Three roles across medical devices, early-stage product development and
            consumer software at scale.
          </p>
        </div>
      </Reveal>

      {/* Rides along as you read — sticky on wider screens only, since it would
          eat too much of a phone viewport. Deliberately not wrapped in Reveal:
          that wrapper boxes the element tightly, leaving sticky no room to
          travel within the section. */}
      <div className="mb-8 md:sticky md:top-[4.75rem] md:z-30 md:-mx-2 md:rounded-lg md:bg-[var(--bg)]/85 md:px-2 md:py-2 md:backdrop-blur">
        <Consist stops={experience} />
      </div>

      <div className="space-y-5">
        {experience.map((stop) => (
          <RoleCard key={stop.id} stop={stop} />
        ))}
      </div>
    </section>
  );
}
