'use strict';

let currentTodos = [];
let filterType = 'all';

const root = document.querySelector('.todoapp');
render();

const newTodoField = root.querySelector('.new-todo');
const todoList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

function render() {
  const activeTodos = currentTodos.filter(todo => !todo.completed);
  const completedTodos = currentTodos.filter(todo => todo.completed);
  const todos = {
    all: currentTodos,
    active: activeTodos,
    completed: completedTodos,
  };

  const visibleTodos = todos[filterType];
  const header = `
    <header class="header">
      <h1>todos</h1>

      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        onkeydown="addTodo(event)"
      >
    </header>
  `;
  const main = `
    <section class="main">
      <span class="toggle-all-container">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          ${activeTodos.length === 0 ? 'checked' : ''}
          onchange="toggleAll(event.target.checked)"
        >

        <label for="toggle-all"></label>

        <ul class="todo-list">
          ${visibleTodos.map(todo => `
            <li
              class="todo-list__item ${todo.completed ? 'completed' : ''}"
              data-todo-id="${todo.id}"
            >
              <input
                id="todo-${todo.id}"
                class="toggle"
                type="checkbox"
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id}, event.target.checked)"
              >

              <label>${todo.title}</label>

              <button
                class="destroy"
                onclick="removeTodo(${todo.id})"
              ></button>
            </li>
          `).join('')}
        </ul>
      </span>
    </section>
  `;
  const footer = `
    <footer class="footer">
      <span class="todo-count">
        ${activeTodos.length} items left
      </span>

      <ul class="filters">
        <li>
          <a
            href="#/"
            onclick="setFilterType('all')"
            ${filterType === 'all' ? 'class="selected"' : ''}
          >All</a>
        </li>

        <li>
          <a
            href="#/active"
            onclick="setFilterType('active')"
            data-filter="active"
            ${filterType === 'active' ? 'class="selected"' : ''}
          >Active</a>
        </li>

        <li>
          <a
            href="#/completed"
            onclick="setFilterType('completed')"
            data-filter="completed"
            ${filterType === 'completed' ? 'class="selected"' : ''}
          >Completed</a>
        </li>
      </ul>

      ${completedTodos.length > 0 ? `
        <button
          class="clear-completed"
          onclick="clearCompleted()"
        >
          Clear completed
        </button>
      ` : ''} 
    </footer>
  `;
  root.innerHTML = `
    ${header}

    ${currentTodos.length > 0 ? `
      ${main}
      ${footer}
    ` : ''}
  `;
}
function setFilterType(type) {
  filterType = type;
  render();
}
// Add todo
function addTodo(event) {
  if (event.key !== 'Enter' || !event.target.value) {
    return;
  }

  const id = +new Date();
  currentTodos.push({
    id: id,
    title: event.target.value,
    completed: false,
  });

  render();
}

// Remove todo
function removeTodo(todoId) {
  currentTodos = currentTodos.filter(todo => todo.id !== todoId);
  render();
}

// Toggle todo status
function toggleTodo(todoId, completed) {
  const selectedTodo = currentTodos.find(todo => todo.id === todoId);
  selectedTodo.completed = completed;
  render();
}

// Toggle all
function toggleAll(completed) {
  currentTodos.forEach(todo => {
    todo.completed = completed;
  });
  render();
}

// Clear all completed
function clearCompleted() {
  currentTodos = currentTodos.filter(todo => !todo.completed);
  render();
}
