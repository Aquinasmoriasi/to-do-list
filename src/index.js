import './style.css';
import './mobile.css';
import Task from './modules/update.js';
import { clear } from './modules/filter.js';

function showAllTasks() {
  const tasks = Task.task();
  const sup = document.querySelector('sup');
  let counter = 0;
  tasks.forEach((task) => {
    if (task.completed === true) {
      counter += 1;
      sup.textContent = counter;
    }
    Task.showTasks(task);
  });
}
document.addEventListener('DOMContentLoaded', showAllTasks());

document.querySelector('.text-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const tasks = Task.task();
  const taskItem = document.querySelector('textarea').value.trim();
  const task = new Task(taskItem, Object.keys(tasks).length + 1);
  Task.addTask(task);
  Task.showTasks(task);
  window.location.reload();
});

document.querySelector('.text-input').addEventListener('keyup', (e) => {
  e.preventDefault();
  const tasks = Task.task();
  if (e.key === 'Enter') {
    const taskItem = document.querySelector('textarea').value.trim();
    const task = new Task(taskItem, Object.keys(tasks).length + 1);
    Task.addTask(task);
    Task.showTasks(task);
    window.location.reload();
  }
});

const menu = document.querySelectorAll('.bi-three-dots-vertical');

menu.forEach((item) => {
  item.addEventListener('mouseover', () => {
    if (!item.classList.contains('bi-trash')) {
      item.classList.add('bi-trash');
    } else {
      item.classList.remove('bi-trash');
    }
  });
  item.addEventListener('mouseout', () => {
    if (!item.classList.contains('bi-trash')) {
      item.classList.add('bi-trash');
    } else {
      item.classList.remove('bi-trash');
    }
  });
  item.addEventListener('click', () => {
    const trash = document.querySelectorAll('.bi-trash');

    trash.forEach((tr) => {
      tr.addEventListener('click', (e) => {
        let tasks = Task.task();
        e.target.parentNode.style.display = 'none';
        const { id } = e.target.parentNode;
        const modifTasksBef = tasks.slice(0, id);
        modifTasksBef.pop();
        const modifTasksAft = tasks.slice(id);
        modifTasksAft.forEach((t) => {
          t.index -= 1;
        });

        if (tasks.length === 2 && id === 1) {
          tasks = modifTasksAft;
        } else if (tasks.length === 2 && id === 2) {
          tasks = modifTasksBef;
        } else {
          tasks = [...modifTasksBef, ...modifTasksAft];
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        const sup = document.querySelector('sup');
        const completed = tasks.filter((t) => t.completed === true);
        if (completed.length === 0) {
          sup.textContent = '';
        } else {
          sup.textContent = completed.length;
        }
      });
    });
  });
});

const editInput = document.querySelectorAll('.input');

editInput.forEach((input) => {
  input.addEventListener('change', (e) => {
    const input = e.target.parentNode.childNodes[1].value.trim();
    const { id } = e.target.parentNode;
    const tasks = Task.task();
    tasks[(id - 1)].description = input;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
});

const checked = document.querySelectorAll('.check');

checked.forEach((check) => {
  check.addEventListener('change', (e) => {
    const tasks = Task.task();
    const { checked } = e.target;
    const { id } = e.target.parentNode;
    const sup = document.querySelector('sup');

    if (checked && tasks.length > 1) {
      tasks[(id - 1)].completed = true;
      const completed = tasks.filter((t) => t.completed === true);
      sup.textContent = completed.length;
      e.target.nextSibling.style.textDecoration = 'line-through';
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else if (!checked && tasks.length > 1) {
      tasks[(id - 1)].completed = false;
      const completed = tasks.filter((t) => t.completed === true);
      sup.textContent = completed.length;
      e.target.nextSibling.style.textDecoration = 'none';
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else if (checked) {
      tasks[0].completed = true;
      sup.textContent = 1;
      e.target.nextSibling.style.textDecoration = 'line-through';
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      tasks[0].completed = false;
      sup.textContent = '';
      e.target.nextSibling.style.textDecoration = 'none';
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
});

document.getElementById('clear').addEventListener('click', clear);