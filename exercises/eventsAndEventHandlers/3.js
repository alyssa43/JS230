/*
The code below is buggy. The person who created the code expects that nothing will happen when the user clicks on the image. This, however, isn't the case; clicking the image still bring the user to another web page. 
Study the code and explain the bug.
*/

document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);

/* Answer:
This code is using `event.stopPropagation` which only stops the event path once it reaches this event, it doesn't stop it from performing it's default behavior. To accomplish this we should use `event.preventDefault`, like so:
*/

document.querySelector('img').addEventListener('click', event => {
  event.preventDefault();
}, false);