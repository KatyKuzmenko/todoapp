'use strict';

const root = document.querySelector('.todoapp');
const todoList = root.querySelector('.todo-list');
const newTodoField = root.querySelector('.new-todo');
const allToggler = root.querySelector('.toggle-all');
const clearButton = root.querySelector('.clear-completed');

function countNotCompletedTodos() {
  const notCompletedTodos = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  const completedTodos = root.querySelectorAll('.toggle:checked');

  counter.innerHTML = `${notCompletedTodos.length} items left`;
  allToggler.checked = notCompletedTodos.length === 0;
  clearButton.hidden = completedTodos.length === 0;
}

clearButton.addEventListener('click', () => {
  const completedTodos = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTodos) {
    toggler.closest('.todo-list__item').remove();
  }

  countNotCompletedTodos();
});

allToggler.addEventListener('change',  () => {
  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-list__item').classList.toggle('completed', allToggler.checked);
  }
});

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

todoList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo-list__item').remove();
  countNotCompletedTodos();
});

todoList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle-all')) {
    return;
  }

  event.target.closest('.todo-list__item').classList.toggle('completed', event.target.checked);
  countNotCompletedTodos();
});


