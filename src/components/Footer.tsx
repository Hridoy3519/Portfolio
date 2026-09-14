import { profile, socials } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-[0.68rem] text-faint">
          © {new Date().getFullYear()} {profile.name} · {profile.lineName}
        </p>
        <ul className="flex items-center gap-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="link-underline font-mono text-[0.68rem] text-faint hover:text-brand"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
