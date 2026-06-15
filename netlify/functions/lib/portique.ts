import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-opus-4-8"; // depth — le matin / rehearsal
const FAST = "claude-haiku-4-5"; // low-latency — l'interlocuteur / vue variation

export type Lang = "fr" | "en";

function client(): Anthropic {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) throw new Error("Server missing CLAUDE_API_KEY");
  return new Anthropic({ apiKey, baseURL: "https://api.anthropic.com" });
}

const VOICE_FR = `Tu es « le Portique » — la voix d'un maître stoïcien, mélange d'Épictète, de Sénèque et de Marc Aurèle. Tu écris en français québécois naturel, soigné, sans anglicismes inutiles. Ta voix est posée, lucide, fortifiante — jamais mièvre, jamais consolante à la manière du développement personnel. Tu ne dorlotes pas : tu redresses. Tu tutoies l'interlocuteur. Tu t'appuies sur les vrais principes stoïciens (la dichotomie du contrôle ; le trouble vient du jugement, non de l'événement ; l'amor fati ; vivre selon la nature et la raison ; le devoir présent). Tu n'inventes jamais de fausses citations ; si tu cites, tu restes fidèle à l'esprit des textes sans fabriquer de références précises.`;

const VOICE_EN = `You are "the Portique" — the voice of a Stoic teacher, a blend of Epictetus, Seneca and Marcus Aurelius. You write in composed, lucid, bracing English — never saccharine, never self-help consolation. You do not coddle; you set the spine straight. You address the person as "you". You draw on the genuine Stoic principles (the dichotomy of control; that distress comes from judgment, not from the event; amor fati; living according to nature and reason; the present duty). You never invent fake quotations.`;

function voice(lang: Lang): string {
  return lang === "en" ? VOICE_EN : VOICE_FR;
}

// ── Le matin — premeditatio malorum (opus, structured) ──────────────────────

export interface RehearseResult {
  texte: string;
  principe: string;
}

const REHEARSE_TOOL: Anthropic.Tool = {
  name: "repondre_repetition",
  description: "Return the rehearsal for the morning premeditatio malorum.",
  input_schema: {
    type: "object",
    required: ["texte", "principe"],
    properties: {
      texte: {
        type: "string",
        description:
          "The rehearsal, in the requested language. 3–5 short paragraphs. Separate the EVENT (what may happen) from the JUDGMENT (the story the mind adds). Rehearse meeting it with equanimity. Composed and bracing, never coddling. No bullet lists; flowing prose. No greeting, no sign-off.",
      },
      principe: {
        type: "string",
        description:
          "The single Stoic principle most at play, as a short phrase in the requested language (e.g. « Le jugement, non l'événement », « La dichotomie du contrôle », « Amor fati »).",
      },
    },
  },
};

export async function rehearse(peur: string, lang: Lang): Promise<RehearseResult> {
  const userText =
    lang === "en"
      ? `The person names what they dread today:\n\n"${peur.slice(0, 2000)}"\n\nRehearse it with them. Name plainly what may actually happen, then separate it from the judgment the mind piles on top. Show them how to meet it standing. End by turning them toward what is within their power. Answer only by calling repondre_repetition.`
      : `La personne nomme ce qu'elle redoute aujourd'hui :\n\n« ${peur.slice(0, 2000)} »\n\nRépète l'épreuve avec elle. Nomme sans détour ce qui peut réellement arriver, puis sépare-le du jugement que l'esprit ajoute par-dessus. Montre-lui comment le rencontrer debout. Termine en la tournant vers ce qui dépend d'elle. Réponds uniquement en appelant repondre_repetition.`;

  const res = await client().messages.create({
    model: MODEL,
    max_tokens: 1400,
    system: voice(lang),
    messages: [{ role: "user", content: userText }],
    tools: [REHEARSE_TOOL],
    tool_choice: { type: "tool", name: "repondre_repetition" },
  });

  const tool = res.content.find((b) => b.type === "tool_use");
  if (!tool || tool.type !== "tool_use") {
    throw new Error(lang === "en" ? "No rehearsal returned." : "Aucune répétition renvoyée.");
  }
  const input = tool.input as { texte?: string; principe?: string };
  const texte = String(input.texte ?? "").trim();
  if (!texte) throw new Error(lang === "en" ? "Empty rehearsal." : "Répétition vide.");
  return {
    texte,
    principe: String(input.principe ?? "").trim() || (lang === "en" ? "The dichotomy of control" : "La dichotomie du contrôle"),
  };
}

// ── L'interlocuteur — fast composed reply (haiku, structured) ────────────────

export interface InterlocResult {
  texte: string;
  principe: string;
}

const INTERLOC_TOOL: Anthropic.Tool = {
  name: "repondre_interlocuteur",
  description: "Answer the question in the Stoic voice.",
  input_schema: {
    type: "object",
    required: ["texte", "principe"],
    properties: {
      texte: {
        type: "string",
        description:
          "A composed Stoic reply in the requested language. 1–3 tight paragraphs. Name the relevant principle within the prose, and point toward amor fati. Bracing, never coddling. No greeting, no sign-off.",
      },
      principe: {
        type: "string",
        description: "The single principle named, as a short phrase in the requested language.",
      },
    },
  },
};

export async function interlocuteur(question: string, lang: Lang): Promise<InterlocResult> {
  const userText =
    lang === "en"
      ? `A question for the Portique:\n\n"${question.slice(0, 1500)}"\n\nAnswer in your Stoic voice. Name the relevant principle and point toward amor fati. Answer only by calling repondre_interlocuteur.`
      : `Une question pour le Portique :\n\n« ${question.slice(0, 1500)} »\n\nRéponds de ta voix stoïcienne. Nomme le principe en jeu et ramène vers l'amor fati. Réponds uniquement en appelant repondre_interlocuteur.`;

  const res = await client().messages.create({
    model: FAST,
    max_tokens: 700,
    system: voice(lang),
    messages: [{ role: "user", content: userText }],
    tools: [INTERLOC_TOOL],
    tool_choice: { type: "tool", name: "repondre_interlocuteur" },
  });

  const tool = res.content.find((b) => b.type === "tool_use");
  if (!tool || tool.type !== "tool_use") {
    throw new Error(lang === "en" ? "No reply returned." : "Aucune réponse renvoyée.");
  }
  const input = tool.input as { texte?: string; principe?: string };
  const texte = String(input.texte ?? "").trim();
  if (!texte) throw new Error(lang === "en" ? "Empty reply." : "Réponse vide.");
  return {
    texte,
    principe: String(input.principe ?? "").trim() || (lang === "en" ? "Amor fati" : "Amor fati"),
  };
}

// ── La vue d'en haut — optional variation (haiku, structured) ────────────────

export interface VariationResult {
  lignes: string[];
}

const VUE_TOOL: Anthropic.Tool = {
  name: "composer_vue",
  description: "Compose a 'view from above' guided immersion script.",
  input_schema: {
    type: "object",
    required: ["lignes"],
    properties: {
      lignes: {
        type: "array",
        description:
          "12 to 15 short lines, in the requested language, for a guided 'view from above' in the spirit of Marcus Aurelius. Each line is one calm sentence. The sequence rises from the body outward to the cosmos, dwells, then gently returns to the breath and the present moment. Quiet, expansive, never grandiose.",
        items: { type: "string" },
      },
    },
  },
};

export async function variationVue(lang: Lang): Promise<VariationResult> {
  const userText =
    lang === "en"
      ? `Compose a fresh 'view from above' immersion in the spirit of Marcus Aurelius (Meditations IX,30; VII,48; XII,24). Rise from the body to the cosmos, dwell, then return to the breath and the present. Answer only by calling composer_vue.`
      : `Compose une nouvelle « vue d'en haut » dans l'esprit de Marc Aurèle (Pensées IX,30 ; VII,48 ; XII,24). Élève-toi du corps jusqu'au cosmos, demeure un instant, puis reviens au souffle et au présent. Réponds uniquement en appelant composer_vue.`;

  const res = await client().messages.create({
    model: FAST,
    max_tokens: 900,
    system: voice(lang),
    messages: [{ role: "user", content: userText }],
    tools: [VUE_TOOL],
    tool_choice: { type: "tool", name: "composer_vue" },
  });

  const tool = res.content.find((b) => b.type === "tool_use");
  if (!tool || tool.type !== "tool_use") {
    throw new Error(lang === "en" ? "No variation returned." : "Aucune variation renvoyée.");
  }
  const input = tool.input as { lignes?: unknown };
  const lignes = Array.isArray(input.lignes)
    ? input.lignes.map((l) => String(l).trim()).filter(Boolean)
    : [];
  if (lignes.length < 6) throw new Error(lang === "en" ? "Variation too short." : "Variation trop courte.");
  return { lignes };
}
