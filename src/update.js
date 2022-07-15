class Task {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }

  static task() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static addTask(task) {
    const taskItem = document.querySelector('textarea');
    const tasks = this.task();
    tasks.push(task);
    taskItem.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static remove(index) {
    const tasks = this.task();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static showTasks(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    const span = document.createElement('span');
    span.setAttribute('class', 'input');

    const i = document.createElement('i');
    i.setAttribute('class', 'bi bi-three-dots-vertical');

    span.textContent = `${task.description}`;
    li.append(input, span, i);
    taskList.appendChild(li);
  }
}

const showAllTasks = () => {
  const tasks = Task.task();
  tasks.forEach((task) => {
    Task.showTasks(task);
  });
};

document.addEventListener('DOMContentLoaded', showAllTasks());

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const tasks = Task.task();
  const taskItem = document.querySelector('textarea').value.trim();
  const task = new Task(taskItem, tasks.length + 1);
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
    t.setAttribute('contenteditable', 'true');
  });
});

menu.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.remove('bi-three-dots-vertical');
    item.classList.add('bi-trash');
    
    const trash = document.querySelectorAll('.bi-trash');
    trash.forEach((tr) => {
      tr.addEventListener('click', () => {
        item.parentElement.style.display = 'none';
        Task.remove(item.parentElement);
      });
    });
  });
});
