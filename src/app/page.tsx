import Achievements from "@/components/Achievements";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Overview from "@/components/Overview";
import Roadmap from "@/components/Roadmap";
import RouteMap from "@/components/RouteMap";
import Skills from "@/components/Skills";
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
        Experience first: a recruiter arriving from the board wants to know what
        I've shipped. Education follows as the qualifier, and the personal
        background sits after the credentials, for readers who want it.
      */}
      <main>
        <Overview />
        <Experience />
        <Education />
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
