/*
Implement a function `delegateEvent(parentElement, selector, eventType, callback)` that uses event delegation to handle events on descendant elements. Your function should:
  - Attach a single event listener of type `eventType` to `parentElement`.
  - When an event bubbles up from a descendant that matches `selector`, invoke `callback(event)`.
  - Return `true` if `parentElement` is a valid DOM element and the event listener was added.
  - Return `undefined` if `parentElement` is not a valid element.
  - Assume all event listeners use the bubbling phase.
*/

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!(parentElement instanceof Element)) return undefined;

  parentElement.addEventListener(eventType, event => {
    const possibleTargets = [...parentElement.querySelectorAll(selector)];
    if (possibleTargets.includes(event.target)) callback(event)
  });

  return true;
}