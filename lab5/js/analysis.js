/*
  COSC 219 — Lab 5
  Arrays, loops and iterators.

  Write the fourteen functions below. Each is tested independently —
  open check.html to see which pass.

  Every function must return a NEW value. None of them may change the
  array they were given: the tests check that TRAILS is untouched
  afterwards, and one of them will catch you if it isn't.
*/


/* ======================================================================
   PART A — the two helpers you were given in Lab 4
   You could not write these last week. Now you can.
   ====================================================================== */

/* A1 — revealWord(word, guessedLetters)

   Show the guessed letters, hide the rest behind underscores.

     revealWord("otter", "")      →  "_____"
     revealWord("otter", "ot")    →  "ott__"
     revealWord("otter", "otre")  →  "otter"

   Hint: "otter".split("") gives you an array of letters. Then map, then
   join(""). Three steps.
   ---------------------------------------------------------------------- */

function revealWord(word, guessedLetters) {
  const splitWord = word.split("");
  const revealedArr = splitWord.map(l => (!guessedLetters.includes(l) ? "_" : l));
  return revealedArr.join("");
}


/* A2 — hasWon(word, guessedLetters)

   True when every letter of the word has been guessed.

     hasWon("otter", "ot")    →  false
     hasWon("otter", "otre")  →  true

   Hint: which iterator answers "is this true for all of them?"
   ---------------------------------------------------------------------- */
function hasWon(word, guessedLetters) {
  const splitWord = word.split("");
  const result = splitWord.every(l => guessedLetters.includes(l));
  return result;
}



/* ======================================================================
   PART B — array basics
   ====================================================================== */

/* B1 — trailNames(trails)
   An array of just the names, same length as the input.
     trailNames(TRAILS).length  →  10
     trailNames(TRAILS)[0]      →  "Knox Mountain"
   ---------------------------------------------------------------------- */

function trailNames(trails) {
  const trailNames = trails.map(t => t.name);
  return trailNames;
}


/* B2 — openTrails(trails)
   Only the trails that are not closed.
     openTrails(TRAILS).length  →  8
   ---------------------------------------------------------------------- */

function openTrails(trails) {
  const nonClosedTrails = trails.filter(t => !t.closed);
  return nonClosedTrails;
}


/* B3 — findByName(trails, name)
   The single matching trail, ignoring case. undefined if there is none.
     findByName(TRAILS, "Bear Creek").km  →  5.5
     findByName(TRAILS, "bear creek").km  →  5.5
     findByName(TRAILS, "Nowhere")        →  undefined

   Careful: find returns the ELEMENT. filter would return an array.
   ---------------------------------------------------------------------- */

function findByName(trails, name) {
  if (name === name.toLowerCase()) {
    const filteredTrails = trails.filter(t => t.name.toLowerCase() === name);
    const findElement = filteredTrails.find(t => t.name.toLowerCase() === name);
    return findElement;
  } else {
    const findElement = trails.find(t => t.name === name);
    return findElement;
  }
}


/* B4 — sortedByDistance(trails)
   Shortest first, WITHOUT reordering the array you were given.

     sortedByDistance(TRAILS)[0].name  →  "Knox Mountain"   (2.8 km)
     sortedByDistance(TRAILS)[9].name  →  "Mission Creek"   (16 km)

   Two traps here, both from Lecture 9:
     · sort() changes the array it is called on. Copy it first.
     · the default sort compares as TEXT, so 10 sorts before 9.
       Pass a comparator.
   ---------------------------------------------------------------------- */

function sortedByDistance(trails) {
  const trailsCopy = [...trails];
  return trailsCopy.sort((a, b) => a.km - b.km);
}


/* ======================================================================
   PART C — iterators that answer a question
   ====================================================================== */

/* C1 — anyClosed(trails)      is at least one closed?
     anyClosed(TRAILS)                →  true
     anyClosed(openTrails(TRAILS))    →  false
   ---------------------------------------------------------------------- */

function anyClosed(trails) {
  const isSomeClosed = trails.some(t => t.closed);
  return isSomeClosed;
}


/* C2 — allUnder(trails, limit)   are they all shorter than limit km?
     allUnder(TRAILS, 20)  →  true
     allUnder(TRAILS, 10)  →  false
     allUnder([], 5)       →  true      ← yes, really. Think about why.
   ---------------------------------------------------------------------- */

function allUnder(trails, limit) {
  const areAllUnder = trails.every(t => t.km < limit);
  return areAllUnder;
}


/* C3 — totalDistance(trails)
   Every trail's km added up, rounded to one decimal place.
     totalDistance(TRAILS)  →  71.3
     totalDistance([])      →  0

   Give reduce a starting value of 0, or the empty case throws.
   Round with: Math.round(total * 10) / 10
   ---------------------------------------------------------------------- */

function totalDistance(trails) {
  const sum = trails.reduce((total, n) => total + n.km, 0);
  const roundedSum = Math.round(sum * 10) / 10;
  return roundedSum;
}


/* C4 — longestTrail(trails)
   The trail object with the largest km. undefined for an empty array.
     longestTrail(TRAILS).name  →  "Mission Creek"
     longestTrail([])           →  undefined

   The accumulator does not have to be a number — here it is a trail.
   ---------------------------------------------------------------------- */

function longestTrail(trails) {
  
  const longest = trails.reduce((t, c) => {
    if (t != undefined) {
      return ((t.km < c.km) ? c : t);
    } else {
      return c
    }}, undefined);
  return longest;
}


/* C5 — countByRating(trails)
   How many of each rating, as an object.
     countByRating(TRAILS)  →  { moderate: 3, easy: 4, hard: 3 }

   reduce with {} as the starting value. Two things people forget:
     · return the accumulator at the end of each pass
     · handle the first time a rating is seen  ( ?? 0 )
   ---------------------------------------------------------------------- */

function countByRating(trails) {
  //const longest = trails.reduce((), {})
}


/* ======================================================================
   PART D — chaining
   ====================================================================== */

/* D1 — openDistance(trails)
   Total km of the open trails only, to one decimal place.
     openDistance(TRAILS)  →  54.6

   filter, then map, then reduce. Read it as a sentence.
   ---------------------------------------------------------------------- */

function openDistance(trails) {

}


/* D2 — summaryLines(trails)
   One display string per trail, in the original order.

     summaryLines(TRAILS)[0]  →  "Knox Mountain — 2.8 km, moderate"
     summaryLines(TRAILS)[4]  →  "Rose Valley — 7.2 km, moderate (closed)"

   Note the em dash — and that "(closed)" only appears when it is.
   ---------------------------------------------------------------------- */

function summaryLines(trails) {

}


/* D3 — report(trails)
   An object summarising everything:

     {
       total: 10,
       open: 8,
       closed: 2,
       openKm: 54.6,
       longestOpen: "Mission Creek",
       byRating: { moderate: 3, easy: 4, hard: 3 }
     }

   longestOpen is the longest OPEN trail's name, or null if there are none.

   Call the functions you already wrote. Do not repeat their logic — that
   is why you wrote them separately.
   ---------------------------------------------------------------------- */

function report(trails) {
  return 0;
}
