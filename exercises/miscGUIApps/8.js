class CalculatorEngine {
  constructor() {
    this.clearAll();
  }

  // Resets all state for the 'C' button
  clearAll(current = '0') {
    this.currentEntry = current;
    this.operationHistory = '';
    this.previousOperand = null;
    this.activeOperator = null;
  }

  // Resets only current entry for 'CE'
  clearEntry() {
    this.currentEntry = '0'
  }

  // Adds a digit to the current entry string
  appendDigit(digit) {
    if (this.currentEntry === '0') {
      this.currentEntry = digit;
    } else {
      this.currentEntry += digit;
    }
  }

  // Adds a dot to the current entry string
  appendDot() {
    if (this.currentEntry.includes('.')) return;
    this.currentEntry += '.';
  }
 
  // Prepares the math operation when an operator is clicked
  setOperator(op) {
    // If we already have an op and a previous num - calculate result first
    if (this.activeOperator && this.previousOperand !== null) {
      this.calculate();
    }

    this.previousOperand = this.#currentNumericValue();
    this.activeOperator = op;
    this.operationHistory = `${this.previousOperand} ${op} `;
    this.currentEntry = '0';
  }

  // Performs the actual math
  calculate() {
    if (this.activeOperator === null || this.previousOperand === null) return;

    const prev = this.previousOperand;
    const current = this.#currentNumericValue();
    let result = 0;

    switch (this.activeOperator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case 'x': result = prev * current; break;
      case '/': result = prev / current; break;
      case '%': result = prev % current; break;
      default: return;
    }

    this.clearAll(result.toString());
  }

  negate() {
    const value = this.#currentNumericValue();
    this.currentEntry = String(value * -1);
  }

  #currentNumericValue() {
    return parseFloat(this.currentEntry);
  }
}

class CalculatorUI {
  calculationScreen = document.querySelector('.calculation');
  entryScreen = document.querySelector('.current_num');
  buttons = document.getElementById('buttons');

  constructor() {
    this.engine = new CalculatorEngine();
    this.#initEvents();
  }

  #initEvents() {
    this.buttons.addEventListener('click', event => {
      const button = event.target;
      if (button.tagName !== 'A') return;
      event.preventDefault();

      if (button.className === 'control')       return this.#handleControl(button.id)
      if (button.className === 'result_button') this.engine.calculate();
      if (button.className === 'dot')           this.engine.appendDot();

      const value = button.textContent;

      if (button.className === 'digit')         this.engine.appendDigit(value);
      if (button.className === 'op')            this.engine.setOperator(value);

      this.#render();
    });
  }

  #handleControl(id) {
    if (id === 'c')   this.engine.clearAll();
    if (id === 'ce')  this.engine.clearEntry();
    if (id === 'neg') this.engine.negate();
    this.#render();
  }

  // --- UI Update Helpers ---

  #render() {
    this.#updateEntry(this.engine.currentEntry);
    this.#updateOperation(this.engine.operationHistory);
  }

  #updateEntry(val) {
    let display = val.toString();
    if (display.length > 12) display = parseFloat(val).toExponential(5);
    this.entryScreen.innerText = display;
  }

  #updateOperation(val) {
    this.calculationScreen.innerText = val;
  }
}

new CalculatorUI();