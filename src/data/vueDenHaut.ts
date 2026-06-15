// "La vue d'en haut" — a guided zoom-out immersion in the spirit of Marcus
// Aurelius (Pensées IX, 30; VII, 48; XII, 24). The cadence widens outward, then
// returns. Each line is shown in turn, calm and expanding; the camera pulls back
// from the body to the cosmos and gently back to the breath.
//
// Fully bilingual: each line carries an authentic French and English rendering.
// The two quoted lines are genuine Marcus Aurelius:
//   · « Contemple sans cesse la course des astres… » — Pensées VII, 47
//   · « Le temps est un fleuve… » — Pensées IV, 43
// rendered from the canonical sources (the English from standard public-domain
// translations).

import type { Lang } from "../i18n";

export interface VueLigne {
  /** the line of text, French + English */
  fr: string;
  en: string;
  /** seconds to dwell on this line before the next */
  duree: number;
  /** relative altitude 0..1 — used to scale the visual zoom-out */
  altitude: number;
}

export const VUE_SCRIPT: VueLigne[] = [
  {
    fr: "Respire. Laisse tes épaules redescendre.",
    en: "Breathe. Let your shoulders come down.",
    duree: 6,
    altitude: 0.02,
  },
  {
    fr: "Tu es ici, dans ce corps, en ce lieu, à cette heure.",
    en: "You are here, in this body, in this place, at this hour.",
    duree: 7,
    altitude: 0.05,
  },
  {
    fr: "Élève-toi un peu. Vois la pièce, puis le toit sous lequel tu te tiens.",
    en: "Rise a little. See the room, then the roof you stand beneath.",
    duree: 8,
    altitude: 0.14,
  },
  {
    fr: "Monte encore. La rue, le quartier, la ville étendue dans la lumière.",
    en: "Climb higher. The street, the neighbourhood, the city spread out in the light.",
    duree: 8,
    altitude: 0.26,
  },
  {
    fr: "Plus haut. Les fleuves, les forêts, le long fil des routes et des vies.",
    en: "Higher still. The rivers, the forests, the long thread of roads and lives.",
    duree: 8,
    altitude: 0.4,
  },
  {
    fr: "Vois la Terre entière, ronde et bleue, suspendue dans le silence.",
    en: "See the whole Earth, round and blue, hung in the silence.",
    duree: 9,
    altitude: 0.58,
  },
  {
    fr: "« Contemple sans cesse la course des astres, comme si tu roulais avec eux. »",
    en: "“Watch the courses of the stars as if you revolved along with them.”",
    duree: 9,
    altitude: 0.74,
  },
  {
    fr: "De cette hauteur, tes soucis tiennent dans un dé. Et pourtant ils sont réels.",
    en: "From this height, your worries fit in a thimble. And yet they are real.",
    duree: 9,
    altitude: 0.86,
  },
  {
    fr: "Regarde combien de vies ont passé avant la tienne, combien viendront après.",
    en: "See how many lives have passed before yours, how many will come after.",
    duree: 9,
    altitude: 0.95,
  },
  {
    fr: "« Le temps est un fleuve, un torrent violent. À peine une chose paraît, elle est emportée. »",
    en: "“Time is a river, a violent current of things. No sooner is each seen than it is swept away.”",
    duree: 10,
    altitude: 1.0,
  },
  {
    fr: "Tout cela est bref. Tout cela passe. Cela t'allège, cela ne t'écrase pas.",
    en: "All of this is brief. All of this passes. It lightens you; it does not crush you.",
    duree: 9,
    altitude: 0.9,
  },
  {
    fr: "Reviens, doucement. La Terre, la ville, ta rue, ton toit.",
    en: "Return, gently. The Earth, the city, your street, your roof.",
    duree: 8,
    altitude: 0.45,
  },
  {
    fr: "Te voici de retour dans ce corps, en ce lieu, à cette heure.",
    en: "Here you are, back in this body, in this place, at this hour.",
    duree: 7,
    altitude: 0.1,
  },
  {
    fr: "Une seule chose t'appartient pleinement : l'instant présent, et ce que tu en fais.",
    en: "One thing alone is fully yours: the present moment, and what you make of it.",
    duree: 9,
    altitude: 0.04,
  },
  {
    fr: "Respire. Tu peux rouvrir les yeux quand tu es prêt.",
    en: "Breathe. You may open your eyes when you are ready.",
    duree: 7,
    altitude: 0.0,
  },
];

export const VUE_DUREE_TOTALE = VUE_SCRIPT.reduce((s, l) => s + l.duree, 0);

/** Pick the line text in the active language. */
export function ligneTexte(l: VueLigne, lang: Lang): string {
  return lang === "en" ? l.en : l.fr;
}
