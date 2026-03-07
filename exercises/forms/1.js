class SignUpFormUI {
  #form = document.querySelector('form');
  #inputFields = document.querySelectorAll('input');
  #formErrorHeader = document.querySelector('.form-errors');

  constructor() {
    this.#initEvents();
  }

  #initEvents() {
    this.#inputFields.forEach(input => {
      input.addEventListener('blur',  () => this.#validateField(input));
      input.addEventListener('focus', () => this.#clearError(input));
    });

    this.#form.addEventListener('submit', (e) => this.#handleSubmit(e));
  }

  #validateField(input) {
    const errorDisplay = input.nextElementSibling;

    if (!input.checkValidity()) {
      input.classList.add('invalid');
      errorDisplay.textContent = this.#errorMessage(input);
      return false;
    }

    this.#checkFormConsistency();
    return true;
  }

  #clearError(input) {
    input.classList.remove('invalid');
    const errorDisplay = input.nextElementSibling;
    errorDisplay.textContent = '';
  }

  #handleSubmit(event) {
    if (!this.#form.checkValidity()) {
      event.preventDefault();
      this.#formErrorHeader.textContent = 'Fix errors before submitting this form.';
      this.#formErrorHeader.style.color = 'red';

      this.#inputFields.forEach(input => this.#validateField(input));
    }
  }

  #checkFormConsistency() {
    if (this.#form.checkValidity()) {
      this.#formErrorHeader.textContent = '';
    }
  }

  #errorMessage(input) {
    return `${this.#formatName(input)} is a required field.`;
  }

  #formatName(input) {
    return input.name.split('_')
                     .map(word => word[0].toUpperCase() + word.slice(1))
                     .join(' ');
  }
}

new SignUpFormUI();