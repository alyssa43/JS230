document.addEventListener('DOMContentLoaded', event => {
  const textField = document.querySelector('.text-field');
  const content = document.querySelector('.content');
  let cursorIntervalId;

  function toggleCursor() {
    return setInterval(() => {
      textField.classList.toggle('cursor');
    }, 500);
  }

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');
    cursorIntervalId = cursorIntervalId || toggleCursor();
  });

  document.addEventListener('click', event => {
    clearInterval(cursorIntervalId);
    cursorIntervalId = null;

    textField.classList.remove('focused', 'cursor');
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      const key = event.key;
      
      if (key === 'Backspace') {
        content.textContent = content.textContent.slice(0, -1);
      } else if (key.length === 1) {
        content.textContent += key;
      }
    }
  });
});