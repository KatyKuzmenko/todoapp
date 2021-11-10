'use strict';

const root = document.querySelector('.todoapp');

const newTodoField = root.querySelector('.new-todo');

newTodoField.addEventListener('keydown', (event) => {
  const id = +new Date();
  const todoList = root.querySelector('.todo-list');

  if (event.key !== 'Enter' || !newTodoField.value) {
    return;
  }

  todoList.insertAdjacentHTML('beforeend', `
    <li>
      <label>
        ${newTodoField.value}
        <input id="todo-${id}" class="toggle" type="checkbox"></input>
      </label>

      <button class="remove"></button>
    </li>
  `);

  newTodoField.value = '';

  const notCompletedTodos = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  counter.innerHTML = `${notCompletedTodos.length} items left`;

});

