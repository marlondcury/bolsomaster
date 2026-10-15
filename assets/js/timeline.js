// Renders the filter bar and the episode list.
import { TYPE_COLORS, STATUS, ALL_TYPES } from "./config.js";
import { escapeHtml, formatWhen } from "./utils.js";

function renderStatus(status) {
  const s = STATUS[status];
  return s ? `<span class="pill ${s.className}">${s.label}</span>` : "";
}

function renderSources(sources) {
  return sources
    .map(({ name, url }) =>
      `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)} ↗</a>`)
    .join("");
}

function renderEpisode(ep) {
  const color = TYPE_COLORS[ep.type] ?? "var(--muted)";
  return `
    <li class="event" style="--c:${color}">
      <div class="event__when"><time datetime="${escapeHtml(ep.date)}">${formatWhen(ep.date)}</time></div>
      <span class="event__dot" aria-hidden="true"></span>
      <article class="card">
        <div class="card__meta">
          <span class="card__type">${escapeHtml(ep.type)}</span>
          ${renderStatus(ep.status)}
        </div>
        <h3 class="card__title">${escapeHtml(ep.title)}</h3>
        <p class="card__text">${escapeHtml(ep.text)}</p>
        ${ep.quote ? `<blockquote class="card__quote">${escapeHtml(ep.quote)}</blockquote>` : ""}
        ${ep.response ? `<div class="card__response"><span class="card__response-label">Resposta</span>${escapeHtml(ep.response)}</div>` : ""}
        <div class="card__sources">${renderSources(ep.sources)}</div>
      </article>
    </li>`;
}

function renderFilters(types, active) {
  return types
    .map((type) => {
      const color = TYPE_COLORS[type] ?? "var(--muted)";
      const dot = type === ALL_TYPES ? "" : `<span class="filter__dot" aria-hidden="true"></span>`;
      return `<button type="button" class="filter" data-type="${escapeHtml(type)}" aria-pressed="${type === active}" style="--c:${color}">${dot}${escapeHtml(type)}</button>`;
    })
    .join("");
}

/**
 * Mounts the timeline into the given elements.
 * @param {{ filtersEl: HTMLElement, listEl: HTMLElement, episodes: object[] }} opts
 */
export function mountTimeline({ filtersEl, listEl, episodes }) {
  const types = [ALL_TYPES, ...new Set(episodes.map((e) => e.type))];
  let active = ALL_TYPES;

  const render = () => {
    filtersEl.innerHTML = renderFilters(types, active);
    const visible = episodes.filter((e) => active === ALL_TYPES || e.type === active);
    listEl.innerHTML = visible.map(renderEpisode).join("")
      || `<li class="timeline__status">Nenhum episódio neste filtro.</li>`;
  };

  filtersEl.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");
    if (!button) return;
    active = button.dataset.type;
    render();
  });

  render();
}
