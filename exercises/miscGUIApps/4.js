let todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John' }
];

function createElement(type, content, className) {
  const element = document.createElement(type);
  if (className) element.classList.add(className);
  if (content) element.textContent = content;
  return element;
}

function buildTodosList() {
  const list = createElement('ul', null, 'todos');

  todoItems.forEach((item) => {
    const todo = createElement('li', item.title, null);
    todo.dataset.id = item.id;
    todo.dataset.title = item.title;

    const deleteButton = createElement('span', null, 'remove');

    todo.appendChild(deleteButton);
    list.appendChild(todo);
  });
  document.body.appendChild(list);
}

function buildOverlay() {
  const overlayDiv = createElement('div', null, 'overlay');
  document.body.appendChild(overlayDiv);
}

function buildPromptContainer() {
  const promptContainer = createElement('div', null, 'confirm_prompt');
  document.body.appendChild(promptContainer);
}

function buildContextMenu() {
  const contextMenu = createElement('div', null, 'context_menu');
  const menuList = createElement('ul');

  const items = [
    { text: 'Edit Todo', action: 'edit' },
    { text: 'Show Details', action: 'show' },
    { text: 'Delete Todo', action: 'delete' },
  ];

  items.forEach(({ text, action }) => {
    const li = createElement('li', text);
    li.dataset.action = action;
    menuList.appendChild(li);
  });

  contextMenu.appendChild(menuList);
  document.body.appendChild(contextMenu);
}

function initializeTodosUI() {
  buildTodosList();
  buildOverlay();
  buildPromptContainer();
  buildContextMenu();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTodosUI();

  const todos = document.querySelector('.todos');
  const overlay = document.querySelector('.overlay');
  const prompt = document.querySelector('.confirm_prompt');
  const contextMenu = document.querySelector('.context_menu');

  const closePrompt = () => {
    [overlay, prompt].forEach(el => el.classList.remove('show'));
    prompt.innerHTML = '';
  };

  const openDeletePrompt = (id, title) => {
    prompt.innerHTML = `
      <div class="confirm_wrapper" data-id="${id}">
        <p>Are you sure you want to delete "${title}"?</p>
        <div class="actions">
          <a href="#" class="confirm_yes">Yes</a>
          <a href="#" class="confirm_no">No</a>
        </div>
      </div>`;
    overlay.classList.add('show');
    prompt.classList.add('show');
  };

  // Right Click (Context Menu)
  todos.addEventListener('contextmenu', event => {
    const li = event.target.closest('li');
    if (!li) return;
    event.preventDefault();

    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.dataset.id = li.dataset.id;
    contextMenu.dataset.title = li.dataset.title;
    contextMenu.classList.add('show');
  });

  // Context Menu Item Actions (Delete only)
  contextMenu.addEventListener('click', event => {
    const action = event.target.dataset.action;
    if (!action) return;

    if (action === 'delete') {
      openDeletePrompt(contextMenu.dataset.id, contextMenu.dataset.title);
    }
    contextMenu.classList.remove('show');
  });

  // Deletes item using red 'x'
  todos.addEventListener('click', event => {
    if (event.target.classList.contains('remove')) {
      const li = event.target.closest('li');
      openDeletePrompt(li.dataset.id, li.dataset.title);
    }
  });

  // Yes/No Actions
  prompt.addEventListener('click', event => {
    if (event.target.tagName !== 'A') return;
    event.preventDefault();
  
    if (event.target.classList.contains('confirm_yes')) {
      const id = event.target.closest('.confirm_wrapper').dataset.id;
      document.querySelector(`li[data-id="${id}"]`)?.remove();
      todoItems = todoItems.filter(item => item.id !== Number(id));
    }
    closePrompt();
  });

  // Close triggers
  overlay.addEventListener('click', closePrompt);
  document.addEventListener('click', event => {
    if (!contextMenu.contains(event.target)) {
      contextMenu.classList.remove('show');
    }
  });
});