let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with John'},
];

function createElement(type, content, className) {
  const element = document.createElement(type);
  if (className) element.classList.add(className);
  if (content) element.textContent = content;
  return element;
}

function createTodoList() {
  const list = createElement('ul', null, 'todos');

  todoItems.forEach(item => {
    const todo = createElement('li', item.title, null);
    todo.dataset.id = item.id;
    todo.dataset.title = item.title;
    const deleteButton = createElement('span', null, 'remove');

    todo.appendChild(deleteButton);
    list.appendChild(todo);
  });

  document.body.appendChild(list);
  document.body.appendChild(createElement('div', null, 'overlay'));
  document.body.appendChild(createElement('div', null, 'confirm_prompt'));

}

document.addEventListener('DOMContentLoaded', () => {
  createTodoList();

  const overlayDiv = document.querySelector('div.overlay');
  const promptDiv = document.querySelector('div.confirm_prompt');

  const closePrompt = () => {
    overlayDiv.classList.remove('show');
    promptDiv.classList.remove('show');
    promptDiv.innerHTML = '';
  };

  const openPrompt = (todo) => {
    overlayDiv.classList.add('show');
    promptDiv.classList.add('show');
    promptDiv.innerHTML = `
      <div class="confirm_wrapper" data-id="${todo.dataset.id}">
        <p>Are you sure you want to delete "${todo.dataset.title}"?</p>
        <div class="actions">
          <a href="#" class="confirm_yes">Yes</a>
          <a href="#" class="confirm_no">No</a>
        </div>
      </div>`;
  }

  document.querySelector('.todos').addEventListener('click', event => {
    if (event.target.classList.contains('remove')) {
      openPrompt(event.target.parentNode);
    }
  });

  promptDiv.addEventListener('click', event => {
    if (event.target.tagName !== 'A') return;
    event.preventDefault();
    
    if (event.target.classList.contains('confirm_yes')) {
      const wrapper = event.target.closest('.confirm_wrapper');
      const idToDelete = wrapper.dataset.id;
      const liToDelete = document.querySelector(`li[data-id="${idToDelete}"]`);
      
      if (liToDelete) liToDelete.remove();
      todoItems = todoItems.filter(item => item.id != idToDelete);
    }

    closePrompt();
  });

  overlayDiv.addEventListener('click', closePrompt);
});
