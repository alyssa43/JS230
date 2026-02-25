document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('a');
  const articles = document.querySelectorAll('article');

  tabs.forEach(tab => {
    tab.addEventListener('click', event => {
      event.preventDefault();
      const block = tab.dataset.block;

      articles.forEach(article => {
        article.style.display = article.dataset.block === block ? 'block' : 'none';
      });
    });
  });
});