import Dexie, { type Table } from "dexie";

/** A single sorted worry-card in Le Tri. */
export interface CarteTri {
  id: string;
  texte: string;
  /** "non" = not yet sorted; "pouvoir" = en mon pouvoir; "hors" = hors de mon pouvoir */
  colonne: "non" | "pouvoir" | "hors";
  ordre: number;
}

/** One day's whole practice, keyed by local ISO date (YYYY-MM-DD). */
export interface JourEntree {
  date: string; // primary key
  // Le matin — premeditatio malorum
  matinPeur?: string;
  matinRepetition?: string; // the Portique's rehearsal (opus)
  matinFaitLe?: number; // timestamp when morning was completed
  // Le tri — dichotomy of control
  cartes?: CarteTri[];
  triFaitLe?: number;
  // Le soir — Seneca's review
  soirMal?: string; // Qu'ai-je mal fait ?
  soirBien?: string; // Qu'ai-je bien fait ?
  soirMieux?: string; // Que puis-je mieux faire ?
  soirFaitLe?: number;
  majLe: number; // last updated
}

export interface Reglages {
  cle: "reglages";
  langue: "fr" | "en";
  onboardingVu: boolean;
}

class PortiqueDB extends Dexie {
  jours!: Table<JourEntree, string>;
  reglages!: Table<Reglages, string>;

  constructor() {
    super("le-portique");
    this.version(1).stores({
      jours: "date",
      reglages: "cle",
    });
  }
}

export const db = new PortiqueDB();

/** Local calendar date as YYYY-MM-DD (not UTC — the ritual is keyed to the user's day). */
export function aujourdHui(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Read or lazily create today's entry. */
export async function getJour(date: string): Promise<JourEntree> {
  const existing = await db.jours.get(date);
  if (existing) return existing;
  return { date, majLe: Date.now() };
}

export async function saveJour(patch: Partial<JourEntree> & { date: string }): Promise<void> {
  const current = await getJour(patch.date);
  await db.jours.put({ ...current, ...patch, majLe: Date.now() });
}

export async function getReglages(): Promise<Reglages> {
  const r = await db.reglages.get("reglages");
  if (r) return r;
  const init: Reglages = { cle: "reglages", langue: "fr", onboardingVu: false };
  await db.reglages.put(init);
  return init;
}

export async function setReglages(patch: Partial<Reglages>): Promise<void> {
  const current = await getReglages();
  await db.reglages.put({ ...current, ...patch });
}

/** Whether a day counts toward the ritual streak: both matin AND soir done. */
export function jourComplet(j: JourEntree | undefined): boolean {
  return !!(j && j.matinFaitLe && j.soirFaitLe);
}

/**
 * Quiet ritual streak: count back from today (or yesterday if today not yet
 * complete) over consecutive complete days.
 */
export function calculerSerie(jours: JourEntree[], dateRef: string): number {
  const byDate = new Map(jours.map((j) => [j.date, j]));
  const parse = (s: string) => new Date(s + "T00:00:00");
  const fmt = aujourdHui;

  let streak = 0;
  const cursor = parse(dateRef);

  // If today isn't complete yet, the streak can still stand on yesterday's back.
  if (!jourComplet(byDate.get(fmt(cursor)))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  // Count consecutive complete days going backward.
  while (jourComplet(byDate.get(fmt(cursor)))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
