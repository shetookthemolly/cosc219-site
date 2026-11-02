/*
  COSC 219 — Lab 6 · main.js
  The only file that touches the page. Modules only work over http://,
  so open index.html with Live Server.
*/

import { TRAIL_DATA } from "./data.js";
import { TrailRegistry } from "./registry.js";


/* Build a registry from the data, close Bear Creek, then:

     · put one <li> per trail into #trails, using describeAll()
     · write a line into #summary in this exact shape:

       6 trails, 5 open, 46.7 km total. Steepest: Pincushion Peak.
*/
const registry = TrailRegistry.fromData(TRAIL_DATA);
registry.find("Bear Creek").close();
const summary = document.querySelector("#summary");
summary.innerText = `${registry.size} trails, ${registry.openTrails.length} open, ${registry.totalDistance} km total. Steepest: ${registry.steepest.name}.`;
const trailList = document.querySelector("#trails");
const items = registry.all.map(t => {
  const li = document.createElement("li");
  li.textContent = t.describe();
  return li;
});
trailList.append(...items);

