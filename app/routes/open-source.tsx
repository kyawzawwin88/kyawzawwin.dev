import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SiteShell } from "~/components/SiteShell";
import { snapshotDate, starLabel } from "~/utils/format";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "Open source · Kyaw Zaw Win" },
  { name: "description", content: "Things I've built and released publicly." },
];

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const openSourceRes = await fetch("data/open-source.json");
  
  if (!openSourceRes.ok) {
    throw new Response("Failed to load JSON file", { status: openSourceRes.status });
  }
  
  const openSourceData = await openSourceRes.json();

  return openSourceData;
}

export interface OpenSourceData {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
}

export default function OpenSource() {
  const { repos, source, fetchedAt, error } = useLoaderData<typeof clientLoader>();

  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-[32px] font-semibold">Open source</h1>
        <p className="mt-4 max-w-xl">Things I've built and released publicly.</p>

        {error && (
          <p className="mt-6 max-w-xl border border-line bg-surface p-4 text-sm" role="alert">
            Live GitHub data did not load ({error}). Counts below are from {snapshotDate(fetchedAt)}.
          </p>
        )}

        {repos.length === 0 ? (
          <p className="mt-10 text-muted">No public repositories to show.</p>
        ) : (
          <ul className="mt-10 flex flex-col gap-4">
            {repos.map((repo: OpenSourceData) => (
              <li key={repo.url} className="border border-line bg-surface p-6">
                <h2 className="text-xl font-semibold">{repo.name}</h2>
                {repo.description && <p className="mt-3 max-w-2xl text-muted">{repo.description}</p>}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  {repo.language ? <p className="font-mono text-xs text-muted">{repo.language}</p> : <span />}
                  <p className="flex items-center gap-6 text-sm">
                    <span className="font-mono text-xs text-muted">{starLabel(repo.stars)}</span>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-ink underline">
                      GitHub
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {source === "live" && (
          <p className="mt-8 font-mono text-xs text-muted">GitHub counts fetched {snapshotDate(fetchedAt)}.</p>
        )}
      </div>
    </SiteShell>
  );
}
