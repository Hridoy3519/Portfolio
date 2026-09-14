import DepartureBoard from "@/components/DepartureBoard";
import Driver from "@/components/Driver";
import EngineRoom from "@/components/EngineRoom";
import Extensions from "@/components/Extensions";
import FinalStop from "@/components/FinalStop";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ObservationCar from "@/components/ObservationCar";
import Origin from "@/components/Origin";
import RailProgress from "@/components/RailProgress";
import Stations from "@/components/Stations";
import { profile, socials, stations } from "@/content/site";

/** Structured data so search engines and AI crawlers read the résumé correctly. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Helsinki", addressCountry: "FI" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Helsinki" },
    { "@type": "CollegeOrUniversity", name: "Leading University" },
  ],
  worksFor: {
    "@type": "Organization",
    name: stations.find((s) => s.current)?.operator ?? "IntexResearch Lab",
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
      <RailProgress />
      <main>
        <DepartureBoard />
        <Driver />
        <Origin />
        <Stations />
        <EngineRoom />
        <ObservationCar />
        <Extensions />
        <FinalStop />
      </main>
      <Footer />
    </>
  );
}
