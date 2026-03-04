class Timer {
  static #MAX_HOURS = 99;
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  centSpan = document.querySelector('span.centiseconds');
  secSpan = document.querySelector('span.seconds');
  minSpan = document.querySelector('span.minutes');
  hrSpan = document.querySelector('span.hours');
  #intervalId = null;

  start() {
    if (this.#intervalId) return;
    this.#intervalId = setInterval(this.#tick, 10);
  }

  stop() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  reset() {
    this.stop();
    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.#display();
  }

  #tick = () =>  {
    this.centiseconds += 1;

    if (this.centiseconds === 100) {
      this.centiseconds = 0;
      this.seconds += 1;
    }

    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes += 1;
    }

    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours += 1;
    }

    if (this.hours === Timer.#MAX_HOURS) {
      this.stop();
      console.log('Time limit exceeded. Stopping...')
    }

    this.#display();
  }

    #display() {
    this.hrSpan.textContent = this.#formatNum(this.hours);
    this.minSpan.textContent = this.#formatNum(this.minutes);
    this.secSpan.textContent = this.#formatNum(this.seconds);
    this.centSpan.textContent = this.#formatNum(this.centiseconds);
  } 

  #formatNum(num) {
    return String(num).padStart(2, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const timer = new Timer();
  const controlDiv = document.querySelector('div.controls');
  const toggleButton = document.querySelector('button.toggle');
  const resetButton = document.querySelector('button.reset');

  const toggle = () => {
    const newContent = toggleButton.textContent === 'Start' ? 'Stop' : 'Start';
    toggleButton.textContent = newContent;
  }

  const reset = () => {
    toggleButton.textContent = 'Start';
  }

  controlDiv.addEventListener('click', event => {
    if (![toggleButton, resetButton].includes(event.target)) return;
    event.preventDefault();

    if (event.target === toggleButton) {
      toggleButton.textContent === 'Start' ? timer.start() : timer.stop();
      toggle();
    }

    if (event.target === resetButton) {
      timer.reset();
      reset();
    }
  });
});


