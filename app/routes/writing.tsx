import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SiteShell } from "~/components/SiteShell";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";
import { noteMonth } from "~/utils/format";

export const meta: MetaFunction = () => [
  { title: "Engineering notes · Kyaw Zaw Win" },
  { name: "description", content: "Notes on AI engineering, architecture, and building." },
];

interface NoteProps {
  title: string;
  url: string;
  date: string;
  category: string;
  source: string;
}

const BASE_PATH = "/kyawzawwin.dev/";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const [noteRes, techStackRes] = await Promise.all([
    fetch(`${BASE_PATH}/data/notes.json`),
    fetch(`${BASE_PATH}/data/tech-stacks.json`),
  ]);

  
  if (!noteRes.ok || !techStackRes.ok) {
    throw new Response("Failed to load JSON file", { status: noteRes.status });
  }
  
  const noteData = await noteRes.json();
  const techStackData = await techStackRes.json();

  return {
    notes: noteData,
    categories: noteData.map((note: NoteProps) => note.category).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index),
  };
}

export default function Writing() {
  const { notes, categories } = useLoaderData<typeof clientLoader>();

  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-[32px] font-semibold">Engineering notes</h1>
        {notes.length === 0 ? (
          <p className="mt-8 text-muted">No engineering notes are published yet.</p>
        ) : (
          <div className="mt-10 flex flex-col gap-12">
            {categories.map((category: string) => (
              <section key={category}>
                <h2 className="font-mono text-xs text-muted">{category}</h2>
                <ul className="mt-4">
                  {notes
                    .filter((note: NoteProps) => note.category === category)
                    .map((note: NoteProps) => (
                      <NoteRow key={note.url} note={note} />
                    ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

function NoteRow({ note }: { note: NoteProps }) {
  return (
    <li className="border-t border-line py-4">
      <a href={note.url} target="_blank" rel="noopener noreferrer" className="text-lg text-ink underline">
        {note.title}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p className="mt-2 font-mono text-xs text-muted">
        {noteMonth(note.date)} · {note.source}
      </p>
    </li>
  );
}
