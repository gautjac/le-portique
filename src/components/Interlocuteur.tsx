import { useState } from "react";
import { interlocuteur } from "../api";
import { t, type Lang } from "../i18n";
import { Capital, Notice, Panel, Principe, PrimaryButton, Thinking } from "./ui";

interface Echange {
  question: string;
  reponse: string;
  principe: string;
}

export default function Interlocuteur({ lang }: { lang: Lang }) {
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [fil, setFil] = useState<Echange[]>([]);

  async function demander() {
    const q = question.trim();
    if (q.length < 3) {
      setErr(t(lang, "interlocVide"));
      return;
    }
    setErr("");
    setBusy(true);
    try {
      const res = await interlocuteur({ question: q, lang });
      setFil((f) => [{ question: q, reponse: res.texte, principe: res.principe }, ...f]);
      setQuestion("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : t(lang, "erreur"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel className="animate-riseIn">
      <div className="p-6 sm:p-9">
        <Capital>Stoa · V</Capital>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {t(lang, "interlocTitre")}
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-xl leading-relaxed text-ink-soft">
          {t(lang, "interlocIntro")}
        </p>

        <div className="seam my-7" />

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) demander();
          }}
          placeholder={t(lang, "interlocPlaceholder")}
          rows={3}
          className="field w-full resize-none p-4 font-serif text-lg leading-relaxed text-ink placeholder:text-ink-faint/70"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={demander} disabled={busy}>
            {busy ? t(lang, "interlocEnCours") : t(lang, "interlocBouton")}
          </PrimaryButton>
          {err && <Notice>{err}</Notice>}
        </div>

        {busy && (
          <div className="mt-7">
            <Thinking label={t(lang, "interlocEnCours")} />
          </div>
        )}

        <div className="mt-8 space-y-7">
          {fil.map((e, i) => (
            <div key={i} className="animate-fadeIn">
              <p className="font-sans text-sm font-semibold uppercase tracking-wide text-ink-faint">
                {e.question}
              </p>
              {e.principe && (
                <div className="mt-2">
                  <Principe label={t(lang, "interlocPrincipe")} value={e.principe} />
                </div>
              )}
              <div className="prose-stoic mt-3 border-l-2 border-oxblood/40 pl-5 font-serif text-xl leading-relaxed text-ink">
                {e.reponse.split(/\n{2,}/).map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
