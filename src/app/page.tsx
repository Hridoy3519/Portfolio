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
  worksFor: stops
    .filter((s) => s.current && s.kind === "Experience")
    .map((s) => ({ "@type": "Organization", name: s.name })),
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
      {/*
        Evidence first: a recruiter arriving from the board wants to know what
        I've shipped, so the timeline follows it directly. The personal
        background sits after the credentials, for readers who want it.
      */}
      <main>
        <Overview />
        <Timeline />
        <Skills />
        <Achievements />
        <Background />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
