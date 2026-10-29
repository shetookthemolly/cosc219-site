/*
  COSC 219 — Lab 6 · registry.js
  A class that owns a collection of Trails.
*/

// import the two classes from ./trail.js — note the .js is required
import { Trail, BikeTrail } from "./trail.js";


export class TrailRegistry {

  /* The array is PRIVATE. Nothing outside may push to it, sort it or
     empty it — this class decides what happens to the collection. */
  #trails = [];


  /* Accept an optional array of Trails and add each one. */
  constructor(trails = []) {
   trails.forEach(t => this.add(t));
  }


  /* get size — how many trails. */
  get size() {
   return this.#trails.length;
  }


  /* get all — a COPY of the array.

     Returning the private array itself would let a caller do
     registry.all.push("junk") and walk straight past every check in
     this class. One of the tests does exactly that.
     ---------------------------------------------------------------- */
  get all() {
   return [...this.#trails];
  }


  /* add(trail) — reject anything that is not a Trail.

     Throw a TypeError if it is not, otherwise store it and return `this`.
     Use `instanceof`. Remember a BikeTrail IS a Trail.
     ---------------------------------------------------------------- */
  add(trail) {
   if (!(trail instanceof Trail)) {
      throw new TypeError;
   } else {
      this.#trails.push(trail);
      return this;
   }
  }


  /* find(name) — the matching Trail, ignoring case, or undefined. */
  find(name) {
   return this.#trails.find(e => e.name === name);
  }


  /* byRating(rating) — every trail with that rating. */
  byRating(rating) {
   return this.#trails.filter(e => e.rating === rating);
  }


  /* get openTrails — every trail that is not closed. */
  get openTrails() {
   return this.#trails.filter(e => !(e.closed));
  }


  /* get totalDistance — all the km added up, to one decimal place. */
  get totalDistance() {
   return this.#trails.reduce((a, e) => Math.round(a+e.km), 0);
  }


  /* get steepest — the trail with the largest steepness.
     undefined when there are none. */
  get steepest() {
   if (this.#trails.length <= 0) {
      return undefined;
   }
   return this.#trails.reduce((sn, c) => {
      if (sn.steepest > c.steepest) {
         return sn;
      } else {
         return c;
      }
   });
  }


  /* describeAll() — an array of every trail's describe() string. */
  describeAll() {
   return this.#trails.map(e => e.describe());
  }


  /* static fromData(rows) — build a registry from plain objects.

     A row with a `surface` property becomes a BikeTrail; anything else
     becomes a Trail. Default a missing gain to 0.
     ---------------------------------------------------------------- */
  static fromData(rows) {
    a = rows.map(e => {
      const { gain = 0 } = e;
      if (e.surface !== undefined) {
         // Fix constructor in bt object
         bt = new BikeTrail(e, gain);
         return bt
      } else {
         t = new Trail(e.name, e.km, e.rating, gain);
         return t;
      }
   });
  }
}
