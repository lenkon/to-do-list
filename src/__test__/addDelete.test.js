import ToDoList from '../modules/toDoList.js';

const toDoList = new ToDoList();
describe('To-do list add list test', () => {
  document.body.innerHTML = '<div><ul class="to-do-list"></ul></div>';

  test('add item 1', () => {
    toDoList.saveTaskInList('Add item 1');
    const lists = document.querySelectorAll('.to-do-list li');
    expect(lists).toHaveLength(1);
  });
});
