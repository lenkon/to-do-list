import './style.css';
import ToDoList from './toDoList.js';

const inputForm = document.getElementById('input-form');
const inputValue = inputForm.elements['todo-item-input'];
const enterValue = document.querySelector('.fa-level-down');
const toDoList = new ToDoList();

const addInputValue = ({ toDoList }) => {
  if (inputValue.value !== '') {
    toDoList.saveTaskInList(inputValue.value);
    toDoList.showList();
    inputForm.reset();
  }
};

enterValue.addEventListener('click', () => {
  addInputValue({ toDoList });
});

inputValue.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && event.target.value !== '') {
    event.preventDefault();
    addInputValue({ toDoList });
  }
});

window.addEventListener('load', () => {
  toDoList.showList();
  inputValue.focus();
});
