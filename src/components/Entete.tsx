import { maximeDuJour } from "../data/maximes";
import { type JourEntree } from "../db";
import { t, type Lang } from "../i18n";

/** Top matter: wordmark, daily maxim, ritual streak, language toggle. */
export default function Entete({
  lang,
  date,
  jour,
  serie,
  onToggleLang,
}: {
  lang: Lang;
  date: string;
  jour: JourEntree;
  serie: number;
  onToggleLang: () => void;
}) {
  const maxime = maximeDuJour(date);
  const dateLisible = new Date(date + "T00:00:00").toLocaleDateString(
    lang === "en" ? "en-CA" : "fr-CA",
    { weekday: "long", day: "numeric", month: "long" },
  );

  return (
    <header className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* small portico mark */}
          <svg viewBox="0 0 64 50" className="h-9 w-auto" fill="none" stroke="#9a3b2e" strokeWidth="3">
            <path d="M8 20 L32 6 L56 20" strokeLinejoin="round" />
            <line x1="10" y1="22" x2="54" y2="22" />
            <line x1="18" y1="25" x2="18" y2="42" />
            <line x1="32" y1="25" x2="32" y2="42" />
            <line x1="46" y1="25" x2="46" y2="42" />
            <line x1="12" y1="44" x2="52" y2="44" />
          </svg>
          <div>
            <h1 className="font-display text-2xl font-bold leading-none tracking-tight text-ink">
              {t(lang, "appName")}
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {t(lang, "tagline")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* streak */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <Flame active={serie > 0} />
              <span className="font-mono text-2xl font-semibold leading-none text-bronze">{serie}</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              {serie > 0 ? t(lang, "serieJours") : t(lang, "serie")}
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t(lang, "langueAria")}
            title={t(lang, "langueAria")}
            className="rounded-md px-2.5 py-1 font-mono text-xs font-semibold text-ink-soft ring-1 ring-ink/15 transition hover:bg-marble-dim/60"
          >
            {t(lang, "langueBouton")}
          </button>
        </div>
      </div>

      {/* daily maxim */}
      <figure className="mt-6 rounded-2xl bg-ink px-6 py-6 shadow-stone-lg sm:px-9 sm:py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bronze-pale/70">
          {t(lang, "maximeDuJour")} · {dateLisible}
        </p>
        <blockquote className="mt-3 font-display text-2xl font-medium italic leading-snug text-marble-pale sm:text-3xl">
          « {lang === "en" ? maxime.en : maxime.fr} »
        </blockquote>
        <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
          <span className="font-semibold uppercase tracking-[0.14em] text-bronze-pale">
            {maxime.auteur}
          </span>
          <span className="text-marble-vein/60">·</span>
          <span className="text-marble-vein/80">{maxime.source}</span>
          <span className="text-marble-vein/40">·</span>
          <span className="text-bronze-soft">{maxime.principe}</span>
        </figcaption>
      </figure>

      {/* today's ritual marks */}
      <div className="mt-4 flex items-center gap-4 px-1">
        <Mark done={!!jour.matinFaitLe} label={t(lang, "matinFait")} />
        <span className="h-3 w-px bg-ink/15" />
        <Mark done={!!jour.soirFaitLe} label={t(lang, "soirFait")} />
        {serie === 0 && (
          <span className="ml-auto font-serif text-sm italic text-ink-faint">
            {t(lang, "serieZero")}
          </span>
        )}
      </div>
    </header>
  );
}

function Mark({ done, label }: { done: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={
          "grid h-4 w-4 place-items-center rounded-full ring-1 " +
          (done ? "bg-bronze text-marble-pale ring-bronze" : "ring-ink/25")
        }
      >
        {done && (
          <svg viewBox="0 0 20 20" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M4 10.5 8 14.5 16 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        className={
          "font-mono text-[11px] uppercase tracking-[0.16em] " +
          (done ? "text-bronze" : "text-ink-faint")
        }
      >
        {label}
      </span>
    </span>
  );
}

function Flame({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={active ? "#9c6b34" : "none"} stroke="#9c6b34" strokeWidth="1.6">
      <path d="M12 2.5c1.5 3 4.5 4.5 4.5 8.5a4.5 4.5 0 0 1-9 0c0-1.4.5-2.4 1-3 .2 1 .8 1.6 1.5 1.8-.3-2.3.9-5 2-7.3Z" strokeLinejoin="round" />
    </svg>
  );
}
