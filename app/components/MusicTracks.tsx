import { noteDate, trackDuration } from "~/utils/format";

export interface MusicTrackProps {
  title: string;
  url: string;
  createdAt: string;
  durationMs: number;
  genre?: string;
  artworkUrl?: string;
}

export function MusicTracks({ tracks }: { tracks: MusicTrackProps[] }) {
  
  if (tracks.length === 0) {
    return <p className="mt-6 text-muted">No tracks are published on SoundCloud yet.</p>;
  }

  return (
    <ul className="mt-6">
      {tracks.map((track) => {
        const duration = trackDuration(track.durationMs);
        return (
          <li key={track.url} className="border-t border-line">
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-11 items-center gap-4 py-4 text-ink"
            >
              {track.artworkUrl ? (
                <img
                  src={track.artworkUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-notebook border border-line object-cover"
                />
              ) : (
                <span className="h-12 w-12 shrink-0 border border-line bg-surface" aria-hidden="true" />
              )}
              <span className="min-w-0 flex-1">
                <span className="block group-hover:underline">{track.title}</span>
                <span className="mt-1 flex flex-wrap gap-x-4 font-mono text-xs text-muted">
                  <time dateTime={track.createdAt}>{noteDate(track.createdAt)}</time>
                  {track.genre && <span>{track.genre}</span>}
                  {duration && <span>{duration}</span>}
                </span>
              </span>
              <span className="shrink-0 underline">Listen</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
