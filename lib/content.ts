/**
 * Central content source for the Code2Conquer landing experience.
 * Code2Conquer is a brand-new, student-led STEM initiative — so this copy is
 * honest and forward-looking (what we're building), not inflated with metrics
 * or history we don't have yet.
 */

export const site = {
  name: "Code2Conquer",
  tagline: "Empowering the Next Generation of Innovators",
  description:
    "A brand-new, student-led STEM initiative teaching coding, AI, robotics, and web development — and growing the next generation of technical leaders.",
  email: "hello@code2conquer.org", // TODO: your real contact email
  socials: {
    instagram: "https://instagram.com/", // TODO
    linkedin: "https://linkedin.com/", // TODO
    github: "https://github.com/Kalyankaki/Code2Conquer",
  },
};

export const nav = [
  { label: "Mission", href: "#mission" },
  { label: "Programs", href: "#pillars" },
  { label: "Why now", href: "#why" },
  { label: "Roadmap", href: "#timeline" },
  { label: "Join", href: "#cta" },
];

export const pillars = [
  {
    id: "coding",
    title: "Coding",
    tag: "01",
    blurb:
      "From first line to full-stack. Learn to build real software with modern languages and tools.",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    tag: "02",
    blurb:
      "Demystifying machine learning. Hands-on projects that turn curiosity about AI into working models.",
  },
  {
    id: "robotics",
    title: "Robotics",
    tag: "03",
    blurb:
      "Where code meets the physical world. Design, build, and program robots that move and sense.",
  },
  {
    id: "leadership",
    title: "Leadership",
    tag: "04",
    blurb:
      "Technical skill needs vision. Grow as a leader who launches chapters and mentors others.",
  },
];

/**
 * Honest founding-stage facts (no fabricated metrics).
 * `display` renders as static text; `value` count-ups from zero.
 */
export const stats: {
  display?: string;
  value?: number;
  suffix?: string;
  label: string;
}[] = [
  { display: "2026", label: "Founded — we're just getting started" },
  { value: 4, suffix: "", label: "Core program tracks" },
  { value: 100, suffix: "%", label: "Student-led, student-built" },
  { display: "Free", label: "No cost to join, open to all levels" },
];

export const programs = [
  {
    title: "Intro to Code",
    level: "Beginner",
    blurb: "A friendly on-ramp into programming fundamentals and web basics.",
  },
  {
    title: "AI Lab",
    level: "Intermediate",
    blurb: "Build and train real models — vision, language, and prediction.",
  },
  {
    title: "Robotics Studio",
    level: "Intermediate",
    blurb: "Hardware + firmware projects that end in a live showcase.",
  },
  {
    title: "Web Guild",
    level: "All levels",
    blurb: "Ship production websites for real causes and clubs.",
  },
  {
    title: "Founders Track",
    level: "Advanced",
    blurb: "Help launch and lead a Code2Conquer chapter at your school.",
  },
  {
    title: "Hack Nights",
    level: "All levels",
    blurb: "Build sprints where a rough idea becomes a working demo.",
  },
];

/** Forward-looking roadmap — clearly goals, not achievements. */
export const milestones = [
  {
    year: "Now",
    title: "Launching",
    blurb: "Assembling the founding team and shaping our first programs.",
  },
  {
    year: "Next",
    title: "First Workshops",
    blurb: "Hands-on sessions in coding, AI, and robotics — open to everyone.",
  },
  {
    year: "Soon",
    title: "First Chapter",
    blurb: "Opening membership and running our first student-led cohort.",
  },
  {
    year: "Vision",
    title: "A Network",
    blurb: "Chapters across schools — a national student STEM community.",
  },
];

/** Why join now — honest value for founding members (no fake testimonials). */
export const reasons = [
  {
    title: "Get in on the ground floor",
    blurb:
      "We're brand new. Founding members shape what Code2Conquer becomes — the programs, the culture, all of it.",
  },
  {
    title: "Learn by building",
    blurb:
      "Real projects from day one, not just theory. You leave with things you actually made.",
  },
  {
    title: "Lead, don't just attend",
    blurb:
      "Start a chapter, mentor a peer, own a track. There's room to lead because we're just getting started.",
  },
];
