document.addEventListener('DOMContentLoaded', () => {
  const figures = document.querySelectorAll('.hover-figure');

  figures.forEach(figure => {
    let timer;
    const caption = figure.querySelector('figcaption');

    figure.addEventListener('mouseenter', () => {
      timer = setTimeout(() => {
        caption.classList.add('show');
      }, 2000);
    });

    figure.addEventListener('mouseleave', () => {
      clearTimeout(timer);
      caption.classList.remove('show');
    });
  });
});