/*
Given the HTML (5.html), write some JS that updates the options on one dropdown when the selection in the other dropdown changes. For instance, when the user chooses an option under Classifications, the items in the Animals dropdown should change accordingly. (Use the provided lookup table to see which animals and classifications go together)
*/

const CLASS_MATCHER = {
  class: {
    Classifications: ['Animal', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Turtle', 'Salmon'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
  },
  animal: {
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
  },
};

function updateSelect(sourceEl, targetEl, lookupData) {
  const possibleValues = lookupData[sourceEl.value];

  for (let option of targetEl.options) {
    option.hidden = !possibleValues.includes(option.value);
  }

  const selectedOption = targetEl.options[targetEl.selectedIndex];

  if (selectedOption.hidden) {
    let firstVisibleOption = [...targetEl.options].find(opt => !opt.hidden);
    if (firstVisibleOption) firstVisibleOption.selected = true;
  }
}

document.addEventListener('DOMContentLoaded', event => {
  const form = document.querySelector('form');
  const [ classifications, animals, clearButton ] = form.children;

  form.addEventListener('change', event => {
    const target = event.target;

    if (target === classifications) {
      updateSelect(classifications, animals, CLASS_MATCHER.class);
    }
    
    if (target === animals) {
      updateSelect(animals, classifications, CLASS_MATCHER.animal);
    }
  });

  clearButton.addEventListener('click', event => {
    form.reset();

    [...classifications.options].forEach(opt => opt.hidden = false);
    [...animals.options].forEach(opt => opt.hidden = false);
  });
});
