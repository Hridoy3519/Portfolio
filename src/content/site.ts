/**
 * Single source of truth for the whole journey.
 * The site is modelled as a rail line: the visitor boards at the departure
 * board and travels through stations, each one a chapter of the career.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: "Md Hridoy Chowdhury",
  shortName: "Hridoy",
  role: "Software Engineer",
  subRole: "Computer Science Master's Student",
  location: "Helsinki, Finland",
  email: "hridoy3519@gmail.com",
  phone: "+358 41 326 6280",
  // Replace with your deployed domain once live — used for SEO + OG tags.
  siteUrl: "https://hridoychowdhury.com",
  lineName: "The Hridoy Line",
  tagline:
    "A seven-year ride from a university lab in Sylhet to patient monitors in Helsinki — building software that reaches millions along the way.",
  driver: [
    "I'm a Computer Science Master's student at the University of Helsinki and a Software Engineer with production experience across mobile, backend, and low-level systems.",
    "At Inverse.AI I shipped hardware-accelerated media apps used by 10M+ people. At GE HealthCare I built software for patient monitoring devices, where correctness is a medical-grade requirement. Today I lead the Innovation & Development unit at IntexResearch Lab, turning ideas into shipped products.",
    "I care about clean architecture, measurable impact, and software that holds up under real users.",
  ],
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/hridoy3519", handle: "@hridoy3519" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hridoy3519", handle: "in/hridoy3519" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
] as const;

/** Headline numbers, shown on the departure board as "service information". */
export const stats = [
  { value: "10M+", label: "Users on shipped apps" },
  { value: "40%", label: "Revenue lift, one migration" },
  { value: "2000+", label: "Algorithm problems solved" },
  { value: "4", label: "Cities on the line" },
] as const;

/**
 * The branch line — the years before the main line begins at Stop 01.
 * Kept deliberately light: a few halts, one fork, and what came along for the ride.
 */
export type ForkTrack = { label: string; note: string; taken?: boolean };

export const origin: {
  lead: string;
  halts: { year: string; place: string; text: string }[];
  fork: { caption: string; tracks: ForkTrack[] };
  values: string[];
} = {
  lead:
    "Every line starts somewhere. Mine starts in the tea gardens of Moulvibazar — a few small halts before the main line.",
  halts: [
    {
      year: "1999",
      place: "Moulvibazar",
      text: "Born in Bangladesh's tea-estate district. Started asking questions early and never really stopped — lucky to be a kid in the Google era.",
    },
    {
      year: "School years",
      place: "English medium",
      text: "Maths, physics and science were the subjects that explained how the world works. They still are.",
    },
    {
      year: "2018",
      place: "Sylhet",
      text: "Moved to the city with friends for college. Integrity and trust became the rules I travel by; being good, jolly company became the habit.",
    },
    {
      year: "2019",
      place: "The fork",
      text: "Three tracks left the yard: astronomy, psychology, computer science. Took the third — the main line begins at the next stop.",
    },
  ],
  fork: {
    caption:
      "Three ways out of the yard in 2019. The other two never fully closed — I still look up, and still wonder why people do what they do.",
    tracks: [
      { label: "Astronomy", note: "The stars, and the size of everything" },
      { label: "Psychology", note: "Why people do what they do" },
      { label: "Computer Science", note: "Programming your imagination", taken: true },
    ],
  },
  /** What travels in the luggage rack on every leg. */
  values: [
    "Integrity",
    "Trust",
    "Curiosity",
    "Good company",
    "Sharing what I know",
    "Maths & physics",
  ],
};

export type Station = {
  id: string;
  code: string;
  number: string;
  name: string;
  operator: string;
  kind: "Education" | "Work";
  role: string;
  period: string;
  place: string;
  color: string;
  current?: boolean;
  /** One-line platform announcement for this stop. */
  announcement: string;
  highlights: string[];
  tech: string[];
  facts?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  /** Flavour text for the leg of track leading into this station. */
  leg?: string;
};

export const stations: Station[] = [
  {
    id: "sylhet",
    code: "SYL",
    number: "01",
    name: "Sylhet Central",
    operator: "Leading University",
    kind: "Education",
    role: "B.Sc. in Computer Science & Engineering",
    period: "Jan 2019 – Dec 2022",
    place: "Sylhet, Bangladesh",
    color: "#f5a524",
    announcement:
      "Where the main line begins — four years of fundamentals, contests, bootcamps and teaching, with wonderful friends and teachers.",
    highlights: [
      "Graduated with a CGPA of 3.74 / 4.00.",
      "Took up competitive programming, won university contests, and represented the university at national level (ICPC Dhaka Regional 2021).",
      "Teaching Assistant for the Data Structures & Algorithms course.",
      "Treasurer & Secretary of the IEEE Computer Society LU Student Branch (2021–2023) — launched several programming bootcamps.",
      "Named Best CS Student Volunteer by the IEEE Computer Society Bangladesh Chapter.",
      "Published a conference paper at IEEE GCAT 2022 while still an undergraduate.",
    ],
    tech: ["C++", "Algorithms", "Data Structures", "OOP"],
    facts: [
      { label: "CGPA", value: "3.74 / 4.00" },
      { label: "Role", value: "Teaching Assistant" },
    ],
    links: [
      {
        label: "Transcript",
        href: "https://drive.google.com/file/d/1JTczUEOMtIWvvRpfJSL53EfALXuAViZT/view?usp=sharing",
      },
    ],
  },
  {
    id: "dhaka",
    code: "DAC",
    number: "02",
    name: "Dhaka Junction",
    operator: "Inverse.AI",
    kind: "Work",
    role: "Software Engineer",
    period: "Nov 2022 – May 2025",
    place: "Dhaka, Bangladesh",
    color: "#fb7185",
    announcement:
      "The busiest stop on the line — four consumer apps, ten million people, and the first lessons in owning a product from the code to the business.",
    highlights: [
      "Built low-level C++ components for hardware-accelerated media processing with FFmpeg and Metal.",
      "Increased app revenue by 40% through a UIKit-to-SwiftUI migration and performance work.",
      "Integrated REST APIs, authentication, custom and Firebase Analytics, and owned production releases.",
      "Collaborated with backend, UI/UX, and QA teams; ran reviews and wrote unit tests and documentation.",
      "Learned to take ownership of a product end to end — and to think about its business side, not just its code.",
      "Recognised with a Certificate of Appreciation.",
    ],
    tech: ["C++", "Swift", "SwiftUI", "UIKit", "Kotlin", "KMM", "FFmpeg", "Metal", "Firebase", "Jira"],
    facts: [
      { label: "Photo Editor · iOS", value: "4.9★" },
      { label: "Video Compressor", value: "10M+ users" },
      { label: "Noise Reducer", value: "10M+ users" },
      { label: "Video Editor · Android", value: "100k+ users" },
    ],
    leg: "240 km west · a first job, great colleagues, a supportive CEO — and four shipped products",
  },
  {
    id: "helsinki",
    code: "HEL",
    number: "03",
    name: "Helsinki Central",
    operator: "University of Helsinki",
    kind: "Education",
    role: "M.Sc. in Computer Science",
    period: "Aug 2025 – July 2027",
    place: "Helsinki, Finland",
    color: "#a78bfa",
    announcement:
      "AI was moving fast and it was the right time to learn in that domain — a new country, a full scholarship, and a study track built around scalable systems.",
    highlights: [
      "Awarded a 100% scholarship on academic merit.",
      "Study track: Software Engineering — scalable systems, full-stack development, MLOps.",
      "Master's thesis interest: applying AI/ML across the stages of the SDLC.",
      "Currently holding an average grade of 4.83 / 5.00.",
      "First thing after landing: the Helsinki Pre-Incubators Builders Track — the startup side has always been there.",
    ],
    tech: ["Scalable Systems", "Full-stack", "MLOps", "Docker", "CI/CD"],
    facts: [
      { label: "Average grade", value: "4.83 / 5.00" },
      { label: "Scholarship", value: "100%, merit-based" },
    ],
    links: [
      {
        label: "Transcript",
        href: "https://drive.google.com/file/d/1-Zftq2OOjtt2Adsrwr-HYec5nGbXBtM1/view?usp=sharing",
      },
    ],
    leg: "6 400 km and one visa later · Dhaka → Helsinki",
  },
  {
    id: "intex",
    code: "IRL",
    number: "04",
    name: "Innovation Depot",
    operator: "IntexResearch Lab",
    kind: "Work",
    role: "Lead — Innovation & Development Unit",
    period: "Nov 2025 – Present",
    place: "Part-time",
    color: "#22d3ee",
    current: true,
    announcement: "Where the trains get built — leading a unit from zero to shipped products.",
    highlights: [
      "Leading the development unit, launching in-house mobile and web products and initiating client projects within months of formation.",
      "Designing system architecture and development workflows, and enforcing code quality standards across the team.",
      "Translating early-stage ideas into production-ready software products.",
      "Working to bridge the gap between academia and industry in Bangladesh.",
    ],
    tech: ["Flutter", "React", "TypeScript", "Node.js", "REST APIs", "MongoDB", "AI/ML integrations"],
    facts: [
      { label: "Scope", value: "Architecture & delivery" },
      { label: "Status", value: "Currently leading" },
    ],
    leg: "Same city, new track · studying by day, building a dev unit alongside it",
  },
  {
    id: "ge",
    code: "GEH",
    number: "05",
    name: "Vitals Terminal",
    operator: "GE HealthCare",
    kind: "Work",
    role: "Software Engineer Intern",
    period: "Summer 2026",
    place: "Helsinki, Finland",
    color: "#34d399",
    announcement: "Patient Care Solutions — software where a bug is not an inconvenience.",
    highlights: [
      "Developed backend and frontend software for patient monitors using C++, Python, and web technologies.",
      "Delivered robust software meeting medical-industry quality requirements.",
      "Owned implementation, code reviews, testing, and documentation in a multidisciplinary global Agile team.",
      "Learning how healthcare software is built inside a large company, alongside generous senior engineers.",
    ],
    tech: ["C++", "Python", "Web Technologies", "Git", "Linux", "Agile"],
    facts: [
      { label: "Domain", value: "Patient Monitoring" },
      { label: "Team", value: "Global, multidisciplinary" },
    ],
    leg: "One stop across town · from building products to building medical devices",
  },
];

/** Proposed extensions — stops that aren't on the map yet. */
export const extensions = [
  {
    code: "EXT-01",
    title: "A product of my own",
    status: "Under construction",
    text: "The founder itch has always been there. The first thing I did after landing in Finland was join the Helsinki Pre-Incubators Builders Track; right now I'm building out one of my own mobile app ideas.",
  },
  {
    code: "EXT-02",
    title: "A school in Bangladesh",
    status: "Planned",
    text: "The dream project: a school back home, to give back to the society I came from. I truly believe a quality education can change a person's life — and the students who pass through it would carry the legacy on.",
  },
] as const;

/** Engine room — the machinery that powers the line. */
export const skills = [
  {
    group: "Languages",
    items: ["C++", "Python", "TypeScript", "JavaScript", "Swift", "Kotlin", "Dart"],
  },
  {
    group: "Frontend & UI",
    items: ["React", "Next.js", "SwiftUI", "Flutter", "Tailwind CSS", "Material UI", "HTML/CSS"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL", "Firebase"],
  },
  {
    group: "Engineering",
    items: ["Data Structures & Algorithms", "OOP", "SOLID", "Clean Architecture", "Testing"],
  },
  {
    group: "Tools & Platforms",
    items: ["Linux", "Docker", "Git", "CI/CD", "Jira", "Firebase Analytics"],
  },
] as const;

export const competitive = {
  intro:
    "2000+ problems solved across judges — a decade-long habit of treating algorithms as a craft.",
  achievements: [
    { title: "IEEEXtreme 15.0", detail: "Country Rank 7 · Global Rank 390" },
    { title: "ICPC Dhaka Regional 2021", detail: "Participant" },
    { title: "LeetCode", detail: "Top 2.82% globally" },
    { title: "Codeforces", detail: "Specialist" },
    { title: "Bitfest Intra LU Contest 2022", detail: "Champion" },
    { title: "LU Intra Individual Contest 2022", detail: "Champion" },
  ],
} as const;

export const research = [
  {
    type: "Publication",
    title:
      "Look After: A Context-Aware Mobile Computing-Based Smart Agent to Manage Personal Events",
    venue: "IEEE GCAT 2022, Bangalore",
    href: "https://doi.org/10.1109/GCAT55367.2022.9971827",
    linkLabel: "DOI: 10.1109/GCAT55367.2022.9971827",
  },
  {
    type: "Thesis",
    title:
      "Automated IELTS Writing Evaluation and Handwriting Recognition Using CNN, RNN, and the GPT-3 API",
    venue: "Leading University, 2023",
  },
] as const;

export const certifications = [
  {
    title: "DevOps with Docker (MOOC)",
    detail: "Containerization fundamentals and deployment workflows",
  },
  { title: "Entrepreneurship Program", detail: "Helsinki Pre-Incubators · Builders Track" },
  { title: "Complete Web Development", detail: "Programming Hero" },
] as const;

export const languages = [
  { name: "English", level: "Proficient — IELTS 8.0 / 9.0 (CEFR C1)" },
  { name: "Finnish", level: "Finnish 1A, basic proficiency (4.0 / 5.0)" },
  { name: "Bangla", level: "Native" },
] as const;

/** Every stop on the line, in scroll order — drives the nav and the rail map. */
export const route = [
  { id: "departures", label: "Departures", short: "Dep." },
  { id: "driver", label: "Your driver", short: "Driver" },
  { id: "origin", label: "Branch line", short: "Org." },
  ...stations.map((s) => ({ id: s.id, label: s.name, short: s.code })),
  { id: "engine-room", label: "Engine room", short: "Eng." },
  { id: "observation-car", label: "Observation car", short: "Obs." },
  { id: "extensions", label: "Next stops", short: "Ext." },
  { id: "final-stop", label: "Final stop", short: "End" },
] as const;
