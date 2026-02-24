function calculate(num1, num2, op) {
  if (op === '+') return num1 + num2;
  if (op === '-') return num1 - num2;
  if (op === '*') return num1 * num2;
  if (op === '/') return num1 / num2;
}

function getValue(selector) {
  return document.querySelector(selector).value;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const firstNumber = Number(getValue('#first-number'));
    const secondNumber = Number(getValue('#second-number'));
    const operator = getValue('#operator');

    let result = calculate(firstNumber, secondNumber, operator);
    if (Number.isNaN(result)) result = 'Invalid Operation'

    document.querySelector('#result').textContent = String(result);
  });
});