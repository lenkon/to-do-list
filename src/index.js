import './style.css';

const list = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 2,
  },
  {
    description: 'fix car',
    completed: false,
    index: 3,
  },
];

const showList = () => {
  const toDoList = document.getElementById('to-do-list');
  list.forEach((item) => {
    toDoList.innerHTML += `<li class='todo-item'>
      <input type='checkbox' class="checkbox" id=${item.index}/>
      <input type='text' class='item-description' value='${item.description}' disabled/>
      <span class='fa fa-lg fa-ellipsis-v fa_custom'></span>
    </li>`;
  });
};

showList();