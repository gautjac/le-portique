import { useState } from "react";
import { rehearse } from "../api";
import { saveJour, type JourEntree } from "../db";
import { t, type Lang } from "../i18n";
import { Capital, GhostButton, Notice, Panel, Principe, PrimaryButton, Thinking } from "./ui";

export default function Matin({
  lang,
  jour,
  onChange,
}: {
  lang: Lang;
  jour: JourEntree;
  onChange: () => void;
}) {
  const [peur, setPeur] = useState(jour.matinPeur ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [repetition, setRepetition] = useState(jour.matinRepetition ?? "");
  const [principe, setPrincipe] = useState("");

  const fait = !!jour.matinFaitLe;

  async function lancer() {
    const p = peur.trim();
    if (p.length < 3) {
      setErr(t(lang, "matinVide"));
      return;
    }
    setErr("");
    setBusy(true);
    try {
      const res = await rehearse({ peur: p, lang });
      setRepetition(res.texte);
      setPrincipe(res.principe);
      await saveJour({ date: jour.date, matinPeur: p, matinRepetition: res.texte });
      onChange();
    } catch (e) {
      setErr(e instanceof Error ? e.message : t(lang, "erreur"));
    } finally {
      setBusy(false);
    }
  }

  async function marquer() {
    await saveJour({ date: jour.date, matinPeur: peur.trim(), matinRepetition: repetition, matinFaitLe: Date.now() });
    onChange();
  }

  async function reprendre() {
    setRepetition("");
    setPrincipe("");
  }

  return (
    <Panel className="animate-riseIn">
      <div className="p-6 sm:p-9">
        <Capital>Stoa · I</Capital>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {t(lang, "matinTitre")}
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-xl leading-relaxed text-ink-soft">
          {t(lang, "matinIntro")}
        </p>

        <div className="seam my-7" />

        <label className="block font-sans text-sm font-semibold tracking-wide text-ink">
          {t(lang, "matinLabel")}
        </label>
        <textarea
          value={peur}
          onChange={(e) => setPeur(e.target.value)}
          placeholder={t(lang, "matinPlaceholder")}
          rows={3}
          className="field mt-2 w-full resize-none p-4 font-serif text-lg leading-relaxed text-ink placeholder:text-ink-faint/70"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!repetition && (
            <PrimaryButton onClick={lancer} disabled={busy}>
              {busy ? t(lang, "matinEnCours") : t(lang, "matinBouton")}
            </PrimaryButton>
          )}
          {repetition && !busy && (
            <GhostButton onClick={reprendre}>{t(lang, "matinRefaire")}</GhostButton>
          )}
          {err && <Notice>{err}</Notice>}
        </div>

        {busy && (
          <div className="mt-7">
            <Thinking label={t(lang, "matinEnCours")} />
          </div>
        )}

        {repetition && !busy && (
          <div className="mt-7 animate-fadeIn">
            {principe && <Principe label={t(lang, "interlocPrincipe")} value={principe} />}
            <div className="prose-stoic mt-4 border-l-2 border-oxblood/40 pl-5 font-serif text-xl leading-relaxed text-ink">
              {repetition.split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3">
              {fait ? (
                <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-bronze">
                  <Check /> {t(lang, "matinDejaFait")}
                </span>
              ) : (
                <PrimaryButton onClick={marquer}>{t(lang, "matinMarquer")}</PrimaryButton>
              )}
            </div>
          </div>
        )}
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
