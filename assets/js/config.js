// Labels and colors shared by the timeline.

/** Color token for each episode type (used for the dot, label and hover border). */
export const TYPE_COLORS = {
  "Mensagens": "var(--amber)",
  "Dinheiro": "var(--cyan)",
  "Encontro": "var(--amber)",
  "Versão de Flávio": "var(--conf)",
  "Repercussão": "var(--none)",
  "Investigação": "var(--neg)",
};

/** Status keys used in data/episodes.json → pill class and label. */
export const STATUS = {
  conf: { className: "pill--conf", label: "Confirmado por Flávio" },
  neg:  { className: "pill--neg",  label: "Contestado por Flávio" },
  inv:  { className: "pill--inv",  label: "Sob apuração" },
  none: { className: "pill--none", label: "Alegação não verificada" },
};

export const ALL_TYPES = "Todos";

export const DATA_URL = "./data/episodes.json";
