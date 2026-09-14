/**
 * Single source of truth for the site.
 * The layout borrows a rail-timetable structure — numbered stops, a route map,
 * a departure board — but every label reads as a professional portfolio.
 * Edit this file to update the content; no component changes needed.
 */

export const profile = {
  name: "Md Hridoy Chowdhury",
  shortName: "Hridoy",
  role: "Software Engineer",
  location: "Helsinki, Finland",
  email: "hridoy3519@gmail.com",
  phone: "+358 41 326 6280",
  // Replace with your deployed domain once live — used for SEO + OG tags.
  siteUrl: "https://hridoychowdhury.com",
  availability: "Open to 2027 graduate software engineering roles",
  /** Plain-text version of the headline, used for metadata and screen readers. */
  headline:
    "Software Engineer Intern at GE HealthCare and Computer Science Master's student at the University of Helsinki",
  /** Short summary under the name — who I am right now, in my own voice. */
  tagline:
    "Second year of my Master's, currently interning at GE HealthCare. I enjoy working on products people actually use, and being part of the team that builds them. Longer term, my ambition is to start something of my own.",
  about: [
    "Before Helsinki I spent two and a half years at Inverse.AI, working on consumer media apps — a photo editor, a video compressor, a noise reducer — used by more than ten million people between them. Most of that work was on the low-level side: C++ media pipelines built on FFmpeg and Metal, and a UIKit-to-SwiftUI migration that lifted revenue by 40%.",
    "At GE HealthCare I write software for patient monitors, where correctness is a regulatory requirement rather than a preference. It's a different discipline from consumer apps, and one I've learned a great deal from.",
    "Alongside my studies I lead the Innovation & Development unit at IntexResearch Lab, taking early-stage ideas through to shipped products. I care about clean architecture, measurable impact, and software that holds up under real users.",
  ],
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/Hridoy3519", handle: "@Hridoy3519" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hridoy3519", handle: "in/hridoy3519" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
] as const;

/** Headline figures, shown as summary metrics under the timetable. */
export const stats = [
  { value: "10M+", label: "Users reached by shipped apps" },
  { value: "40%", label: "Revenue increase from one migration" },
  { value: "2000+", label: "Algorithm problems solved" },
  { value: "4", label: "Cities lived and worked in" },
] as const;

/** Cities, cycled on the split-flap display. */
export const cities = ["Moulvibazar", "Sylhet", "Dhaka", "Helsinki"] as const;

/**
 * What I'm doing right now — the headline under my name.
 * Listed explicitly rather than derived, so the order and wording are
 * controlled here; `id` links each card to its entry in the timeline.
 */
export const currentRoles = [
  {
    id: "ge-healthcare",
    icon: "work",
    title: "Software Engineer Intern",
    org: "GE HealthCare",
    color: "#34d399",
  },
  {
    id: "university-of-helsinki",
    icon: "study",
    title: "M.Sc. Computer Science",
    org: "University of Helsinki",
    color: "#a78bfa",
  },
] as const;

/** Start and present location, summarised on the contact card. */
export const journey = {
  from: { code: "SYL", label: "Sylhet · 2019" },
  to: { code: "HEL", label: "Helsinki · now" },
  span: "7 YRS",
  years: "2019 — PRESENT",
} as const;

export type ForkTrack = { label: string; note: string; taken?: boolean };

/**
 * Background — the years before the first professional role.
 */
export const background: {
  lead: string;
  milestones: { year: string; place: string; text: string }[];
  choice: { caption: string; tracks: ForkTrack[] };
  values: string[];
} = {
  lead:
    "Before the timeline below: where I grew up, and how I arrived at computer science.",
  milestones: [
    {
      year: "1999",
      place: "Moulvibazar, Bangladesh",
      text: "Born in Bangladesh's tea-estate district. A curious child who asked a great many questions — and was fortunate to grow up when the internet could answer them.",
    },
    {
      year: "School years",
      place: "English-medium education",
      text: "Mathematics, physics and the sciences were the subjects that explained how the world works. They still shape how I approach a problem.",
    },
    {
      year: "2018",
      place: "Sylhet",
      text: "Moved to Sylhet for college. Integrity and trust became the principles I work by, alongside a habit of helping the people around me.",
    },
    {
      year: "2019",
      place: "Choosing a field",
      text: "Three subjects were genuinely in contention: astronomy, psychology and computer science. I chose the third, and the professional timeline starts there.",
    },
  ],
  choice: {
    caption:
      "Three options in 2019. The other two never entirely closed — I still follow astronomy, and still find human behaviour worth understanding.",
    tracks: [
      { label: "Astronomy", note: "The scale of the universe" },
      { label: "Psychology", note: "Why people behave as they do" },
      { label: "Computer Science", note: "Building what you can imagine", taken: true },
    ],
  },
  values: [
    "Integrity",
    "Trust",
    "Curiosity",
    "Collaboration",
    "Knowledge sharing",
    "Mathematics & physics",
  ],
};

export type Stop = {
  id: string;
  /** Short location code, shown on the badge and route map. */
  code: string;
  number: string;
  /** The organisation — this is the card's headline. */
  name: string;
  kind: "Education" | "Experience";
  role: string;
  period: string;
  place: string;
  color: string;
  current?: boolean;
  /** Factual one-line summary of the role. */
  summary: string;
  highlights: string[];
  tech: string[];
  facts?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  /** Note on the transition into this role. */
  transition?: string;
};

export const stops: Stop[] = [
  {
    id: "leading-university",
    code: "SYL",
    number: "01",
    name: "Leading University",
    kind: "Education",
    role: "B.Sc. in Computer Science & Engineering",
    period: "Jan 2019 – Dec 2022",
    place: "Sylhet, Bangladesh",
    color: "#f5a524",
    summary:
      "Four years of computer-science fundamentals, competitive programming, teaching and student leadership.",
    highlights: [
      "Graduated with a CGPA of 3.74 / 4.00.",
      "Took up competitive programming, won university contests and represented the university at national level (ICPC Dhaka Regional 2021).",
      "Teaching Assistant for the Data Structures & Algorithms course.",
      "Treasurer and Secretary of the IEEE Computer Society LU Student Branch (2021–2023), launching several programming bootcamps.",
      "Named Best CS Student Volunteer by the IEEE Computer Society Bangladesh Chapter.",
      "Published a conference paper at IEEE GCAT 2022 as an undergraduate.",
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
    id: "inverse-ai",
    code: "DAC",
    number: "02",
    name: "Inverse.AI",
    kind: "Experience",
    role: "Software Engineer",
    period: "Nov 2022 – May 2025",
    place: "Dhaka, Bangladesh",
    color: "#fb7185",
    summary:
      "Four consumer media applications across iOS and Android, with a combined reach of more than ten million users.",
    highlights: [
      "Built low-level C++ components for hardware-accelerated media processing with FFmpeg and Metal.",
      "Increased app revenue by 40% through a UIKit-to-SwiftUI migration and performance work.",
      "Integrated REST APIs, authentication, custom and Firebase Analytics, and owned production releases.",
      "Worked alongside backend, UI/UX and QA teams; ran code reviews and wrote unit tests and documentation.",
      "Learned to own a product end to end, and to weigh its business impact alongside its implementation.",
      "Recognised with a Certificate of Appreciation.",
    ],
    tech: ["C++", "Swift", "SwiftUI", "UIKit", "Kotlin", "KMM", "FFmpeg", "Metal", "Firebase", "Jira"],
    facts: [
      { label: "Photo Editor · iOS", value: "4.9★" },
      { label: "Video Compressor", value: "10M+ users" },
      { label: "Noise Reducer", value: "10M+ users" },
      { label: "Video Editor · Android", value: "100k+ users" },
    ],
    transition: "Sylhet → Dhaka · 2022 — from graduation into a first full-time engineering role",
  },
  {
    id: "university-of-helsinki",
    code: "HEL",
    number: "03",
    name: "University of Helsinki",
    kind: "Education",
    role: "M.Sc. in Computer Science",
    period: "Aug 2025 – July 2027",
    place: "Helsinki, Finland",
    color: "#a78bfa",
    current: true,
    summary:
      "A fully funded master's on the Software Engineering track — scalable systems, full-stack development and MLOps.",
    highlights: [
      "Awarded a 100% scholarship on academic merit.",
      "Study track: Software Engineering — scalable systems, full-stack development, MLOps.",
      "Master's thesis interest: applying AI/ML across the stages of the software development lifecycle.",
      "Currently holding an average grade of 4.83 / 5.00.",
      "Joined the Helsinki Pre-Incubators Builders Track shortly after arriving, to develop my own product ideas.",
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
    transition: "Dhaka → Helsinki · 2025 — relocating to Finland on a full scholarship",
  },
  {
    id: "intexresearch-lab",
    code: "IRL",
    number: "04",
    name: "IntexResearch Lab",
    kind: "Experience",
    role: "Lead — Innovation & Development Unit",
    period: "Nov 2025 – Present",
    place: "Helsinki, Finland · Part-time",
    color: "#22d3ee",
    current: true,
    summary:
      "Leading a new development unit from formation through to its first shipped in-house and client products.",
    highlights: [
      "Lead the development unit, launching in-house mobile and web products and initiating client projects within months of its formation.",
      "Design system architecture and development workflows, and set code quality standards across the team.",
      "Translate early-stage ideas into production-ready software products.",
      "Work to bridge the gap between academia and industry in Bangladesh.",
    ],
    tech: ["Flutter", "React", "TypeScript", "Node.js", "REST APIs", "MongoDB", "AI/ML integrations"],
    facts: [
      { label: "Scope", value: "Architecture & delivery" },
      { label: "Status", value: "Current role" },
    ],
    transition: "Helsinki · 2025 — leading a development unit alongside the master's",
  },
  {
    id: "ge-healthcare",
    code: "GEH",
    number: "05",
    name: "GE HealthCare",
    kind: "Experience",
    role: "Software Engineer Intern",
    period: "Summer 2026 – Present",
    place: "Helsinki, Finland",
    color: "#34d399",
    current: true,
    summary:
      "Patient Care Solutions — backend and frontend software for patient monitoring devices, built to medical-industry quality standards.",
    highlights: [
      "Developing backend and frontend software for patient monitors using C++, Python and web technologies.",
      "Delivering software that meets medical-industry quality and reliability requirements.",
      "Owning implementation, code reviews, testing and documentation within a multidisciplinary global Agile team.",
      "Learning first-hand how healthcare software is built and validated inside a large organisation.",
    ],
    tech: ["C++", "Python", "Web Technologies", "Git", "Linux", "Agile"],
    facts: [
      { label: "Domain", value: "Patient Monitoring" },
      { label: "Team", value: "Global, multidisciplinary" },
    ],
    transition: "Helsinki · 2026 — from consumer products into medical devices",
  },
];

/**
 * Newest first, for the summary board — a reader scanning it wants the
 * current roles at the top. The timeline itself stays in `stops` order,
 * since it reads forwards through the transitions between roles.
 */
export const stopsByRecency = [...stops].reverse();

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
    "More than 2,000 problems solved across competitive programming judges, alongside national and international contest results.",
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

/** Current and longer-term goals. */
export const roadmap = [
  {
    code: "01",
    title: "Building a product of my own",
    status: "In progress",
    text: "The entrepreneurial side has always been there. The first thing I did after arriving in Finland was join the Helsinki Pre-Incubators Builders Track, and I'm currently developing one of my own mobile application ideas.",
  },
  {
    code: "02",
    title: "Founding a school in Bangladesh",
    status: "Long term",
    text: "My long-term goal is to establish a school back home, to give back to the community I came from. I believe quality education changes the course of a person's life, and its students would carry that forward.",
  },
] as const;

/** Every section in scroll order — drives the navigation and the route map. */
export const route = [
  { id: "top", label: "Overview", short: "00" },
  { id: "about", label: "About", short: "01" },
  { id: "background", label: "Background", short: "02" },
  ...stops.map((s) => ({ id: s.id, label: s.name, short: s.code })),
  { id: "skills", label: "Technical skills", short: "03" },
  { id: "achievements", label: "Achievements", short: "04" },
  { id: "roadmap", label: "What's next", short: "05" },
  { id: "contact", label: "Contact", short: "06" },
] as const;
