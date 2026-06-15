import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  aujourdHui,
  calculerSerie,
  db,
  getReglages,
  setReglages,
  type JourEntree,
} from "./db";
import { t, type Lang } from "./i18n";
import Entete from "./components/Entete";
import Onboarding from "./components/Onboarding";
import Matin from "./components/Matin";
import Tri from "./components/Tri";
import Soir from "./components/Soir";
import Vue from "./components/Vue";
import Interlocuteur from "./components/Interlocuteur";

type Onglet = "matin" | "tri" | "soir" | "vue" | "interloc";

const ONGLETS: Array<{ id: Onglet; key: string }> = [
  { id: "matin", key: "navMatin" },
  { id: "tri", key: "navTri" },
  { id: "soir", key: "navSoir" },
  { id: "vue", key: "navVue" },
  { id: "interloc", key: "navInterloc" },
];

export default function App() {
  const date = aujourdHui();
  const [lang, setLang] = useState<Lang>("fr");
  const [onglet, setOnglet] = useState<Onglet>("matin");
  const [onboarding, setOnboarding] = useState(false);
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0); // force re-read after writes

  // load settings on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await getReglages();
      if (cancelled) return;
      setLang(r.langue);
      setOnboarding(!r.onboardingVu);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // keep the document language + metadata in sync with the toggle
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t(lang, "docTitre");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t(lang, "docDescription"));
  }, [lang]);

  // live data: all days (for streak) — re-runs on every write
  const jours = useLiveQuery(() => db.jours.toArray(), [tick]) as JourEntree[] | undefined;

  const jour: JourEntree = useMemo(() => {
    const found = jours?.find((j) => j.date === date);
    return found ?? { date, majLe: Date.now() };
  }, [jours, date]);

  const serie = useMemo(() => calculerSerie(jours ?? [], date), [jours, date]);

  async function toggleLang() {
    const next: Lang = lang === "fr" ? "en" : "fr";
    setLang(next);
    await setReglages({ langue: next });
  }

  async function fermerOnboarding() {
    setOnboarding(false);
    await setReglages({ onboardingVu: true });
  }

  if (!ready) {
    return <div className="min-h-screen bg-flute" aria-hidden />;
  }

  return (
    <div className="min-h-screen bg-flute">
      {onboarding && <Onboarding lang={lang} onEnter={fermerOnboarding} />}

      <div className="mx-auto max-w-3xl px-4 py-7 sm:px-6 sm:py-10">
        <Entete
          lang={lang}
          date={date}
          jour={jour}
          serie={serie}
          onToggleLang={toggleLang}
        />

        {/* nav — column capitals */}
        <nav className="sticky top-3 z-30 mb-7">
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-marble-light/85 p-1.5 shadow-stone ring-1 ring-ink/10 backdrop-blur thin-scroll">
            {ONGLETS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setOnglet(o.id)}
                className={
                  "whitespace-nowrap rounded-lg px-3.5 py-2 font-sans text-sm font-semibold tracking-wide transition " +
                  (onglet === o.id
                    ? "bg-oxblood text-marble-pale shadow-stone"
                    : "text-ink-soft hover:bg-marble-dim/60 hover:text-ink")
                }
              >
                {t(lang, o.key)}
              </button>
            ))}
          </div>
        </nav>

        <main>
          {onglet === "matin" && <Matin lang={lang} jour={jour} onChange={() => setTick((n) => n + 1)} />}
          {onglet === "tri" && <Tri lang={lang} jour={jour} onChange={() => setTick((n) => n + 1)} />}
          {onglet === "soir" && <Soir lang={lang} jour={jour} onChange={() => setTick((n) => n + 1)} />}
          {onglet === "vue" && <Vue lang={lang} />}
          {onglet === "interloc" && <Interlocuteur lang={lang} />}
        </main>

        <footer className="mt-12 flex items-center justify-center gap-3 pb-6 text-center">
          <span className="h-px w-8 bg-ink/15" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Στοὰ Ποικίλη · {t(lang, "appName")}
          </p>
          <span className="h-px w-8 bg-ink/15" />
        </footer>
      </div>
    </div>
  );
}
