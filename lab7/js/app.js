/*
  COSC 219 — Lab 7 · app.js
  The only file that touches the page. Open index.html with Live Server.
*/

// import from ./storage.js, ./render.js and ./trails.js
import { saveTrails, loadTrails, clearTrails } from "./storage.js";
import { createTrailItem, renderTrails, summaryText } from "./render.js";
import { makeTrail, isValidTrail, addTrail, removeTrail, toggleTrail, findAction } from "./trails.js";

/* Load the saved trails into a `let` — the array is replaced, not edited,
   every time something changes. */
let trails = loadTrails();

/* update() — redraw the list, rewrite the summary, and save.
   Call it whenever the data changes, and once at the very bottom of this
   file so the page is not blank on load. */
function update() {
   const container = document.querySelector("#trail-list");
   const summary = document.querySelector("#summary");
   renderTrails(trails, container);
   summary.textContent = summaryText(trails);
   saveTrails(trails);
}

/* The add form.

   A submit reloads the page by default, throwing away everything in
   memory. Stop that first, then validate, then add.

   When the input is invalid: put a message in #error, focus the name
   field, and return without changing anything.
   When it is valid: clear #error, add the trail, reset the form. */

   const addForm = document.querySelector("form");
   const errMsg = document.querySelector("#error");
   const fieldName = addForm.querySelector("#name");
   const fieldDist = addForm.querySelector("#km");

   addForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (fieldName.value === "" || fieldDist.value === "") {
         errMsg.textContent = "Give the trail a name and a distance above zero.";
         return;
      }
      errMsg.textContent = "";
      const trail = makeTrail(fieldName.value, fieldDist.value);
      trails = addTrail(trails, trail);
      addForm.reset();
      update();
   })

/* The list.

   ONE listener on #trail-list — not one per button. The buttons are
   destroyed and rebuilt on every render, so a listener on a button would
   not survive the first redraw.

   Use findAction(event.target) to work out what was clicked.

   Clear #error here too — once the user clicks something in the list they
   have moved on from the form, and a stale validation message left on
   screen is just noise. */
   const trailList = document.querySelector("#trail-list");
   trailList.addEventListener("click", (event) => {
      errMsg.textContent = "";
      const { action, id } = findAction(event.target);
      if (action === "delete") {
         trails = removeTrail(trails, id);
      }
      if (action === "toggle") {
         trails = toggleTrail(trails, id);
      }
      update();
   })

/* The Clear all button: empty the array, clear storage, update. */
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
   trails = [];
   clearTrails();
   update();
})
update();