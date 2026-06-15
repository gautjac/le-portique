import { useState } from "react";
import { saveJour, type JourEntree } from "../db";
import { t, type Lang } from "../i18n";
import { Capital, Notice, Panel, PrimaryButton } from "./ui";

export default function Soir({
  lang,
  jour,
  onChange,
}: {
  lang: Lang;
  jour: JourEntree;
  onChange: () => void;
}) {
  const [mal, setMal] = useState(jour.soirMal ?? "");
  const [bien, setBien] = useState(jour.soirBien ?? "");
  const [mieux, setMieux] = useState(jour.soirMieux ?? "");
  const [err, setErr] = useState("");

  const fait = !!jour.soirFaitLe;

  async function sauverChamp(patch: Partial<JourEntree>) {
    await saveJour({ date: jour.date, ...patch });
    onChange();
  }

  async function clore() {
    if (!mal.trim() && !bien.trim() && !mieux.trim()) {
      setErr(t(lang, "soirVide"));
      return;
    }
    setErr("");
    await saveJour({
      date: jour.date,
      soirMal: mal.trim(),
      soirBien: bien.trim(),
      soirMieux: mieux.trim(),
      soirFaitLe: Date.now(),
    });
    onChange();
  }

  const questions: Array<{
    key: string;
    label: string;
    placeholder: string;
    value: string;
    set: (v: string) => void;
    field: keyof JourEntree;
  }> = [
    { key: "mal", label: t(lang, "soirMal"), placeholder: t(lang, "soirPlaceholderMal"), value: mal, set: setMal, field: "soirMal" },
    { key: "bien", label: t(lang, "soirBien"), placeholder: t(lang, "soirPlaceholderBien"), value: bien, set: setBien, field: "soirBien" },
    { key: "mieux", label: t(lang, "soirMieux"), placeholder: t(lang, "soirPlaceholderMieux"), value: mieux, set: setMieux, field: "soirMieux" },
  ];

  return (
    <Panel className="animate-riseIn">
      <div className="p-6 sm:p-9">
        <Capital>Stoa · III</Capital>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {t(lang, "soirTitre")}
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-soft">
          {t(lang, "soirIntro")}
        </p>

        <div className="seam my-7" />

        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={q.key}>
              <label className="flex items-baseline gap-3 font-display text-2xl font-semibold text-ink">
                <span className="font-mono text-sm text-oxblood">{String(i + 1).padStart(2, "0")}</span>
                {q.label}
              </label>
              <textarea
                value={q.value}
                onChange={(e) => q.set(e.target.value)}
                onBlur={() => void sauverChamp({ [q.field]: q.value.trim() } as Partial<JourEntree>)}
                placeholder={q.placeholder}
                rows={2}
                className="field mt-2 w-full resize-none p-4 font-serif text-lg leading-relaxed text-ink placeholder:text-ink-faint/70"
              />
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-4">
          {fait ? (
            <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-bronze">
              <Check /> {t(lang, "soirDejaFait")}
            </span>
          ) : (
            <PrimaryButton onClick={clore}>{t(lang, "soirMarquer")}</PrimaryButton>
          )}
          {err && <Notice>{err}</Notice>}
        </div>
      </div>
    </Panel>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M4 10.5 8 14.5 16 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
