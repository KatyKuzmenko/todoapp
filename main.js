'use strict';

const root = document.querySelector('.todoapp');
const todoList = root.querySelector('.todo-list');
const newTodoField = root.querySelector('.new-todo');
const allToggler = root.querySelector('.toggle-all');

function countNotCompletedTodos() {
  const notCompletedTodos = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');

  counter.innerHTML = `${notCompletedTodos.length} items left`;

  allToggler.checked = notCompletedTodos.length === 0;
}

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
      <label for="#todo-${id}">
        ${newTodoField.value}
      </label>
      <input id="todo-${id}" class="toggle" type="checkbox"></input>
      <button class="remove"></button>
    </li>
  `);

  newTodoField.value = '';
  countNotCompletedTodos();
});

todoList.addEventListener('click', (event) => {
  if (!event.target.matches('.remove')) {
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


