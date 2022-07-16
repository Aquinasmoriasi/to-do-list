import './style.css';
import Task from './modules/update.js';
import { clear } from './modules/filter.js';

function showAllTasks() {
  const tasks = Task.task();
  tasks.forEach((task) => {
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

const text = document.querySelectorAll('li span');

const menu = document.querySelectorAll('.bi-three-dots-vertical');

text.forEach((t) => {
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
        tasks = [...modifTasksBef, ...modifTasksAft];
        localStorage.setItem('tasks', JSON.stringify(tasks));
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

    if (checked) {
      tasks[(id - 1)].completed = true;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      e.target.nextSibling.style.textDecoration = 'line-through';
    } else {
      tasks[(id - 1)].completed = false;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      e.target.nextSibling.style.textDecoration = 'none';
    }
  });
});

document.getElementById('clear').addEventListener('click', clear);