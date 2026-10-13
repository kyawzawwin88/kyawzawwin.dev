import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", to: "/" },
  { label: "Open Source", to: "/open-source" },
  { label: "Writing", to: "/writing" },
  { label: "Lab", to: "/lab" },
  { label: "About", to: "/about" },
] as const;

function isCurrent(pathname: string, to: string) {
  if (to === "/") {
    return pathname === "/" || pathname.startsWith("/work/");
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-base font-medium text-ink">
          KZW.
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const current = isCurrent(location.pathname, link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm text-ink ${
                  current ? "underline" : "hover:underline"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/work-with-me"
            aria-current={location.pathname === "/work-with-me" ? "page" : undefined}
            className={`ml-2 inline-flex min-h-11 items-center gap-2 text-sm text-ink ${
              location.pathname === "/work-with-me" ? "underline" : "hover:underline"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Available
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className="block h-px w-full bg-ink" />
            <span className="block h-px w-full bg-ink" />
            <span className="block h-px w-full bg-ink" />
          </span>
        </button>
      </div>

      {open && (
        <nav id="site-menu" className="border-t border-line bg-bg md:hidden" aria-label="Primary">
          <div className="mx-auto flex max-w-page flex-col px-4 py-2">
            {LINKS.map((link) => {
              const current = isCurrent(location.pathname, link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center text-base text-ink ${
                    current ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/work-with-me"
              aria-current={location.pathname === "/work-with-me" ? "page" : undefined}
              className="inline-flex min-h-11 items-center gap-2 text-base text-ink"
            >
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Available
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
