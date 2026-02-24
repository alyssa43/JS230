/*
Given the following markup (4.html), implement distinct `context menus` for the `main` and the `sub` areas of the web page. You can represent a context menu as an alert box that displays the name of the respective area (i.e., `alert('sub')`). Only one context menu should appear when the event occurs.
*/

document.addEventListener('DOMContentLoaded', event => {
  const main = document.querySelector('main');
  const sub = document.querySelector('#sub');

  main.addEventListener('contextmenu', event => {
    event.preventDefault();
    console.log('Main');
  });

  sub.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Sub');
  });
});