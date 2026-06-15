// "La vue d'en haut" — a guided zoom-out immersion in the spirit of Marcus
// Aurelius (Pensées IX, 30; VII, 48; XII, 24). The cadence widens outward, then
// returns. Each line is shown in turn, calm and expanding; the camera pulls back
// from the body to the cosmos and gently back to the breath.

export interface VueLigne {
  /** the line of text, French-first */
  texte: string;
  /** seconds to dwell on this line before the next */
  duree: number;
  /** relative altitude 0..1 — used to scale the visual zoom-out */
  altitude: number;
}

export const VUE_SCRIPT: VueLigne[] = [
  { texte: "Respire. Laisse tes épaules redescendre.", duree: 6, altitude: 0.02 },
  { texte: "Tu es ici, dans ce corps, en ce lieu, à cette heure.", duree: 7, altitude: 0.05 },
  { texte: "Élève-toi un peu. Vois la pièce, puis le toit sous lequel tu te tiens.", duree: 8, altitude: 0.14 },
  { texte: "Monte encore. La rue, le quartier, la ville étendue dans la lumière.", duree: 8, altitude: 0.26 },
  { texte: "Plus haut. Les fleuves, les forêts, le long fil des routes et des vies.", duree: 8, altitude: 0.4 },
  { texte: "Vois la Terre entière, ronde et bleue, suspendue dans le silence.", duree: 9, altitude: 0.58 },
  { texte: "« Contemple sans cesse la course des astres, comme si tu roulais avec eux. »", duree: 9, altitude: 0.74 },
  { texte: "De cette hauteur, tes soucis tiennent dans un dé. Et pourtant ils sont réels.", duree: 9, altitude: 0.86 },
  { texte: "Regarde combien de vies ont passé avant la tienne, combien viendront après.", duree: 9, altitude: 0.95 },
  { texte: "« Le temps est un fleuve, un torrent violent. À peine une chose paraît, elle est emportée. »", duree: 10, altitude: 1.0 },
  { texte: "Tout cela est bref. Tout cela passe. Cela t'allège, cela ne t'écrase pas.", duree: 9, altitude: 0.9 },
  { texte: "Reviens, doucement. La Terre, la ville, ta rue, ton toit.", duree: 8, altitude: 0.45 },
  { texte: "Te voici de retour dans ce corps, en ce lieu, à cette heure.", duree: 7, altitude: 0.1 },
  { texte: "Une seule chose t'appartient pleinement : l'instant présent, et ce que tu en fais.", duree: 9, altitude: 0.04 },
  { texte: "Respire. Tu peux rouvrir les yeux quand tu es prêt.", duree: 7, altitude: 0.0 },
];

export const VUE_DUREE_TOTALE = VUE_SCRIPT.reduce((s, l) => s + l.duree, 0);
