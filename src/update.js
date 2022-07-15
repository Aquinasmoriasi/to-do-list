export default class Task {
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
    let tasks = this.task();
    tasks.splice(index, 1);
    tasks = tasks.filter((todo) => todo.index !== index);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static update(arr) {
    for (let i = 1; i <= arr.length; i += 1) {
      arr[i].index = i;
    }
    return arr;
  }

  static showTasks(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    const span = document.createElement('span');
    span.setAttribute('class', 'input');
    span.setAttribute('contenteditable', 'false');

    const i = document.createElement('i');
    i.setAttribute('class', 'bi bi-three-dots-vertical');

    span.textContent = `${task.description}`;
    li.append(input, span, i);
    taskList.appendChild(li);
  }
}
