// Modern vanilla JS form validation using Constraint Validation API
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputs = Array.from(form.querySelectorAll('input'));
  const formErrors = form.querySelector('.form_errors');

  // Input filtering helpers
  function isAllowedNameKey(key) {
    // Allow letters, apostrophes, spaces, and control keys
    return /^[a-zA-Z'\s]$/.test(key) || 
           ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);
  }

  function isAllowedDigitKey(key) {
    // Allow digits and control keys
    return /^[0-9]$/.test(key) || 
           ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);
  }

  function isAllowedPhoneKey(key) {
    // Allow digits, dashes, and control keys
    return /^[0-9-]$/.test(key) || 
           ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);
  }

  // Validation helpers
  function getLabelTextFor(input) {
    const label = form.querySelector(`label[for="${input.id}"]`);
    return label ? label.textContent.trim() : input.name;
  }

  function showFieldError(input, message) {
    const errorSpan = input.parentElement.querySelector('.error_message');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
    input.classList.add('invalid_field');
  }

  function clearFieldError(input) {
    const errorSpan = input.parentElement.querySelector('.error_message');
    if (errorSpan) {
      errorSpan.textContent = '';
    }
    input.classList.remove('invalid_field');
  }

  function validateInput(input) {
    // Special handling for credit card inputs
    if (input.name === 'credit_card') {
      return validateCreditCard();
    }

    // Use constraint validation API properties
    const validity = input.validity;
    if (validity.valid) return true;

    if (validity.valueMissing) {
      showFieldError(input, `${getLabelTextFor(input)} is a required field.`);
      return false;
    }

    if (validity.patternMismatch) {
      if (input.id === 'password') {
        showFieldError(input, 'Password must be at least 10 characters long.');
      } else if (input.id === 'phone') {
        showFieldError(input, 'Phone number must use the format 111-222-3333.');
      } else {
        showFieldError(input, `Please enter a valid ${getLabelTextFor(input)}.`);
      }
      return false;
    }

    // Fallback for other constraint failures
    showFieldError(input, `The ${getLabelTextFor(input)} is invalid.`);
    return false;
  }

  function validateCreditCard() {
    const ccInputs = Array.from(form.querySelectorAll('input[name="credit_card"]'));
    const lastCcInput = ccInputs[ccInputs.length - 1];
    
    // Check if all 4 inputs have exactly 4 digits
    const allValid = ccInputs.every(input => 
      input.value.length === 4 && /^\d{4}$/.test(input.value)
    );

    if (!allValid) {
      showFieldError(lastCcInput, 'Credit card must be 16 digits in 4 groups of 4.');
      return false;
    }

    clearFieldError(lastCcInput);
    return true;
  }

  // Event handlers
  function onBlur(e) {
    const input = e.target;
    // Validate this control on blur
    validateInput(input);

    // If the form is fully valid, clear the top-level error
    if (form.checkValidity()) {
      formErrors.textContent = '';
    }
  }

  function onFocus(e) {
    const input = e.target;
    // Clear inline message when the control regains focus
    if (input.name === 'credit_card') {
      // Clear error on the last credit card input
      const ccInputs = Array.from(form.querySelectorAll('input[name="credit_card"]'));
      const lastCcInput = ccInputs[ccInputs.length - 1];
      clearFieldError(lastCcInput);
    } else {
      clearFieldError(input);
    }
  }

  function validateAllInputs() {
    let allValid = true;
    let creditCardValidated = false;

    inputs.forEach(input => {
      // Only validate credit card once (not for each of the 4 inputs)
      if (input.name === 'credit_card') {
        if (!creditCardValidated) {
          const ok = validateCreditCard();
          if (!ok) allValid = false;
          creditCardValidated = true;
        }
      } else {
        const ok = validateInput(input);
        if (!ok) allValid = false;
      }
    });
    return allValid;
  }

  function onSubmit(e) {
    // Prevent native submission when invalid
    if (!form.checkValidity()) {
      e.preventDefault();
      formErrors.textContent = 'Fix errors before submitting this form.';
      // Validate all so user sees messages
      validateAllInputs();
      return;
    }

    // No errors: allow submit (form action is '#')
    formErrors.textContent = '';
  }

  // Wire up events
  inputs.forEach(input => {
    input.addEventListener('blur', onBlur);
    input.addEventListener('focus', onFocus);

    // Add keydown filters based on input type
    if (input.id === 'first_name' || input.id === 'last_name') {
      input.addEventListener('keydown', (e) => {
        if (!isAllowedNameKey(e.key)) {
          e.preventDefault();
        }
      });
    } else if (input.name === 'credit_card') {
      input.addEventListener('keydown', (e) => {
        if (!isAllowedDigitKey(e.key)) {
          e.preventDefault();
        }
      });
    } else if (input.id === 'phone') {
      input.addEventListener('keydown', (e) => {
        if (!isAllowedPhoneKey(e.key)) {
          e.preventDefault();
        }
      });
    }
  });

  form.addEventListener('submit', onSubmit);
});