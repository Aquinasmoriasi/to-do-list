/* eslint-disable import/prefer-default-export */
import Task from './update.js';

export const clear = (event) => {
  event.preventDefault();
  let tasks = Task.task();
  tasks = tasks.filter((t) => t.completed !== true);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.reload();
};