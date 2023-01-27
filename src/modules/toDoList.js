import ToDoListHelper from './toDoListHelper.js';

class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('datastore')) || [];
  }

  getTasks = () => this.tasks;

  showList = () => {
    const listContainer = document.getElementById('to-do-list');
    listContainer.innerHTML = '';

    this.getTasks().forEach((todo) => {
      listContainer.innerHTML += `<li class='todo-item'>
        <input type='checkbox' class="checkbox" id=${todo.index}/>
        <input type='text' class='item-description' data-pos='${todo.index}' 
        value='${todo.description}' disabled/>
        <span class='modify fa fa-ellipsis-v fa_custom'></span>
        <span class='trash-btn d-none fa fa-trash delete' data-index=${todo.index}></span>
      </li>`;
    });

    if (this.getTasks().length > 0) {
      ToDoListHelper.editElipsisEventHandler(this);
      ToDoListHelper.deleteButtonEventHandler(this);
      ToDoListHelper.editTextEventHandler();
      ToDoListHelper.checkBoxEventHandler(this);
    }
  }

  saveToStorage = () => {
    localStorage.setItem('datastore', JSON.stringify(this.getTasks()));
  }

  saveTaskInList = (description, completed = false) => {
    this.tasks.push({ description, completed, index: this.getTasks().length + 1 });
    this.saveToStorage();
  }

  deleteTaskFromList = (clear = false, itemIndex = -1) => {
    if (clear) {
      this.tasks = this.getTasks().filter((task) => task.completed === false);
    }

    if (itemIndex > 0) this.tasks.splice(itemIndex - 1, 1);
    this.regenerateTaskIds();
    this.saveToStorage();
    this.showList();
  }

  updateTaskStatus = (index) => {
    if (this.tasks[index].completed) {
      this.tasks[index].completed = false;
    } else {
      this.tasks[index].completed = true;
    }
    this.saveToStorage();
  }

  regenerateTaskIds = () => {
    this.tasks = this.getTasks().map((task, index) => {
      task.index = index + 1;
      return task;
    });
  }

  editDescription = ({ id, data }) => {
    this.tasks = this.getTasks().map((task) => {
      if (task.index === id && data !== '') task.description = data;
      return task;
    });
    this.saveToStorage();
    this.showList();
  }
}

export default ToDoList;