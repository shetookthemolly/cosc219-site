# Why did we used the listener on the list instead of one on each button?
Because each time we call update(), we rebuild the render, which destroys the buttons and recreates new buttons. If we attached an event listener directly to a button, that listener wouldn't transfer to a newly created button upon rebuilding the render because we destroy the previous buttons when rebuilding the render.

## What happens if loadTrails does not guard against corrupt data?
It can cause multiple possible errors, such as a uncaught type error as soon as app.js is ran. This is because the array is null. The array is null because there is nothing stored under our key, we only ever store an item under our key when we call saveTrails. Despite our update function being called at the end of app.js, it never calls saveTrails, because it throws the uncaught type error when attempting to call our renderTrails function. Inside renderTrails, we call the map function on our trails array, which results in that error being thrown due to trails being null.

## AI Use Declaration
I used AI to help confirm my understanding of some parts in the lab, as well as my understanding on concepts used in the lab. I also used AI to help understand some persistent errors.