import type { Lang } from "./i18n";

export interface RehearseResult {
  /** the rehearsal text — composed, bracing, separating event from judgment */
  texte: string;
  /** the Stoic principle named */
  principe: string;
}

export interface InterlocResult {
  texte: string;
  principe: string;
}

export interface VariationResult {
  /** lines for a "view from above" variation */
  lignes: string[];
}

type Streamed<T> = { result?: T; error?: string } | T;

function parseLast<T>(raw: string): Streamed<T> | null {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const last = lines[lines.length - 1] ?? "";
  if (!last) return null;
  try {
    return JSON.parse(last) as Streamed<T>;
  } catch {
    return null;
  }
}

/**
 * Le matin — the rehearsal. Opus call behind an NDJSON keepalive stream:
 * heartbeats keep the connection alive, then a final { result } | { error } line.
 */
export async function rehearse(input: {
  peur: string;
  lang: Lang;
}): Promise<RehearseResult> {
  const en = input.lang === "en";
  const res = await fetch("/api/portique", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "rehearse", lang: input.lang, peur: input.peur }),
  });

  const raw = await res.text();
  const parsed = parseLast<RehearseResult>(raw);
  const invalid = en ? "Invalid response from the server." : "Réponse invalide du serveur.";

  if (!res.ok) {
    const fallback = en ? `Error ${res.status}` : `Erreur ${res.status}`;
    const msg = parsed && typeof parsed === "object" && "error" in parsed && parsed.error ? parsed.error : fallback;
    throw new Error(msg);
  }
  if (!parsed) throw new Error(invalid);
  if (typeof parsed === "object" && "error" in parsed && parsed.error) throw new Error(parsed.error);
  if (typeof parsed === "object" && "result" in parsed && parsed.result) return parsed.result;
  if (typeof parsed === "object" && "texte" in parsed) return parsed as RehearseResult;
  throw new Error(invalid);
}

/** L'interlocuteur — fast haiku reply, plain JSON. */
export async function interlocuteur(input: {
  question: string;
  lang: Lang;
}): Promise<InterlocResult> {
  const en = input.lang === "en";
  const res = await fetch("/api/portique", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "interlocuteur", lang: input.lang, question: input.question }),
  });
  const data = (await res.json().catch(() => null)) as InterlocResult | { error?: string } | null;
  if (!res.ok || !data) {
    const fallback = en ? `Error ${res.status}` : `Erreur ${res.status}`;
    const msg = data && "error" in data && data.error ? data.error : fallback;
    throw new Error(msg);
  }
  if ("error" in data && data.error) throw new Error(data.error);
  return data as InterlocResult;
}

/** La vue d'en haut — an optional Claude variation of the script (fast, plain JSON). */
export async function variationVue(input: { lang: Lang }): Promise<VariationResult> {
  const en = input.lang === "en";
  const res = await fetch("/api/portique", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "vue", lang: input.lang }),
  });
  const data = (await res.json().catch(() => null)) as VariationResult | { error?: string } | null;
  if (!res.ok || !data) {
    const fallback = en ? `Error ${res.status}` : `Erreur ${res.status}`;
    const msg = data && "error" in data && data.error ? data.error : fallback;
    throw new Error(msg);
  }
  if ("error" in data && data.error) throw new Error(data.error);
  return data as VariationResult;
}
