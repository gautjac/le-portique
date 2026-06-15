import type { ReactNode } from "react";

/** A carved marble panel — the base surface for every view. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl bg-marble-light/70 backdrop-blur-[1px] shadow-stone ring-1 ring-ink/10 " +
        className
      }
    >
      {children}
    </div>
  );
}

/** A column-fluting capital rule used to head sections. */
export function Capital({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-px w-6 bg-oxblood/60" />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
        {children}
      </span>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-oxblood px-5 py-2.5 font-sans text-sm font-semibold tracking-wide text-marble-pale shadow-stone transition hover:bg-oxblood-deep disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-sans text-sm font-medium text-ink-soft ring-1 ring-ink/15 transition hover:bg-marble-dim/60 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

/** Three breathing dots — the "thinking" indicator. */
export function Thinking({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-ink-soft">
      <span className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-oxblood/70 animate-breathe" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-oxblood/70 animate-breathe" style={{ animationDelay: "300ms" }} />
        <span className="h-2 w-2 rounded-full bg-oxblood/70 animate-breathe" style={{ animationDelay: "600ms" }} />
      </span>
      <span className="font-serif text-lg italic">{label}</span>
    </div>
  );
}

export function Principe({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-bronze/10 px-3 py-1 ring-1 ring-bronze/25">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bronze">{label}</span>
      <span className="font-serif text-base italic text-ink">{value}</span>
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-sm text-oxblood-deep" role="status">
      {children}
    </p>
  );
}
