import './style.css';
import Task from './update.js';

const showAllTasks = () => {
  const tasks = Task.task();
  tasks.forEach((task) => {
    Task.showTasks(task);
  });
};
document.addEventListener('DOMContentLoaded', showAllTasks());

document.querySelector('.text-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const tasks = Task.task();
  const taskItem = document.querySelector('textarea').value.trim();
  const task = new Task(taskItem, Object.keys(tasks).length + 1);
  Task.addTask(task);
  Task.showTasks(task);
});

const text = document.querySelectorAll('li span');

const menu = document.querySelectorAll('.bi-three-dots-vertical');

text.forEach((t) => {
  t.addEventListener('focus', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(t);
    range.collapse(false);
    selection.addRange(range);
    t.focus();
  });
  t.addEventListener('dblclick', () => {
    t.setAttribute('readonly', 'readonly');
  });
  t.addEventListener('keyup', (e) => {
    const index = e.target.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      t.removeAttribute('readonly');
      t.textContent = index;
    }
  });
});

menu.forEach((item) => {
  item.addEventListener('click', () => {
    if (!item.classList.contains('bi-trash')) {
      item.classList.toggle('bi-trash');
    }
    const trash = document.querySelectorAll('.bi-trash');
    trash.forEach((tr) => {
      tr.addEventListener('click', (e) => {
        let { id } = e.target.parentNode;
        id -= 1;
        Task.remove(id);
        window.location.reload();
      });
    });
  });
});
