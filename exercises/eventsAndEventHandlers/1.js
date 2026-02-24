/*
Without changing the behavior of the following code, remove the call to `event.stopPropagation` and refactor the result.
*/

document.querySelector('html').addEventListener('click', event => {
  const container = document.querySelector('#container');
  
  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});