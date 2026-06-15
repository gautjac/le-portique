import { t, type Lang } from "../i18n";

export default function Onboarding({ lang, onEnter }: { lang: Lang; onEnter: () => void }) {
  const steps = [t(lang, "onbMatin"), t(lang, "onbTri"), t(lang, "onbSoir")];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-marble/80 p-5 backdrop-blur-sm">
      <div className="animate-riseIn w-full max-w-lg rounded-2xl bg-marble-pale p-8 shadow-stone-lg ring-1 ring-ink/10 sm:p-10">
        {/* portico mark */}
        <svg viewBox="0 0 120 70" className="mx-auto h-16 w-auto" fill="none" stroke="#9a3b2e" strokeWidth="2.5">
          <path d="M14 26 L60 8 L106 26" strokeLinejoin="round" />
          <line x1="16" y1="29" x2="104" y2="29" />
          <line x1="26" y1="33" x2="26" y2="58" />
          <line x1="44" y1="33" x2="44" y2="58" />
          <line x1="60" y1="33" x2="60" y2="58" />
          <line x1="76" y1="33" x2="76" y2="58" />
          <line x1="94" y1="33" x2="94" y2="58" />
          <line x1="18" y1="61" x2="102" y2="61" />
        </svg>

        <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-bronze">
          {t(lang, "onbSousTitre")}
        </p>
        <h1 className="mt-1 text-center font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {t(lang, "onbTitre")}
        </h1>
        <p className="mt-4 text-center font-serif text-xl leading-relaxed text-ink-soft">
          {t(lang, "onbCorps")}
        </p>

        <div className="seam my-7" />

        <ul className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-oxblood/10 font-mono text-xs font-semibold text-oxblood ring-1 ring-oxblood/25">
                {i + 1}
              </span>
              <span className="font-serif text-lg leading-snug text-ink">{s}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onEnter}
          className="mt-8 w-full rounded-lg bg-oxblood px-5 py-3 font-sans text-base font-semibold tracking-wide text-marble-pale shadow-stone transition hover:bg-oxblood-deep"
        >
          {t(lang, "onbEntrer")}
        </button>
      </div>
    </div>
  );
}
