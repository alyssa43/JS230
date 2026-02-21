class GuessingGame {
  constructor() {
    this.answer = this.#generateRandomNumber();
    this.guessCount = 0;
  }

  isValidGuess(guess) {
    return Number.isInteger(guess) && guess >= 1 && guess <= 100;
  }

  guessedNumber(guess) {
    return guess === this.answer;
  }

  newGuessMessage(guess) {
    this.guessCount += 1;
    if (this.guessedNumber(guess)) return this.#winningMessage();
    return `My number is ${guess > this.answer ? 'lower' : 'higher'} than ${guess}`;
  }

  resetGame() {
    this.answer = this.#generateRandomNumber()
    this.guessCount = 0;
  }

  #winningMessage() {
    return 'You guessed it! ' +
    `It took you ${this.guessCount} guess${this.guessCount > 1 ? 'es' : ''}.`
  }

  #generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
}

document.addEventListener('DOMContentLoaded', event => {
  const game = new GuessingGame();
  const form = document.querySelector('form');
  const input = document.querySelector('#guess');
  const paragraph = document.querySelector('p');
  const newGameLink = document.querySelector('a');
  const button = document.querySelector('input[type="submit"]');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const guess = Number(input.value);
    let message = game.isValidGuess(guess) ? game.newGuessMessage(guess) : 'Invalid Guess'
    paragraph.textContent = message;

    if (game.guessedNumber(guess)) button.disabled = true;
  });

  newGameLink.addEventListener('click', event => {
    event.preventDefault();
    game.resetGame();
    button.disabled = false;
    paragraph.textContent = 'Guess a number from 1 to 100'
    input.value = '';
  });
});