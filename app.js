'use strict'

//----------------------Classes-----------------------------//

let currentTodos = [];
const root = document.querySelector('.todoapp');

class Todo {
  constructor(title) {
    this.id = +new Date();
    this.title = title;
    this.completed = false;
    this.isVisible = true;
  }
}

class TodoList {
  constructor() {
    this.root = document.querySelector('.todoapp');
    this.todos = currentTodos;
    this.render(this.todos);
  }

  render() {
    let filterType = 'all';
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
          >

          <label for="toggle-all"></label>

          <ul class="todo-list">
            ${visibleTodos.map(todo => `
              <li
                class="todo-list__item ${todo.completed ? 'completed' : ''}"
                data-todo-id="${todo.id}"
              >
                <div class="view ${!todo.isVisible ? 'invisible' : ''}">
                  <input
                    id="todo-${todo.id}"
                    class="toggle"
                    type="checkbox"
                    ${todo.completed ? 'checked' : ''}
                  >

                  <label>${todo.title}</label>
                    
                  <button
                    class="destroy"
                  ></button>
                </div>
                
                <input
                  class="edit-field edit${todo.id} ${todo.isVisible ? 'invisible' : ''}"
                  id="${todo.id}"
                  type="text"
                  value="${todo.title}"
                >
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
              ${filterType === 'all' ? 'class="selected"' : ''}
            >All</a>
          </li>

          <li>
            <a
              href="#/active"
              data-filter="active"
              ${filterType === 'active' ? 'class="selected"' : ''}
            >Active</a>
          </li>

          <li>
            <a
              href="#/completed"
              data-filter="completed"
              ${filterType === 'completed' ? 'class="selected"' : ''}
            >Completed</a>
          </li>
        </ul>

        ${completedTodos.length > 0 ? `
          <button
            class="clear-completed"
          >
            Clear completed
          </button>
        ` : ''} 
      </footer>
    `;
    this.root.innerHTML = `
      ${header}

      ${currentTodos.length > 0 ? `
        ${main}
        ${footer}
      ` : ''}
    `;
    const input = this.root.querySelector('.new-todo');
    if (currentTodos.every(todo => todo.isVisible === true)) {
      input.focus();
    }
    this.addListeners();
  }

  addListeners() {
    const headerInput = document.querySelector('.new-todo');
    headerInput.addEventListener('keydown', (event) => {
      this.addTodo(event);
    });

    const toggle = document.querySelector('.toggle-all');
    toggle.addEventListener('change', (event) => {
      this.toggleAll(event.target.checked);
    });

    const togglers = document.querySelector('.toggle');
    togglers.forEach(toggler => {
      toggler.addEventListener('change', (todo, event) => {
        this.toggleTodo(todo.id, event.target.checked);
      })
    })

  }

  addTodo(event) {
    if (!event.target.value || event.key !== 'Enter') {
      return;
    }
  
    currentTodos.push(new Todo(event.target.value))
  
    this.render(this.todos);
  }

  removeTodo(id) {
    currentTodos = currentTodos.filter(todo => todo.id !== id);

    this.render(this.todos);
  }

  toggleAll(completed) {
    currentTodos.forEach(todo => {
      todo.completed = completed;
    });
    this.render(this.todos);
  }

  toggleTodo(id, completed) {
    const selectedTodo = currentTodos.find(todo => todo.id === id);
    selectedTodo.completed = completed;
    this.render(this.todos);
  }
}

const todoList = new TodoList();
console.log(currentTodos);