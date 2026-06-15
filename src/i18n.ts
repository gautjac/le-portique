export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const FR: Dict = {
  appName: "Le Portique",
  tagline: "La pratique stoïcienne, au quotidien.",
  // nav
  navMatin: "Le matin",
  navTri: "Le tri",
  navSoir: "Le soir",
  navVue: "La vue d'en haut",
  navInterloc: "L'interlocuteur",
  // streak
  serie: "série",
  serieJours: "jours de pratique",
  serieZero: "Commence ta série aujourd'hui.",
  matinFait: "matin",
  soirFait: "soir",
  // maxim
  maximeDuJour: "Maxime du jour",
  // matin
  matinTitre: "Le matin — premeditatio malorum",
  matinIntro:
    "Avant que le jour ne commence, nomme ce que tu redoutes. On le répétera ensemble, calmement, pour le rencontrer sans qu'il te surprenne.",
  matinLabel: "Qu'est-ce que tu redoutes aujourd'hui ?",
  matinPlaceholder: "Une réunion difficile, une nouvelle attendue, une conversation à avoir…",
  matinBouton: "Répéter avec le Portique",
  matinEnCours: "Le Portique réfléchit…",
  matinRefaire: "Reprendre",
  matinMarquer: "Marquer le matin comme fait",
  matinDejaFait: "Matin fait",
  matinVide: "Écris d'abord ce que tu redoutes.",
  // tri
  triTitre: "Le tri — la dichotomie du contrôle",
  triIntro:
    "Écris tes soucis du jour, un par carte. Puis range chacun : à gauche ce qui dépend de toi, à droite ce qui n'en dépend pas.",
  triAjout: "Ajoute un souci…",
  triAjouter: "Ajouter",
  triNonClasses: "À trier",
  triPouvoir: "En mon pouvoir",
  triPouvoirSous: "jugements · choix · effort",
  triHors: "Hors de mon pouvoir",
  triHorsSous: "résultats · autrui · réputation · le passé",
  triVideNon: "Aucune carte à trier. Ajoute tes soucis ci-dessus.",
  triVideCol: "Dépose une carte ici.",
  triAssignerP: "↤ en mon pouvoir",
  triAssignerH: "hors de mon pouvoir ↦",
  triRendre: "↩ à trier",
  triFaitLe: "Tri enregistré",
  triNudge:
    "Ton énergie est mieux placée à gauche. Ce qui est hors de ton pouvoir, accueille-le ; ce qui en dépend, agis.",
  triTally: "cartes",
  // soir
  soirTitre: "Le soir — l'examen de Sénèque",
  soirIntro:
    "« Quand la lumière est retirée et que ma femme s'est tue, j'examine ma journée entière et je repasse mes actes et mes paroles. » Trois questions, chaque soir.",
  soirMal: "Qu'ai-je mal fait ?",
  soirBien: "Qu'ai-je bien fait ?",
  soirMieux: "Que puis-je mieux faire ?",
  soirPlaceholderMal: "Un emportement, une parole de trop, une heure gaspillée…",
  soirPlaceholderBien: "Une patience tenue, un devoir accompli, une bonté offerte…",
  soirPlaceholderMieux: "Demain, je m'exercerai à…",
  soirMarquer: "Clore la journée",
  soirDejaFait: "Soir fait",
  soirVide: "Réponds à au moins une question.",
  // vue
  vueTitre: "La vue d'en haut",
  vueIntro:
    "Une courte immersion guidée, dans l'esprit de Marc Aurèle. Élève-toi au-dessus de tes soucis, puis reviens. Trouve un endroit calme.",
  vueCommencer: "Commencer l'immersion",
  vueArreter: "Arrêter",
  vueVariation: "Une variation par le Portique",
  vueVariationEnCours: "Le Portique compose…",
  vueDuree: "≈ 2 minutes",
  vueFini: "Reste un instant dans ce calme.",
  // interlocuteur
  interlocTitre: "L'interlocuteur",
  interlocIntro:
    "Pose une question au Portique. Il répond d'une voix stoïcienne composée — Épictète, Sénèque, Marc Aurèle mêlés — nomme le principe en jeu, et te ramène à l'amor fati.",
  interlocPlaceholder: "Comment ne pas me laisser ronger par ce que je ne peux changer ?",
  interlocBouton: "Demander",
  interlocEnCours: "Le Portique répond…",
  interlocPrincipe: "Principe",
  interlocVide: "Écris ta question.",
  interlocRelance: "Reformuler",
  // onboarding
  onbTitre: "Bienvenue sous le Portique",
  onbSousTitre: "le portique peint",
  onbCorps:
    "Ce lieu porte le nom du Portique peint d'Athènes — la Stoa Poikilè — où Zénon enseignait. C'est un gymnase pour l'âme : on s'y exerce, chaque jour, à distinguer ce qui dépend de nous de ce qui n'en dépend pas.",
  onbMatin: "Le matin, on répète d'avance les épreuves du jour.",
  onbTri: "Le jour, on trie ses soucis : en mon pouvoir, ou hors de mon pouvoir.",
  onbSoir: "Le soir, on examine la journée, à la manière de Sénèque.",
  onbEntrer: "Entrer",
  // misc
  erreur: "Quelque chose a échoué. Réessaie.",
  langueBouton: "EN",
  langueAria: "Passer à l'anglais",
  date: "Aujourd'hui",
  docTitre: "Le Portique — la pratique stoïcienne au quotidien",
  docDescription:
    "Le Portique — un gymnase de pratique stoïcienne au quotidien. Le matin, le tri, le soir : rencontrer le jour avec équanimité.",
};

const EN: Dict = {
  appName: "Le Portique",
  tagline: "Daily Stoic practice.",
  navMatin: "Morning",
  navTri: "The sort",
  navSoir: "Evening",
  navVue: "The view from above",
  navInterloc: "The interlocutor",
  serie: "streak",
  serieJours: "days of practice",
  serieZero: "Start your streak today.",
  matinFait: "morning",
  soirFait: "evening",
  maximeDuJour: "Maxim of the day",
  matinTitre: "Morning — premeditatio malorum",
  matinIntro:
    "Before the day begins, name what you dread. We'll rehearse meeting it together, calmly, so it can't catch you off guard.",
  matinLabel: "What do you dread today?",
  matinPlaceholder: "A hard meeting, news you're waiting on, a conversation to have…",
  matinBouton: "Rehearse with the Portique",
  matinEnCours: "The Portique is thinking…",
  matinRefaire: "Start over",
  matinMarquer: "Mark morning done",
  matinDejaFait: "Morning done",
  matinVide: "First write what you dread.",
  triTitre: "The sort — the dichotomy of control",
  triIntro:
    "Write today's worries, one per card. Then place each: on the left what is up to you, on the right what is not.",
  triAjout: "Add a worry…",
  triAjouter: "Add",
  triNonClasses: "To sort",
  triPouvoir: "Within my power",
  triPouvoirSous: "judgments · choices · effort",
  triHors: "Beyond my power",
  triHorsSous: "outcomes · others · reputation · the past",
  triVideNon: "No cards to sort. Add your worries above.",
  triVideCol: "Drop a card here.",
  triAssignerP: "↤ within my power",
  triAssignerH: "beyond my power ↦",
  triRendre: "↩ to sort",
  triFaitLe: "Sort saved",
  triNudge:
    "Your energy is better spent on the left. What is beyond your power, accept; what is up to you, act.",
  triTally: "cards",
  soirTitre: "Evening — Seneca's review",
  soirIntro:
    "“When the light is removed and my wife is silent, I examine my entire day and retrace my deeds and words.” Three questions, every evening.",
  soirMal: "What did I do badly?",
  soirBien: "What did I do well?",
  soirMieux: "What can I do better?",
  soirPlaceholderMal: "A flash of temper, a word too many, an hour wasted…",
  soirPlaceholderBien: "Patience held, a duty done, a kindness offered…",
  soirPlaceholderMieux: "Tomorrow I will practise…",
  soirMarquer: "Close the day",
  soirDejaFait: "Evening done",
  soirVide: "Answer at least one question.",
  vueTitre: "The view from above",
  vueIntro:
    "A short guided immersion, in the spirit of Marcus Aurelius. Rise above your worries, then return. Find a quiet place.",
  vueCommencer: "Begin the immersion",
  vueArreter: "Stop",
  vueVariation: "A variation by the Portique",
  vueVariationEnCours: "The Portique is composing…",
  vueDuree: "≈ 2 minutes",
  vueFini: "Stay a moment in this calm.",
  interlocTitre: "The interlocutor",
  interlocIntro:
    "Ask the Portique a question. It answers in a composed Stoic voice — Epictetus, Seneca, Marcus blended — names the principle at play, and points you toward amor fati.",
  interlocPlaceholder: "How do I stop being gnawed by what I cannot change?",
  interlocBouton: "Ask",
  interlocEnCours: "The Portique is answering…",
  interlocPrincipe: "Principle",
  interlocVide: "Write your question.",
  interlocRelance: "Rephrase",
  onbTitre: "Welcome to the Portique",
  onbSousTitre: "the painted porch",
  onbCorps:
    "This place is named for the Painted Porch of Athens — the Stoa Poikile — where Zeno taught. It is a gym for the soul: a daily exercise in telling apart what is up to us from what is not.",
  onbMatin: "In the morning, we rehearse the day's trials in advance.",
  onbTri: "By day, we sort our worries: within my power, or beyond it.",
  onbSoir: "In the evening, we examine the day, as Seneca did.",
  onbEntrer: "Enter",
  erreur: "Something failed. Try again.",
  langueBouton: "FR",
  langueAria: "Switch to French",
  date: "Today",
  docTitre: "Le Portique — daily Stoic practice",
  docDescription:
    "Le Portique — a gymnasium for daily Stoic practice. Morning, the sort, evening: meeting the day with equanimity.",
};

const DICTS: Record<Lang, Dict> = { fr: FR, en: EN };

export function t(lang: Lang, key: string): string {
  return DICTS[lang][key] ?? FR[key] ?? key;
}
