import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AgentDiagram } from "~/components/AgentDiagram";
import { MusicTracks } from "~/components/MusicTracks";
import { SiteShell } from "~/components/SiteShell";
import { noteDate, snapshotDate } from "~/utils/format";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";

const DESCRIPTION =
  "I design and build production software using AI-first engineering, combining 15+ years of software experience with agentic development, cloud architecture, and automation.";

export const meta: MetaFunction = () => [
  { title: "Kyaw Zaw Win" },
  { name: "description", content: DESCRIPTION },
];

interface NoteProps {
  title: string;
  url: string;
  date: string;
  category: string;
  source: string;
}

interface LabProps {
  number: string;
  title: string;
  summary: string;
  url: string;
  area: string;
  linkLabel: string;
}

const BASE_PATH = "/kyawzawwin.dev";
  
export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const [noteRes, labRes, musicRes] = await Promise.all([
    fetch(`${BASE_PATH}/data/notes.json`),
    fetch(`${BASE_PATH}/data/lab.json`),
    fetch(`${BASE_PATH}/data/music.json`),
  ]);

  
  if (!noteRes.ok ||  !labRes.ok || !musicRes.ok) {
    throw new Response("Failed to load JSON file", { status: noteRes.status });
  }
  
  const noteData = await noteRes.json();
  const labData = await labRes.json();
  const musicData = await musicRes.json();

  return {
    notes: noteData,
    lab: labData,
    music: musicData,
  };
}

export default function Index() {
  const { notes, lab, music } = useLoaderData<typeof clientLoader>();

  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 md:px-6">
        <section className="grid items-start gap-10 py-12 md:grid-cols-[minmax(0,1fr)_240px] md:py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:py-24">
          <div>
            <h1 className="text-[2rem] font-semibold leading-tight md:text-5xl">KYAW ZAW WIN</h1>
            <p className="mt-6 max-w-xl text-2xl leading-snug md:text-[32px]">
              Software Engineer building with AI, agents & distributed systems.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed">
              I turn complex requirements into production software using AI-first engineering.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/open-source"
                className="inline-flex min-h-11 items-center bg-accent px-4 text-sm font-medium text-ink rounded-notebook"
              >
                Explore my work
              </Link>
              <Link to="/work-with-me" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink hover:underline">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                Available for work
              </Link>
            </div>
          </div>
          <AgentDiagram />
        </section>

        {notes.length > 0 && (
          <section id="notes" className="scroll-mt-20 border-t border-line py-12 md:py-16">
            <h2 className="text-xl font-semibold">Engineering notes</h2>
            <ul className="mt-6">
              {notes.map((note: NoteProps) => (
                <li key={note.url} className="border-t border-line">
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 flex-col gap-1 py-4 text-ink hover:underline sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <time dateTime={note.date} className="shrink-0 font-mono text-xs text-muted">
                      {noteDate(note.date)}
                    </time>
                    <span>{note.title}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {lab.length > 0 && (
          <section id="lab" className="scroll-mt-20 border-t border-line py-12 md:py-16">
            <h2 className="text-xl font-semibold">The lab</h2>
            <p className="mt-4">I build from experience, and from the productivity tools I use.</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {lab.map((entry: LabProps) => (
                <li key={entry.number}>
                  <Link to={`/lab#lab-${entry.number}`} className="inline-flex min-h-11 items-center text-ink underline">
                    {entry.area}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section id="music" className="scroll-mt-20 border-t border-line py-12 md:py-16">
          <h2 className="text-xl font-semibold">Agentic Music Production</h2>
          <p className="mt-4 max-w-xl">A hobby. I produce these tracks with a custom agentic harness and ComfyUI.</p>
          <a
            href={music.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-ink underline"
          >
            SoundCloud
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {music.error && (
            <p className="mt-6 max-w-xl border border-line bg-surface p-4 text-sm" role="alert">
              Live SoundCloud data did not load ({music.error}). Tracks below are from {snapshotDate(music.fetchedAt)}.
            </p>
          )}
          <MusicTracks tracks={music.tracks} />
        </section>

        <section className="border-t border-line py-12 md:py-16">
          <h2 className="sr-only">Practice</h2>
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <li>
              <p className="text-xl font-semibold">15+ years</p>
              <p className="mt-1 font-mono text-xs text-muted">Experience</p>
            </li>
            <li>
              <p className="text-xl font-semibold">AI-first</p>
              <p className="mt-1 font-mono text-xs text-muted">Software Engineering</p>
            </li>
            <li>
              <p className="text-xl font-semibold">Digital</p>
              <p className="mt-1 font-mono text-xs text-muted">Nomad</p>
            </li>
            <li>
              <p className="text-xl font-semibold">Remote</p>
              <p className="mt-1 font-mono text-xs text-muted">Worldwide</p>
            </li>
          </ul>
        </section>

        <section className="border-t border-line py-16 text-center md:py-24">
          <h2 className="text-2xl font-semibold md:text-[32px]">Have something difficult to build?</h2>
          <Link
            to="/work-with-me"
            className="mt-8 inline-flex min-h-11 items-center bg-accent px-4 text-sm font-medium text-ink rounded-notebook"
          >
            Let's work together
          </Link>
        </section>

        <p className="border-t border-line py-8 text-sm leading-relaxed text-muted">
          I work across <span className="text-ink">TypeScript · Node.js · PHP · Laravel · Python · Java · AWS · DynamoDB · MySQL · MongoDB · LLMs · agents · ComfyUI</span>
        </p>
        <p className="pb-12 text-sm text-muted">I build systems. AI helps me build them differently.</p>
      </div>
    </SiteShell>
  );
}
