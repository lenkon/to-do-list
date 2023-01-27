class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('datastore')) || [];
  }

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
      this.editElipsisEventHandler(this);
      this.deleteButtonEventHandler(this);
      this.editTextEventHandler();
    }
  }

  editDescriptionHandler = (event, toDoList) => {
    const id = parseInt(event.target.getAttribute('data-pos'), 10);
    const data = event.target.value;
    toDoList.editDescription({ id, data });
    event.target.disabled = true;
    event.target.parentNode.querySelector('.modify').classList.toggle('d-none');
  }

  editElipsisEventHandler = (toDoList) => {
    const descriptions = document.querySelectorAll('.item-description');

    descriptions.forEach((item) => item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.editDescriptionHandler(event, toDoList);
      }
    }));

    descriptions.forEach((item) => item.addEventListener('change', (event) => {
      this.editDescriptionHandler(event, toDoList);
    }));
  };

  editTextEventHandler = () => {
    const description = document.querySelectorAll('.modify');
    const descriptions = document.querySelectorAll('.item-description');

    description.forEach((item) => {
      item.addEventListener('click', (event) => {
        descriptions.forEach((e) => {
          e.disabled = true;
          e.parentNode.classList.remove('highlight');
          e.parentNode.querySelector('.modify').classList.remove('d-none');
          e.parentNode.querySelector('.fa-trash').classList.add('d-none');
        });
        event.target.parentNode.classList.add('highlight');
        const itemDescription = event.target.parentNode.querySelector('.item-description');
        const deleteButton = event.target.parentNode.querySelector('.fa-trash');
        itemDescription.disabled = false;
        itemDescription.focus();
        event.target.classList.toggle('d-none');
        deleteButton.classList.toggle('d-none');
      });
    });
  }

  deleteButtonEventHandler = (toDoList) => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((item) => {
      item.addEventListener('click', (event) => {
        toDoList.deleteTaskFromList(parseInt(event.target.getAttribute('data-index'), 10));
      });
    });
  };

  editDescription = ({ id, data }) => {
    this.tasks = this.getTasks().map((task) => {
      if (task.index === id && data !== '') task.description = data;
      return task;
    });
    this.saveToStorage();
    this.showList();
  }

  saveTaskInList = (description, completed = false) => {
    this.tasks.push({ description, completed, index: this.getTasks().length + 1 });
    this.saveToStorage();
  }

  deleteTaskFromList = (itemIndex = -1) => {
    if (itemIndex > 0) this.tasks.splice(itemIndex - 1, 1);
    this.regenerateTaskIds();
    this.saveToStorage();
    this.showList();
  }

  regenerateTaskIds = () => {
    this.tasks = this.getTasks().map((task, index) => {
      task.index = index + 1;
      return task;
    });
  }

  getTasks = () => this.tasks;

  saveToStorage = () => {
    localStorage.setItem('datastore', JSON.stringify(this.getTasks()));
  }
}

export default ToDoList;