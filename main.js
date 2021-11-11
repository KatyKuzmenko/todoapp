'use strict';

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const todoList = root.querySelector('.todo-list');
const todos = root.querySelectorAll('.todo-list__item');
const allToggler = root.querySelector('.toggle-all');
const clearButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');
const footer = root.querySelector('.footer');

footer.hidden = true;

function countNotCompletedTodos() {
  const notCompletedTodos = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  const completedTodos = root.querySelectorAll('.toggle:checked');
  const todos = root.querySelectorAll('.todo-list__item');

  counter.innerHTML = `${notCompletedTodos.length} items left`;
  allToggler.checked = notCompletedTodos.length === 0;
  clearButton.hidden = completedTodos.length === 0;
  footer.hidden = todos.length === 0;
};

newTodoField.addEventListener('keydown', (event) => {
  const id = +new Date();

  if (event.key !== 'Enter' || !newTodoField.value) {
    return;
  }

  todoList.insertAdjacentHTML('beforeend', `
    <li class="todo-list__item">
      <input id="todo-${id}" class="toggle" type="checkbox">
      <label for="#todo-${id}">${newTodoField.value}</label>
      <button class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';
  countNotCompletedTodos();
});

todoList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  event.target.closest('.todo-list__item').classList.toggle('completed', event.target.checked);
  countNotCompletedTodos();
});

todoList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo-list__item').remove();
  countNotCompletedTodos();
});

allToggler.addEventListener('change',  () => {
  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-list__item').classList.toggle('completed', allToggler.checked);
  }

  countNotCompletedTodos();
});

clearButton.addEventListener('click', () => {
  const completedTodos = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTodos) {
    toggler.closest('.todo-list__item').remove();
  }

  countNotCompletedTodos();
});

filter.addEventListener('click', (event) => {
  if (!event.target.dataset.filter) {
    return;
  }

  const filterLinks = root.querySelectorAll('[data-filter]');

  for (const link of filterLinks) {
    link.classList.toggle('selected', event.target === link);
  }

  const togglers = root.querySelectorAll('.toggle');
  for (const toggler of togglers) {
    const todo = toggler.closest('.todo-list__item');

    switch (event.target.dataset.filter) {
      case 'all':
        todo.hidden = false;
        break;

      case 'active':
        todo.hidden = toggler.checked;
        break;

      case 'completed':
        todo.hidden = !toggler.checked;
        break;
    }
  }
});
