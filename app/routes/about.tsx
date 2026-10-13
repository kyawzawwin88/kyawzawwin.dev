import type { MetaFunction } from "@remix-run/node";
import { SiteShell } from "~/components/SiteShell";

export const meta: MetaFunction = () => [
  { title: "About · Kyaw Zaw Win" },
  {
    name: "description",
    content:
      "I design and build production software using AI-first engineering, combining 15+ years of software experience with agentic development, cloud architecture, and automation.",
  },
];

const PRACTICE = [
  "Software Architecture",
  "AI / Agent Engineering",
  "Backend Systems",
  "Cloud Architecture",
  "Rapid Product Development",
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer, Hatcher Plus Pte Ltd",
    detail: "FAAST, a funding building and management platform for fund managers and family offices.",
  },
  {
    role: "Senior Software Engineer, Sleek Tech Singapore",
    detail: "Financial sector, payment, and ecommerce systems.",
  },
  {
    role: "Founder and Tech Lead, JarPlay Technology",
    detail:
      "From 2017 to 2022. Led a team of 11 building streaming, financial services, inventory, and e-commerce systems for more than 150,000 users, with mobile apps and JAMStack sites on a multi-cloud microservices architecture.",
  },
  {
    role: "Myanmar Information Technology Pte Ltd, from 2007",
    detail:
      "Joined as a junior software engineer. Worked on government projects, outsourced work, HRM, CRM, CMS, and a smart home system using X10 and UPnP. Later senior software engineer, leading a small team.",
  },
  {
    role: "Computer Science, London Metropolitan University, 2009",
    detail: "Awarded in the United Kingdom.",
  },
];

export default function About() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-xs text-muted">About</p>
        <h1 className="mt-4 max-w-2xl text-[32px] font-semibold leading-tight">I build software systems.</h1>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed">
          <p>
            For more than 15 years I have worked across software engineering, architecture, fintech, e-commerce, and enterprise platforms.
          </p>
          <p>
            I design and build production software using AI-first engineering, combining 15+ years of software experience with agentic development, cloud architecture, and automation.
          </p>
          <p>I build systems. AI helps me build them differently.</p>
        </div>

        <section className="mt-14 max-w-2xl border-t border-line pt-8">
          <h2 className="text-xl font-semibold">What I do</h2>
          <ul className="mt-4 space-y-2">
            {PRACTICE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14 max-w-2xl border-t border-line pt-8">
          <h2 className="text-xl font-semibold">Experience</h2>
          <ul className="mt-6 flex flex-col gap-6">
            {EXPERIENCE.map((item) => (
              <li key={item.role}>
                <p className="font-medium">{item.role}</p>
                <p className="mt-1 text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
