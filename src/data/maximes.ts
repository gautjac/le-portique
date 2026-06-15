// Curated dataset of REAL, well-known Stoic passages — correctly attributed.
// French renderings are faithful translations of the canonical sources; the
// English line is a standard public-domain rendering for reference. No invented
// quotes. Sources: Epictetus (Enchiridion / Discourses), Marcus Aurelius
// (Meditations / Τὰ εἰς ἑαυτόν), Seneca (Letters to Lucilius / On the Shortness
// of Life / On Anger).

export type Auteur = "Épictète" | "Marc Aurèle" | "Sénèque";

export interface Maxime {
  id: string;
  fr: string;
  en: string;
  auteur: Auteur;
  source: string;
  /** the Stoic principle this passage chiefly illustrates */
  principe: string;
}

export const MAXIMES: Maxime[] = [
  {
    id: "ench-5",
    fr: "Ce ne sont pas les choses qui troublent les hommes, mais les jugements qu'ils portent sur les choses.",
    en: "Men are disturbed not by things, but by the opinions they form about things.",
    auteur: "Épictète",
    source: "Manuel (Enchiridion), V",
    principe: "Le jugement, non l'événement",
  },
  {
    id: "ench-1",
    fr: "Il y a des choses qui dépendent de nous, et d'autres qui n'en dépendent pas.",
    en: "Some things are within our power, while others are not.",
    auteur: "Épictète",
    source: "Manuel (Enchiridion), I",
    principe: "La dichotomie du contrôle",
  },
  {
    id: "ench-8",
    fr: "Ne demande pas que les choses arrivent comme tu le veux, mais veuille qu'elles arrivent comme elles arrivent, et tu seras heureux.",
    en: "Do not seek to have events happen as you wish, but wish them to happen as they do happen, and your life will go well.",
    auteur: "Épictète",
    source: "Manuel (Enchiridion), VIII",
    principe: "Amor fati",
  },
  {
    id: "med-4-7",
    fr: "Retranche le jugement, et le « j'ai été lésé » est retranché. Retranche le « j'ai été lésé », et le dommage l'est aussi.",
    en: "Remove the judgment, and you have removed the thought 'I am hurt'; remove the thought 'I am hurt', and the hurt itself is removed.",
    auteur: "Marc Aurèle",
    source: "Pensées, IV, 7",
    principe: "Le jugement, non l'événement",
  },
  {
    id: "med-8-47",
    fr: "Si quelque chose d'extérieur te peine, ce n'est pas la chose qui te trouble, mais le jugement que tu portes sur elle ; et il dépend de toi de l'effacer à l'instant.",
    en: "If you are pained by anything external, it is not the thing that disturbs you, but your judgment about it; and it is in your power to wipe out that judgment now.",
    auteur: "Marc Aurèle",
    source: "Pensées, VIII, 47",
    principe: "Le jugement dépend de toi",
  },
  {
    id: "med-2-1",
    fr: "Dès l'aube, dis-toi : je rencontrerai un indiscret, un ingrat, un violent, un fourbe… mais aucun ne peut me faire de mal, car nul ne saurait m'entraîner dans la honte.",
    en: "Begin the morning by saying to yourself: I shall meet with the meddler, the ungrateful, the violent, the deceitful — but none can implicate me in what is base.",
    auteur: "Marc Aurèle",
    source: "Pensées, II, 1",
    principe: "Premeditatio malorum",
  },
  {
    id: "med-5-1",
    fr: "Au point du jour, quand il te coûte de t'éveiller, aie cette pensée prête : je m'éveille pour faire œuvre d'homme.",
    en: "At dawn, when you have trouble getting out of bed, tell yourself: I am rising to do the work of a human being.",
    auteur: "Marc Aurèle",
    source: "Pensées, V, 1",
    principe: "Le devoir du jour",
  },
  {
    id: "med-7-9",
    fr: "Toutes choses sont entrelacées les unes aux autres, et leur lien est sacré.",
    en: "All things are woven together, and the bond is holy.",
    auteur: "Marc Aurèle",
    source: "Pensées, VII, 9",
    principe: "La vue d'en haut",
  },
  {
    id: "med-9-6",
    fr: "Un jugement présent conforme à la nature, une action présente au service du commun, une disposition présente satisfaite de tout ce qui survient : cela suffit.",
    en: "A present judgment grounded in nature, a present act for the common good, a present disposition content with all that befalls — this is enough.",
    auteur: "Marc Aurèle",
    source: "Pensées, IX, 6",
    principe: "Vivre le présent",
  },
  {
    id: "sen-ep-13",
    fr: "Nous souffrons plus souvent en imagination qu'en réalité.",
    en: "We suffer more often in imagination than in reality.",
    auteur: "Sénèque",
    source: "Lettres à Lucilius, XIII",
    principe: "Le jugement, non l'événement",
  },
  {
    id: "sen-brev-1",
    fr: "Ce n'est pas que nous ayons peu de temps à vivre, mais nous en perdons beaucoup.",
    en: "It is not that we have a short time to live, but that we waste much of it.",
    auteur: "Sénèque",
    source: "De la brièveté de la vie, I",
    principe: "Le prix du temps",
  },
  {
    id: "sen-ep-1",
    fr: "Revendique ton bien : ressaisis-toi toi-même ; et ce temps qu'on te dérobait, recueille-le, garde-le.",
    en: "Lay hold of your time: gather and guard the hours that until now were being taken from you.",
    auteur: "Sénèque",
    source: "Lettres à Lucilius, I",
    principe: "Le prix du temps",
  },
  {
    id: "sen-ep-71",
    fr: "Celui qui ne sait vers quel port il fait voile, aucun vent ne lui est favorable.",
    en: "If a man does not know to which port he is steering, no wind is favorable to him.",
    auteur: "Sénèque",
    source: "Lettres à Lucilius, LXXI",
    principe: "Vivre selon un dessein",
  },
  {
    id: "sen-ira-3-13",
    fr: "Le meilleur remède à la colère, c'est le délai.",
    en: "The greatest remedy for anger is delay.",
    auteur: "Sénèque",
    source: "De la colère, III, 13",
    principe: "La pause entre l'impression et l'assentiment",
  },
  {
    id: "ench-50",
    fr: "Quels que soient les principes que tu te proposes, tiens-les pour des lois, comme s'il y avait impiété à les transgresser.",
    en: "Whatever principles you put before yourself, hold fast to them as laws that it would be impious to transgress.",
    auteur: "Épictète",
    source: "Manuel (Enchiridion), L",
    principe: "La constance",
  },
  {
    id: "ench-20",
    fr: "Souviens-toi que ce n'est pas celui qui t'injurie ou qui te frappe qui t'outrage, mais l'opinion que ces gens t'outragent.",
    en: "Remember that it is not he who reviles or strikes you who insults you, but your opinion that these things are insulting.",
    auteur: "Épictète",
    source: "Manuel (Enchiridion), XX",
    principe: "Le jugement, non l'événement",
  },
  {
    id: "med-6-2",
    fr: "Que tu grelottes ou que tu aies chaud à faire ton devoir, peu importe ; pourvu que tu le fasses.",
    en: "Let it make no difference to you whether you are cold or warm in doing your duty — provided that you do it.",
    auteur: "Marc Aurèle",
    source: "Pensées, VI, 2",
    principe: "Le devoir du jour",
  },
  {
    id: "med-10-16",
    fr: "Ne discute plus de ce que doit être l'homme de bien : sois-le.",
    en: "Waste no more time arguing about what a good man should be. Be one.",
    auteur: "Marc Aurèle",
    source: "Pensées, X, 16",
    principe: "L'action, non la théorie",
  },
];

/**
 * Deterministic maxim of the day: same date → same maxim, advancing through the
 * set across days. Keyed on the local calendar date so it changes at midnight.
 */
export function maximeDuJour(dateISO: string): Maxime {
  let hash = 0;
  for (let i = 0; i < dateISO.length; i++) {
    hash = (hash * 31 + dateISO.charCodeAt(i)) | 0;
  }
  // mix the day-of-epoch so consecutive days differ even with similar strings
  const epochDay = Math.floor(new Date(dateISO + "T00:00:00").getTime() / 86_400_000);
  const idx = Math.abs(hash + epochDay) % MAXIMES.length;
  return MAXIMES[idx];
}
