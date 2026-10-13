import { useEffect, useRef } from "react";

const FLOW = ["Human", "Agents", "Review", "Deploy", "UAT"] as const;

export function AgentDiagram() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.classList.add("is-drawn");
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className="agent-diagram border border-line bg-surface p-5 font-mono text-[13px] leading-6 text-ink">
      <figcaption className="mb-4 text-xs text-muted">Agent activity</figcaption>
      {FLOW.map((step) => (
        <div key={step}>
          <div className="inline-block border border-line px-2">{step}</div>
          {step === "Agents" && (
            <ul className="ml-4 border-l border-ink">
              <li className="py-1 pl-3">Plan</li>
              <li className="py-1 pl-3">Code</li>
            </ul>
          )}
          <div className="diagram-stem ml-4 h-3 w-px bg-ink" />
        </div>
      ))}
      <div className="inline-block border border-accent px-2">Release</div>
      <p className="mt-4 text-xs text-muted">Harness · Governance · Knowledge</p>
    </figure>
  );
}
