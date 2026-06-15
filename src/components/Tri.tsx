import { useMemo, useState } from "react";
import { saveJour, type CarteTri, type JourEntree } from "../db";
import { t, type Lang } from "../i18n";
import { Capital, Panel, PrimaryButton } from "./ui";

type Colonne = CarteTri["colonne"];

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export default function Tri({
  lang,
  jour,
  onChange,
}: {
  lang: Lang;
  jour: JourEntree;
  onChange: () => void;
}) {
  const [cartes, setCartes] = useState<CarteTri[]>(jour.cartes ?? []);
  const [saisie, setSaisie] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [survol, setSurvol] = useState<Colonne | null>(null);

  async function persist(next: CarteTri[]) {
    setCartes(next);
    await saveJour({ date: jour.date, cartes: next, triFaitLe: next.length ? Date.now() : undefined });
    onChange();
  }

  function ajouter() {
    const txt = saisie.trim();
    if (!txt) return;
    const ordre = cartes.filter((c) => c.colonne === "non").length;
    const next = [...cartes, { id: uid(), texte: txt, colonne: "non" as Colonne, ordre }];
    setSaisie("");
    void persist(next);
  }

  function deplacer(id: string, colonne: Colonne) {
    const max = cartes.filter((c) => c.colonne === colonne).length;
    const next = cartes.map((c) => (c.id === id ? { ...c, colonne, ordre: max } : c));
    void persist(next);
  }

  function supprimer(id: string) {
    void persist(cartes.filter((c) => c.id !== id));
  }

  const groupes = useMemo(() => {
    const by = (col: Colonne) =>
      cartes.filter((c) => c.colonne === col).sort((a, b) => a.ordre - b.ordre);
    return { non: by("non"), pouvoir: by("pouvoir"), hors: by("hors") };
  }, [cartes]);

  const totalClasse = groupes.pouvoir.length + groupes.hors.length;
  const partPouvoir = totalClasse ? Math.round((groupes.pouvoir.length / totalClasse) * 100) : 0;

  return (
    <Panel className="animate-riseIn">
      <div className="p-6 sm:p-9">
        <Capital>Stoa · II</Capital>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {t(lang, "triTitre")}
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-xl leading-relaxed text-ink-soft">
          {t(lang, "triIntro")}
        </p>

        <div className="seam my-7" />

        {/* add a worry */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") ajouter();
            }}
            placeholder={t(lang, "triAjout")}
            className="field flex-1 px-4 py-3 font-serif text-lg text-ink placeholder:text-ink-faint/70"
          />
          <PrimaryButton onClick={ajouter}>{t(lang, "triAjouter")}</PrimaryButton>
        </div>

        {/* unsorted tray */}
        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            {t(lang, "triNonClasses")} · {groupes.non.length}
          </p>
          <div
            onDragOver={(e) => {
              if (dragId) {
                e.preventDefault();
                setSurvol("non");
              }
            }}
            onDragLeave={() => setSurvol((s) => (s === "non" ? null : s))}
            onDrop={() => {
              if (dragId) deplacer(dragId, "non");
              setDragId(null);
              setSurvol(null);
            }}
            className={
              "mt-2 flex min-h-[3.5rem] flex-wrap gap-2 rounded-xl border border-dashed p-3 transition " +
              (survol === "non" ? "border-oxblood bg-oxblood/5" : "border-ink/15")
            }
          >
            {groupes.non.length === 0 && (
              <p className="px-1 py-2 font-serif text-base italic text-ink-faint">
                {t(lang, "triVideNon")}
              </p>
            )}
            {groupes.non.map((c) => (
              <Carte
                key={c.id}
                carte={c}
                lang={lang}
                dragging={dragId === c.id}
                onDragStart={() => setDragId(c.id)}
                onDragEnd={() => {
                  setDragId(null);
                  setSurvol(null);
                }}
                onAssign={deplacer}
                onDelete={supprimer}
              />
            ))}
          </div>
        </div>

        {/* the two columns */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Colonne
            col="pouvoir"
            titre={t(lang, "triPouvoir")}
            sous={t(lang, "triPouvoirSous")}
            accent="pouvoir"
            videLabel={t(lang, "triVideCol")}
            count={groupes.pouvoir.length}
            cartes={groupes.pouvoir}
            lang={lang}
            dragActive={!!dragId}
            survol={survol === "pouvoir"}
            onOver={() => setSurvol("pouvoir")}
            onLeave={() => setSurvol((s) => (s === "pouvoir" ? null : s))}
            onDrop={() => {
              if (dragId) deplacer(dragId, "pouvoir");
              setDragId(null);
              setSurvol(null);
            }}
            renderCarte={(c) => (
              <Carte
                key={c.id}
                carte={c}
                lang={lang}
                dragging={dragId === c.id}
                onDragStart={() => setDragId(c.id)}
                onDragEnd={() => {
                  setDragId(null);
                  setSurvol(null);
                }}
                onAssign={deplacer}
                onDelete={supprimer}
              />
            )}
          />
          <Colonne
            col="hors"
            titre={t(lang, "triHors")}
            sous={t(lang, "triHorsSous")}
            accent="hors"
            videLabel={t(lang, "triVideCol")}
            count={groupes.hors.length}
            cartes={groupes.hors}
            lang={lang}
            dragActive={!!dragId}
            survol={survol === "hors"}
            onOver={() => setSurvol("hors")}
            onLeave={() => setSurvol((s) => (s === "hors" ? null : s))}
            onDrop={() => {
              if (dragId) deplacer(dragId, "hors");
              setDragId(null);
              setSurvol(null);
            }}
            renderCarte={(c) => (
              <Carte
                key={c.id}
                carte={c}
                lang={lang}
                dragging={dragId === c.id}
                onDragStart={() => setDragId(c.id)}
                onDragEnd={() => {
                  setDragId(null);
                  setSurvol(null);
                }}
                onAssign={deplacer}
                onDelete={supprimer}
              />
            )}
          />
        </div>

        {/* tally + nudge */}
        {totalClasse > 0 && (
          <div className="mt-7 animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-marble-shade">
                <div
                  className="h-full rounded-full bg-bronze transition-all duration-500"
                  style={{ width: `${partPouvoir}%` }}
                />
              </div>
              <span className="font-mono text-sm font-semibold text-bronze">{partPouvoir}%</span>
            </div>
            <p className="mt-2 font-sans text-sm text-ink-faint">
              {groupes.pouvoir.length} {t(lang, "triTally")} {t(lang, "triPouvoir").toLowerCase()} ·{" "}
              {groupes.hors.length} {t(lang, "triTally")} {t(lang, "triHors").toLowerCase()}
            </p>
            <p className="mt-4 border-l-2 border-bronze/50 pl-4 font-serif text-lg italic leading-relaxed text-ink-soft">
              {t(lang, "triNudge")}
            </p>
          </div>
        )}
      </div>
    </Panel>
  );
}

function Colonne(props: {
  col: Colonne;
  titre: string;
  sous: string;
  accent: "pouvoir" | "hors";
  videLabel: string;
  count: number;
  cartes: CarteTri[];
  lang: Lang;
  dragActive: boolean;
  survol: boolean;
  onOver: () => void;
  onLeave: () => void;
  onDrop: () => void;
  renderCarte: (c: CarteTri) => React.ReactNode;
}) {
  const isPouvoir = props.accent === "pouvoir";
  return (
    <div
      onDragOver={(e) => {
        if (props.dragActive) {
          e.preventDefault();
          props.onOver();
        }
      }}
      onDragLeave={props.onLeave}
      onDrop={props.onDrop}
      className={
        "flex min-h-[12rem] flex-col rounded-2xl border-2 p-4 transition " +
        (props.survol
          ? isPouvoir
            ? "border-bronze bg-bronze/10"
            : "border-oxblood bg-oxblood/8"
          : isPouvoir
            ? "border-bronze/30 bg-marble-pale/60"
            : "border-oxblood/25 bg-marble-pale/40")
      }
    >
      <div className="flex items-baseline justify-between">
        <div>
          <h3
            className={
              "font-display text-2xl font-semibold tracking-tight " +
              (isPouvoir ? "text-bronze" : "text-oxblood")
            }
          >
            {props.titre}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {props.sous}
          </p>
        </div>
        <span
          className={
            "font-mono text-lg font-semibold " + (isPouvoir ? "text-bronze" : "text-oxblood")
          }
        >
          {props.count}
        </span>
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-2">
        {props.cartes.length === 0 ? (
          <p className="my-auto text-center font-serif text-base italic text-ink-faint">
            {props.videLabel}
          </p>
        ) : (
          props.cartes.map((c) => props.renderCarte(c))
        )}
      </div>
    </div>
  );
}

function Carte({
  carte,
  lang,
  dragging,
  onDragStart,
  onDragEnd,
  onAssign,
  onDelete,
}: {
  carte: CarteTri;
  lang: Lang;
  dragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onAssign: (id: string, col: Colonne) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={
        "group relative cursor-grab rounded-lg bg-marble-pale px-3 py-2.5 shadow-stone ring-1 ring-ink/10 transition active:cursor-grabbing " +
        (dragging ? "opacity-40" : "hover:-translate-y-0.5 hover:shadow-stone-lg")
      }
    >
      <p className="pr-5 font-serif text-base leading-snug text-ink">{carte.texte}</p>
      <button
        type="button"
        onClick={() => onDelete(carte.id)}
        aria-label="×"
        className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded text-ink-faint opacity-0 transition hover:bg-marble-dim hover:text-oxblood group-hover:opacity-100"
      >
        ×
      </button>
      {/* tap-to-assign fallback (touch) */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {carte.colonne !== "pouvoir" && (
          <button
            type="button"
            onClick={() => onAssign(carte.id, "pouvoir")}
            className="rounded-full bg-bronze/12 px-2 py-0.5 font-sans text-[11px] font-medium text-bronze ring-1 ring-bronze/25 transition hover:bg-bronze/20"
          >
            {t(lang, "triAssignerP")}
          </button>
        )}
        {carte.colonne !== "hors" && (
          <button
            type="button"
            onClick={() => onAssign(carte.id, "hors")}
            className="rounded-full bg-oxblood/10 px-2 py-0.5 font-sans text-[11px] font-medium text-oxblood ring-1 ring-oxblood/25 transition hover:bg-oxblood/18"
          >
            {t(lang, "triAssignerH")}
          </button>
        )}
        {carte.colonne !== "non" && (
          <button
            type="button"
            onClick={() => onAssign(carte.id, "non")}
            className="rounded-full px-2 py-0.5 font-sans text-[11px] font-medium text-ink-faint ring-1 ring-ink/15 transition hover:bg-marble-dim"
          >
            {t(lang, "triRendre")}
          </button>
        )}
      </div>
    </div>
  );
}
