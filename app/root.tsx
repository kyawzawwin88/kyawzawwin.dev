import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import tailwindStylesheetUrl from "./tailwind.css?url";
import { SiteShell } from "~/components/SiteShell";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  { rel: "icon", href: "/images/favicon.ico", type: "image/x-icon" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#FFFFFF",
              color: "#111111",
              border: "1px solid #E5E5E5",
              borderRadius: "2px",
            },
            success: {
              iconTheme: { primary: "#111111", secondary: "#FFFFFF" },
            },
            error: {
              iconTheme: { primary: "#111111", secondary: "#FFFFFF" },
            },
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const title = status === 404 ? "Page not found" : "Something went wrong";
  const raw = isRouteErrorResponse(error) && typeof error.data === "string" ? error.data : "";
  const detail =
    raw && !raw.includes("No route matches")
      ? raw
      : status === 404
        ? "That page is not on this site."
        : "The page could not be loaded.";

  useEffect(() => {
    document.title = `${title} · Kyaw Zaw Win`;
  }, [title]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-page px-4 py-16 md:px-6">
        <p className="font-mono text-xs text-muted">{status}</p>
        <h1 className="mt-3 text-[32px] font-semibold">{title}</h1>
        <p className="mt-4 max-w-xl text-muted">{String(detail)}</p>
        <a href="/" className="mt-8 inline-flex min-h-11 items-center text-ink underline">
          Back to selected work
        </a>
      </div>
    </SiteShell>
  );
}
