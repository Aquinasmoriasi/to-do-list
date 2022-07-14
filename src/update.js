class Task {
  constructor(description, completed = false, index = 0) {
    this.description = description;
    this.completed = completed;
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

  static showTasks() {
    const tasks = this.task();
    const taskList = document.getElementById('task-list');
    for (let j = 0; j < tasks.length; j += 1) {
      const li = document.createElement('li');
      li.setAttribute('draggable', 'true');

      const input = document.createElement('input');
      input.setAttribute('contenteditable', 'false');
      input.setAttribute('type', 'checkbox');

      const span = document.createElement('span');
      span.setAttribute('class', 'input');
      span.id = tasks[j].index;
      span.setAttribute('contenteditable', 'true');

      const i = document.createElement('i');
      i.setAttribute('class', 'bi bi-three-dots-vertical');

      span.innerHTML += tasks[j].description;
      li.append(input, span, i);
      taskList.appendChild(li);

      tasks[j].index = j;
    }
  }
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskItem = document.querySelector('textarea').value.trim();
  const task = new Task(taskItem);
  Task.addTask(task);
  Task.showTasks();
});

const text = document.querySelectorAll('li span');
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
});