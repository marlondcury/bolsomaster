// Entry point: loads the data and mounts the page.
import { DATA_URL } from "./config.js";
import { formatShortDate } from "./utils.js";
import { mountTimeline } from "./timeline.js";

async function loadData() {
  const response = await fetch(DATA_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function init() {
  const listEl = document.getElementById("timeline");
  const filtersEl = document.getElementById("filters");
  const updatedEl = document.getElementById("updated-at");

  try {
    const { updatedAt, episodes } = await loadData();
    if (updatedEl && updatedAt) updatedEl.textContent = `Atualizado até ${formatShortDate(updatedAt)}`;
    mountTimeline({ filtersEl, listEl, episodes });
  } catch (error) {
    console.error("Falha ao carregar episódios:", error);
    listEl.innerHTML = `<li class="timeline__status">Não foi possível carregar a linha do tempo. Recarregue a página.</li>`;
  }
}

init();
