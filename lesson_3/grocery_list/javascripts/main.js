function getValue(selector) {
  return document.querySelector(selector).value;
}

(function groceryListManager() {
  class GroceryList {
    constructor(listContainerElement) {
      this.list = listContainerElement;
    }

    addItem(name, quantity) {
      const newItem = document.createElement('li');
      newItem.textContent = `${quantity} ${name}`;
      this.list.append(newItem);
    }
  }


  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const groceryList = new GroceryList (document.querySelector('#grocery-list'));
    
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      const itemName = getValue('#name');
      const quantity = getValue('#quantity') || '1';

      groceryList.addItem(itemName, quantity);
      form.reset();
    });
  });
})();

