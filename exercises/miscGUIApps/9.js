class TextEditor {
  #buttonsDiv;
  #textBox;
  
  constructor() {
    this.#buttonsDiv = document.querySelector('.buttons');
    this.#textBox = document.querySelector('.text_box');
    document.getElementById('justifyLeft').classList.add('pushed');
    this.#initEvent();
  }

  #initEvent() {
    this.#buttonsDiv.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      event.preventDefault();

      const command = button.id;
      let value = null;
      
      if (command === 'createLink') {
        value = prompt('Enter link URL:');
        if (!value) return;
      }
      
      this.#updateUI(button);
      this.#textBox.focus();
      document.execCommand(command, false, value);
    });
  }

  #updateUI(button) {
    if (button.classList.contains('list')) {
      this.#toggleGroup('.list', button);
    } else if (button.classList.contains('align')) {
      this.#toggleGroup('.align', button);
    } else {
      button.classList.toggle('pushed');
    }
  }

  #toggleGroup(className, pushedBtn) {
    const isAlreadyPushed = pushedBtn.classList.contains('pushed');
    document.querySelectorAll(className).forEach(btn => btn.classList.remove('pushed'));

    if (!isAlreadyPushed || className.includes('align')) {
      pushedBtn.classList.add('pushed');
    }
  }
}

new TextEditor();