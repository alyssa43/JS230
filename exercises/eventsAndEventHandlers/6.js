/*
Given the HTML and CSS (6.html), implement JS code the does the following:
  - When the user clicks on a navigation link (Articles 1-4), the browser scrolls to that article in the `<main>` element and adds the `highlight` class to it. If another element already has the `highlight` class, the browser removes the class from that element.
  - When the user clicks on an `article` element or any of its child elements, the browser adds the `highlight` class to it. If another element already has the `highlight` class, the browser removes the class from that element.
  - When the user clicks anywhere else on the page, the browser adds the `highlight` class to the `main` element. If another element already has the `highlight` class, the browser removes the class from that element.
*/

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const articles = document.querySelectorAll('article');
  const highlightable = [main, ...articles];

  function highlight(target) {
    highlightable.forEach(element => {
      if (target === element) {
        element.classList.add('highlight');
      } else {
        element.classList.remove('highlight');
      }
    });
  }

  document.addEventListener('click', event => {
    let target = event.target;
    let article = target.closest('article');

    if (target.tagName === 'A') {
      target = document.querySelector(target.hash);
    } else if (article) {
      target = article;
    } else {
      target = main;
    }

    highlight(target);
  });
});