import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MusicTracks, MusicTrackProps } from "~/components/MusicTracks";
import { SiteShell } from "~/components/SiteShell";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";
import { snapshotDate } from "~/utils/format";

export const meta: MetaFunction = () => [
  { title: "Lab · Kyaw Zaw Win" },
  {
    name: "description",
    content: "Experiments at the intersection of software, AI, and creativity.",
  },
];

interface LabEntry {
  number: string;
  title: string;
  summary: string;
  url: string;
  area: string;
  linkLabel: string;
}

interface MusicData {
  tracks: MusicTrackProps[];
  fetchedAt: string;
  error: string;
}

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const [labRes, musicRes] = await Promise.all([
    fetch("/data/lab.json"),
    fetch("/data/music.json"),
  ]);

  
  if (!labRes.ok || !musicRes.ok) {
    throw new Response("Failed to load JSON file", { status: labRes.status });
  }
  
  const labData = await labRes.json();
  const musicData = await musicRes.json();

  return {
    entries: labData,
    music: musicData as MusicData,
  };
}

export default function Lab() {
  const { entries, music } = useLoaderData<typeof clientLoader>();

  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-xs text-muted">KZW / LAB</p>
        <h1 className="mt-4 max-w-2xl text-[32px] font-semibold leading-tight">
          Experiments at the intersection of software, AI, and creativity.
        </h1>
        {entries.length === 0 ? (
          <p className="mt-10 text-muted">No published experiments yet.</p>
        ) : (
          <ul className="mt-12 flex flex-col gap-10">
            {entries.map((entry: LabEntry) => (
              <li key={entry.number} id={`lab-${entry.number}`} className="scroll-mt-24 border-t border-line pt-6">
                <p className="font-mono text-xs text-muted">LAB / {entry.number}</p>
                <h2 className="mt-3 text-xl font-semibold">{entry.title}</h2>
                <p className="mt-3 max-w-2xl text-muted">{entry.summary}</p>
                {entry.area === "Music" && (
                  <>
                    {music.error && (
                      <p className="mt-6 max-w-xl border border-line bg-surface p-4 text-sm" role="alert">
                        Live SoundCloud data did not load ({music.error}). Tracks below are from {snapshotDate(music.fetchedAt)}.
                      </p>
                    )}
                    <MusicTracks tracks={music.tracks} />
                  </>
                )}
                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-ink underline">
                  {entry.linkLabel ?? "GitHub"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteShell>
  );
}
