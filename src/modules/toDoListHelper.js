class ToDoListHelper {
  static checkBoxEventHandler = (toDoList) => {
    const checkBox = document.querySelectorAll('input[type=checkbox]');
    checkBox.forEach((item) => {
      item.addEventListener('change', (event) => {
        const task = event.target.parentNode.querySelector('.item-description');
        task.classList.toggle('strike-line');
        toDoList.updateTaskStatus(parseInt(event.target.id, 10) - 1);
      });
    });
  };

  static deleteButtonEventHandler = (toDoList) => {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((item) => {
      item.addEventListener('click', (event) => {
        toDoList.deleteTaskFromList(false, parseInt(event.target.getAttribute('data-index'), 10));
      });
    });
  };

  static editElipsisEventHandler = (toDoList) => {
    const descriptions = document.querySelectorAll('.item-description');

    descriptions.forEach((desc) => desc.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ToDoListHelper.editDescriptionHandler(event, toDoList);
      }
    }));

    descriptions.forEach((desc) => desc.addEventListener('change', (event) => {
      ToDoListHelper.editDescriptionHandler(event, toDoList);
    }));
  };

  static editDescriptionHandler = (event, toDoList) => {
    const id = parseInt(event.target.getAttribute('data-pos'), 10);
    const data = event.target.value;
    toDoList.editDescription({ id, data });
    event.target.disabled = true;
    event.target.parentNode.querySelector('.modify').classList.toggle('display-none');
  }

  static resetDescFields = (descField) => {
    descField.disabled = true;
    descField.parentNode.classList.remove('highlight');
    descField.parentNode.querySelector('.modify').classList.remove('display-none');
    descField.parentNode.querySelector('.fa-trash').classList.add('display-none');
  }

  static setActiveDescField = (event) => {
    event.target.parentNode.classList.add('highlight');
    const itemDescription = event.target.parentNode.querySelector('.item-description');
    const deleteButton = event.target.parentNode.querySelector('.fa-trash');
    itemDescription.disabled = false;
    itemDescription.focus();
    event.target.classList.toggle('display-none');
    deleteButton.classList.toggle('display-none');
  }

  static editTextEventHandler = () => {
    const modifyDescription = document.querySelectorAll('.modify');
    const descriptions = document.querySelectorAll('.item-description');

    modifyDescription.forEach((item) => {
      item.addEventListener('click', (event) => {
        descriptions.forEach((descField) => ToDoListHelper.resetDescFields(descField));
        ToDoListHelper.setActiveDescField(event);
      });
    });
  }
}

export default ToDoListHelper;