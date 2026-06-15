import { useEffect, useRef, useState } from "react";
import { variationVue } from "../api";
import { VUE_SCRIPT, ligneTexte, type VueLigne } from "../data/vueDenHaut";
import { t, type Lang } from "../i18n";
import { Capital, GhostButton, Panel, PrimaryButton } from "./ui";

export default function Vue({ lang }: { lang: Lang }) {
  const [running, setRunning] = useState(false);
  const [idx, setIdx] = useState(0);
  const [script, setScript] = useState<VueLigne[]>(VUE_SCRIPT);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function commencer(s: VueLigne[] = script) {
    if (timer.current) clearTimeout(timer.current);
    setScript(s);
    setIdx(0);
    setRunning(true);
    avancer(0, s);
  }

  function avancer(i: number, s: VueLigne[]) {
    setIdx(i);
    if (i >= s.length - 1) return; // hold on the final line
    const ms = (prefersReduced ? Math.min(s[i].duree, 4) : s[i].duree) * 1000;
    timer.current = setTimeout(() => avancer(i + 1, s), ms);
  }

  function arreter() {
    if (timer.current) clearTimeout(timer.current);
    setRunning(false);
    setIdx(0);
  }

  async function variation() {
    setErr("");
    setBusy(true);
    try {
      const res = await variationVue({ lang });
      // build a gentle altitude arc over the returned lines
      const n = res.lignes.length;
      const built: VueLigne[] = res.lignes.map((texte, i) => {
        const phase = i / Math.max(1, n - 1);
        const altitude = Math.sin(phase * Math.PI); // rise then return
        // The variation is already composed in the active language; mirror it
        // into both slots so ligneTexte() renders it regardless of `lang`.
        return { fr: texte, en: texte, duree: 8, altitude };
      });
      commencer(built);
    } catch (e) {
      setErr(e instanceof Error ? e.message : t(lang, "erreur"));
    } finally {
      setBusy(false);
    }
  }

  const current = script[idx];
  const altitude = current?.altitude ?? 0;
  const last = idx >= script.length - 1;

  // visual zoom-out: a contracting halo of rings as altitude rises
  const scale = 1 + altitude * 1.6;

  return (
    <Panel className="animate-riseIn overflow-hidden">
      {!running ? (
        <div className="p-6 sm:p-9">
          <Capital>Stoa · IV</Capital>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t(lang, "vueTitre")}
          </h2>
          <p className="mt-3 max-w-2xl font-serif text-xl leading-relaxed text-ink-soft">
            {t(lang, "vueIntro")}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
            {t(lang, "vueDuree")}
          </p>

          <div className="seam my-7" />

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton onClick={() => commencer(VUE_SCRIPT)}>{t(lang, "vueCommencer")}</PrimaryButton>
            <GhostButton onClick={variation} disabled={busy}>
              {busy ? t(lang, "vueVariationEnCours") : t(lang, "vueVariation")}
            </GhostButton>
          </div>
          {err && <p className="mt-3 font-sans text-sm text-oxblood-deep">{err}</p>}
        </div>
      ) : (
        <div className="relative grid min-h-[26rem] place-items-center overflow-hidden bg-gradient-to-b from-marble-pale to-marble px-6 py-16 text-center sm:min-h-[32rem]">
          {/* zoom-out halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-[2500ms] ease-out"
            style={{ transform: `translate(-50%,-50%) scale(${scale})` }}
          >
            {[0, 1, 2, 3].map((r) => (
              <span
                key={r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze/20"
                style={{ width: `${120 + r * 130}px`, height: `${120 + r * 130}px` }}
              />
            ))}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oxblood/15"
              style={{ width: "14px", height: "14px" }}
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p
              key={idx}
              className="animate-fadeIn font-display text-3xl font-medium leading-snug text-ink sm:text-4xl"
            >
              {current ? ligneTexte(current, lang) : ""}
            </p>
            {last && (
              <p className="mt-6 animate-fadeIn font-serif text-lg italic text-ink-faint">
                {t(lang, "vueFini")}
              </p>
            )}
          </div>

          {/* progress dots */}
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {script.map((_, i) => (
              <span
                key={i}
                className={
                  "h-1.5 rounded-full transition-all duration-500 " +
                  (i === idx ? "w-5 bg-oxblood" : i < idx ? "w-1.5 bg-bronze/50" : "w-1.5 bg-ink/15")
                }
              />
            ))}
          </div>

          <button
            type="button"
            onClick={arreter}
            className="absolute right-5 top-5 z-10 rounded-lg px-3 py-1.5 font-sans text-sm font-medium text-ink-soft ring-1 ring-ink/15 backdrop-blur transition hover:bg-marble-dim/60"
          >
            {t(lang, "vueArreter")}
          </button>
        </div>
      )}
    </Panel>
  );
}
