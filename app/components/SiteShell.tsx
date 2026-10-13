import { useNavigation } from "@remix-run/react";
import type { ReactNode } from "react";
import { SiteHeader } from "~/components/SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  const navigation = useNavigation();
  const loading = navigation.state !== "idle";

  return (
    <div className="min-h-screen bg-bg text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      {loading && (
        <p className="mx-auto max-w-page px-4 py-2 font-mono text-xs text-muted md:px-6" role="status">
          Loading page
        </p>
      )}
      <main id="content">{children}</main>
      <footer className="mx-auto max-w-page px-4 pb-12 md:px-6">
        <ul className="flex flex-wrap gap-x-6 border-t border-line">
          <li>
            <a
              href="https://github.com/kyawzawwin88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-ink underline"
            >
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kyawzawwin1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-ink underline"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
