/*
  COSC 219 — Lab 9 · main.js
  The only file that touches the page.
*/

import { TRAIL_IDS, fetchTrail } from "./api.js"
import{ loadSome, uiState } from "./app.js"


/* Collect the four state panels by id. */
const loading = document.querySelector("#state-loading");
const error = document.querySelector("#state-error");
const empty = document.querySelector("#state-empty");
const loaded = document.querySelector("#state-loaded");
const panels = {loading, error, empty, loaded};
const loadBtn = document.querySelector("#load");
const grid = document.querySelector("#grid");
/* show(state) — toggle d-none so exactly ONE panel is visible.

   Bootstrap's d-none is display:none, so this needs no CSS of your own:
     el.classList.toggle("d-none", name !== state);
*/
function show(state) {
  Object.entries(panels).forEach(([name, el]) => el.classList.toggle("d-none", name !== state));
}

/* card(trail) — one column holding a .card.

   You may build the card's shell with a template string, because it
   contains no data. The trail's name and description go in AFTERWARDS
   with textContent. Lab 7's rule has not changed. */

function card(trail) {
  const col = document.createElement("div");
  col.className = "col";
  col.innerHTML = `
  <div class="card mt-3">
    <div class="card-body">
      <h1 class="card-title h5"></h1>
      <p class="card-text"></p>
    </div>
  </div>`;
  const title = col.querySelector(".card-title");
  const txt = col.querySelector(".card-text");
  title.textContent = trail.name;
  txt.textContent = `${trail.km} km - ${trail.rating}`;
  return col;
}

/* load() — the sequence:

     1. show the loading state
     2. await the data
     3. work out the state with uiState, fill the grid if it is "loaded"
     4. show that state
     5. if anything throws, put the message in the error panel and show it
*/
async function load() {
  try {
    grid.textContent = "";
    show("loading");
    const items = await loadSome(TRAIL_IDS);
    const results = await Promise.allSettled(TRAIL_IDS.map(id => fetchTrail(id)));
    const trails = results.filter(r => r.status === "fulfilled").map(r => r.value);
    const { loaded } = items;
    const state = uiState({loading: false, error: null, items: trails});
    if (state === "loaded") {
      trails.forEach(t => grid.append(card(t)));
    }
    show(state);
  } catch(e) {
    error.textContent = e.message;
    show("error");
  }
}

/* Wire the Load button, then call load() once so the page is not blank. */
loadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  load();
});