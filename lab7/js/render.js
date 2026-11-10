/*
  COSC 219 — Lab 7 · render.js
  Building DOM nodes. No storage and no event handling in this file.
*/


/* createTrailItem(trail) — one <li>, built and returned (not inserted).

   Structure, exactly:

     <li class="trail" data-id="x1">
       <span class="trail-name">Knox Mountain</span>
       <span class="trail-km">2.8 km</span>
       <button type="button" data-action="toggle">
         <span class="btn-label">Close</span>
       </button>
       <button type="button" data-action="delete"
               aria-label="Delete Knox Mountain">
         <span class="btn-label">Delete</span>
       </button>
     </li>

   Note the label sits in a <span> INSIDE each button. That is deliberate:
   it is what a real button looks like once it holds an icon, and it is
   why findAction has to use closest() rather than reading the target.

   When the trail is closed:
     · the <li> also gets the class "is-closed"
     · the toggle button says "Reopen" instead of "Close"

   Use document.createElement and textContent.
   NEVER innerHTML — the name came from a form or from storage, and
   innerHTML would parse it as markup. One of the tests feeds this
   function an <img onerror> and checks nothing was created.
   ---------------------------------------------------------------------- */

export function createTrailItem(trail) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const distanceSpan = document.createElement("span");
  const toggleBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const toggleLabel = document.createElement("span");
  const deleteLabel = document.createElement("span");

  li.classList.add("trail");
  li.dataset.id = trail.id;
  nameSpan.classList.add("trail-name");
  nameSpan.textContent = trail.name;
  distanceSpan.classList.add("trail-km");
  distanceSpan.textContent = trail.km + " km";
  toggleBtn.dataset.action = "toggle";
  toggleLabel.classList.add("btn-label");
  if (trail.closed === true) {
    li.classList.add("is-closed");
    toggleLabel.textContent = "Reopen";
  } else {
    toggleLabel.textContent = "Close";
  }
  toggleBtn.append(toggleLabel);
  deleteBtn.dataset.action = "delete";
  deleteBtn.setAttribute("aria-label", "Delete " + trail.name);
  deleteLabel.classList.add("btn-label");
  deleteLabel.textContent = "Delete";
  deleteBtn.append(deleteLabel);
  li.append(nameSpan, distanceSpan, toggleBtn, deleteBtn)

  return li;
}


/* renderTrails(trails, container) — replace everything in the container
   with one item per trail.

   container.replaceChildren(...) empties and refills in one step.
   ---------------------------------------------------------------------- */

export function renderTrails(trails, container) {
  const newTrails = trails.map(t => createTrailItem(t));
  return container.replaceChildren(...newTrails);
}


/* summaryText(trails) — one line describing the list.

     []                                   →  "No trails yet. Add one above."
     [one open trail of 2.8 km]           →  "1 trail, 1 open, 2.8 km total."
     [2 trails, 1 open, 14.8 km]          →  "2 trails, 1 open, 14.8 km total."

   Note "1 trail" but "2 trails". Round the distance to one decimal place.
   ---------------------------------------------------------------------- */

export function summaryText(trails) {
  const openTrails = trails.filter(t => !(t.closed));
  const totalDistance = trails.reduce((a, t) => Math.round((a+t.km) * 100) / 100, 0);
  if (trails.length <= 0) {
    return "No trails yet. Add one above.";
  } else {
    return `${trails.length} ${(trails.length > 1) ? "trails" : "trail"}, ${openTrails.length} open, ${totalDistance} km total.`;
  }
}
