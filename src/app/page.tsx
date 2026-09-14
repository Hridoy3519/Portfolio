import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Overview from "@/components/Overview";
import Roadmap from "@/components/Roadmap";
import RouteMap from "@/components/RouteMap";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import { profile, socials, stops } from "@/content/site";

/** Structured data so search engines and AI crawlers read the résumé correctly. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Helsinki", addressCountry: "FI" },
  alumniOf: stops
    .filter((s) => s.kind === "Education")
    .map((s) => ({ "@type": "CollegeOrUniversity", name: s.name })),
  worksFor: {
    "@type": "Organization",
    name: stops.find((s) => s.current)?.name ?? "IntexResearch Lab",
  },
  sameAs: socials.filter((s) => !s.href.startsWith("mailto:")).map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Nav />
      <RouteMap />
      <main>
        <Overview />
        <About />
        <Background />
        <Timeline />
        <Skills />
        <Achievements />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
