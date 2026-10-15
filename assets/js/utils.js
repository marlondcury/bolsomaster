// Small pure helpers.

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Escapes text for safe insertion into HTML. */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

/**
 * Formats a partial ISO date ("2025", "2025-11" or "2025-11-16")
 * into the two-line label used in the date gutter.
 */
export function formatWhen(date) {
  const [year, month, day] = date.split("-");
  if (!month) return `<b>${year}</b>sem mês`;
  const m = MONTHS[Number(month) - 1];
  if (!day) return `<b>${m}</b>${year}`;
  return `<b>${Number(day)} ${m}</b>${year}`;
}

/** Formats an ISO date as "9 out 2026". */
export function formatShortDate(iso) {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
