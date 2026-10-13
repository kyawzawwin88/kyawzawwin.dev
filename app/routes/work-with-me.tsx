import type { MetaFunction } from "@remix-run/node";
import { SiteShell } from "~/components/SiteShell";

const EMAIL = "kyawzawwin@gmail.com";

const HELP = [
  "AI-first product development",
  "Agentic engineering and workflow automation",
  "Backend / API architecture",
  "AWS and event-driven systems",
  "Technical prototyping",
  "Existing system modernization",
  "Modernize a legacy brownfield codebase to an AI-first codebase",
  "Product development from scratch and maintaining an existing system",
  "Add a microservice in AWS and event-driven systems",
];

export const meta: MetaFunction = () => [
  { title: "Work with me · Kyaw Zaw Win" },
  { name: "description", content: "Available for freelance, contract, and remote IC roles." },
];

export default function WorkWithMe() {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Tell me what you're building")}`;

  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-[32px] font-semibold">Work with me</h1>
        <p className="mt-6 text-xl">I can help with</p>
        <ol className="mt-6 max-w-xl">
          {HELP.map((item, index) => (
            <li key={item} className="flex gap-4 border-t border-line py-4">
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <p className="mt-12 flex items-center gap-2 text-base">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          Available for freelance, contract, and remote IC roles.
        </p>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="text-2xl font-semibold md:text-[32px]">Have a difficult engineering problem?</h2>
          <a
            href={mailto}
            className="mt-8 inline-flex min-h-11 items-center bg-accent px-4 text-sm font-medium text-ink rounded-notebook"
          >
            Tell me what you're building
          </a>
          <p className="mt-4 font-mono text-xs text-muted">{EMAIL}</p>
        </section>
      </div>
    </SiteShell>
  );
}
