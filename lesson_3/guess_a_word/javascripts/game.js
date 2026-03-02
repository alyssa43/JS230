class Game {
  static words = ['apple', 'banana', 'orange', 'pear'];
  static maxIncorrectGuesses = 6;

  constructor() {
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
    this.word = Game.getRandomWord();

    if (!this.word) {
      throw new Error('Out of words!');
    }

    this.word = this.word.split("");
    this.spaces = Array(this.word.length).fill(' ');
  }

  static getRandomWord() {
    if (Game.words.length === 0) return undefined;
    const wordIndex = Math.floor(Math.random() * Game.words.length);
    return Game.words.splice(wordIndex, 1)[0];
  }

  static notALetter(letter) {
    return letter < 'a' || letter > 'z';
  }

  makeGuess(letter) {
    letter = letter.toLowerCase();
    if (Game.notALetter(letter)) return;
    if (this.lettersGuessed.includes(letter)) return;

    if (this.word.includes(letter)) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          this.spaces[i] = letter;
        }
      }
    } else {
      this.incorrectGuesses += 1;
    }

    this.lettersGuessed.push(letter);
  }

  hasWon() { return this.spaces.join('') === this.word.join('') }
  hasLost() { return this.incorrectGuesses >= Game.maxIncorrectGuesses }
}

class GameUI {
  constructor() {
    this.message = document.getElementById("message");
    this.letters = document.getElementById("spaces");
    this.guesses = document.getElementById("guesses");
    this.apples = document.getElementById("apples");
    this.replay = document.getElementById("replay");

    try {
      this.game = new Game();
    } catch (error) {
      this.displayMessage("Sorry, I've run out of words!");
      this.hideReplayLink();
      return;
    }
    this.init();
  }

  renderSlots(values, containerElement) {
    let html = values.map(value => `<span>${value}</span>`).join('');
    containerElement.querySelectorAll('span').forEach(el => el.remove());
    containerElement.insertAdjacentHTML('beforeend', html);

  }

  renderLetters(spaces) {
    this.renderSlots(spaces, this.letters);
  }

  renderGuesses(guesses) {
    this.renderSlots(guesses, this.guesses);
  }

  emptyGuesses() {
    this.renderGuesses([]);
  }

  setApplesLost(incorrectGuesses) {
    this.apples.className = `guess_${incorrectGuesses}`;
  }

  displayMessage(text) {
    this.message.textContent = text;
  }

  showReplayLink() { this.replay.classList.add('visible') }
  hideReplayLink() { this.replay.classList.remove('visible') }

  isAlphaKey(str) {
    return str.length === 1 && /^[a-zA-Z]+$/.test(str);
  }

  processGuess = (e) => {
    const letter = e.key;
    if (!this.isAlphaKey(letter)) return;

    this.game.makeGuess(letter);

    this.renderLetters(this.game.spaces);
    this.renderGuesses(this.game.lettersGuessed);
    this.setApplesLost(this.game.incorrectGuesses);

    if (this.game.hasWon()) {
      this.win();
    } else if (this.game.hasLost()) {
      this.lose();
    }
  };

  win() {
    this.unbind();
    this.displayMessage("You win!");
    this.showReplayLink();
    this.setGameStatus("win");
  }

  lose() {
    this.unbind();
    this.displayMessage("Sorry! You're out of guesses");
    this.showReplayLink();
    this.setGameStatus("lose");
  }

  setGameStatus(status) {
    document.body.classList.remove("win", "lose");
    if (status) {
      document.body.classList.add(status);
    }
  }

  bind() { document.addEventListener("keyup", this.processGuess) }
  unbind() { document.removeEventListener("keyup", this.processGuess) }

  init() {
    this.bind();
    this.setApplesLost(0);
    this.hideReplayLink();
    this.emptyGuesses();
    this.renderLetters(this.game.spaces);
    this.setGameStatus();
    this.displayMessage("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GameUI();

  document.querySelector("#replay").addEventListener("click", (event) => {
    event.preventDefault();
    new GameUI();
  });
});