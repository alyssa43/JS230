/*
Implement a function that makes an element bold and allows the user of the function to optionally do something else with it.
*/

// function makeBold(element, callback) {
//   element.style.fontWeight = 'bold';
//   if (callback && typeof callback === 'function') callback(element);
// }

/* Further Exploration:
Get the same behavior by creating your own custom event called `bolded` that allows the user to add it as the type of event to listen to.
*/

function makeBold(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatchEvent(event);
}

// Use Case
let sectionElement = document.querySelector('section');

// Further Exploration 
sectionElement.addEventListener('bolded', event => {
  alert(event.target.tagName);
  event.target.classList.add('highlight');
});

makeBold(sectionElement);

// First solution use case
// makeBold(sectionElement, function(elem) {
//     elem.classList.add('highlight');
// });

console.log(sectionElement.classList.contains('highlight')); //true
console.log(sectionElement.style.fontWeight); //"bold"