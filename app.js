'use strict'

//----------------------Classes-----------------------------//

let currentTodos = [];
const root = document.querySelector('.todoapp');
let filterType = 'all';

class Todo {
  constructor(title) {
    this.id = +new Date();
    this.title = title;
    this.completed = false;
  }
}

class TodoList {
  constructor() {
    this.root = document.querySelector('.todoapp');
    this.todos = currentTodos;
    this.render(this.todos);
  }

  render() {
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
          onkeydown="todoList.addTodo(event)"
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
            onchange="todoList.toggleAll(event.target.checked)"
          >
          <label for="toggle-all"></label>
          <ul class="todo-list">
            ${visibleTodos.map(todo => `
              <li
                class="todo-list__item ${todo.completed ? 'completed' : ''}"
                data-todo-id="${todo.id}"
              >
                <div class="view${todo.id}">
                  <input
                    id="todo-${todo.id}"
                    class="toggle"
                    type="checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="todoList.toggleTodo(${todo.id}, event.target.checked)"
                  >
                  <label ondblclick="todoList.editTodo(${todo.id})">${todo.title}</label>
                    
                  <button
                    class="destroy"
                    onclick="todoList.openModalWindow(${todo.id})"
                  ></button>
                </div>

                <div class="modal${todo.id} modal">
                  <div class="modal__content">
                    <button class="modal__close-button">
                    </button>

                    <p class="modal__title">
                      Are you sure You want to delete this task?
                    </p>

                    <div class="button-container">
                      <button
                        class="modal__button"
                        onclick="todoList.closeModalWindow(${todo.id})"
                      >Delete</button>
                      <button class="modal__button">Cancel</button>
                    </div>
                  </div>
                </div>

                
                <input
                  class="edit-field edit${todo.id} invisible"
                  id="${todo.id}"
                  type="text"
                  value="${todo.title}"
                  onkeydown="todoList.setTitleOnKeydown(event, ${todo.id}, event.target.value)"
                  onblur="todoList.setTitleOnBlur(event, ${todo.id}, event.target.value)"
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
              onclick="todoList.setFilterType('all')"
            >All</a>
          </li>
          <li>
            <a
              href="#/active"
              data-filter="active"
              ${filterType === 'active' ? 'class="selected"' : ''}
              onclick="todoList.setFilterType('active')"
            >Active</a>
          </li>
          <li>
            <a
              href="#/completed"
              data-filter="completed"
              ${filterType === 'completed' ? 'class="selected"' : ''}
              onclick="todoList.setFilterType('completed')"
            >Completed</a>
          </li>
        </ul>
        ${completedTodos.length > 0 ? `
          <button
            class="clear-completed"
            onclick="todoList.clearCompleted()"
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
    input.focus();
  }

  setFilterType(type) {
    filterType = type;
    this.render(this.todos);
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

  editTodo(id) {
    const editInput = this.root.querySelector(`.edit${id}`);
    const todoItem = this.root.querySelector(`.view${id}`);
    editInput.className = `edit-field edit${id}`;
    todoItem.classList.add('invisible');
    editInput.focus();
    editInput.selectionStart = editInput.value.length;
  }

  setTitle(id, title) {
    const selectedTodo = currentTodos.find(todo => todo.id === id);
    selectedTodo.title = title;
    const editInput = this.root.querySelector(`.edit${id}`);
    editInput.classList.add('invisible');
    this.render(this.todos);
  }

  setTitleOnKeydown(event, id, title) {
    if (event.key !== 'Enter' || !event.target.value.trim()) {
      return;
    }
    this.setTitle(id, title);
  }

  setTitleOnBlur(event, id, title) {
    if (!event.target.value.trim()) {
      return;
    }

    this.setTitle(id, title);
  }

  clearCompleted() {
    currentTodos = currentTodos.filter(todo => !todo.completed);
    this.render(this.todos);
  }

  openModalWindow(id) {
    const modal = this.root.querySelector(`.modal${id}`);
    modal.classList.add('modal--active');
  }

  closeModalWindow(id) {
    const modal = root.querySelector('.modal');
    modal.classList.remove('modal--active');
    this.removeTodo(id);
  }
}

const todoList = new TodoList();