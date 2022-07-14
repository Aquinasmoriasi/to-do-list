import './style.css';

const list = [
  {
    description: 'Go to the shop',
    completed: false,
    index: 0,
  },
  {
    description: 'Play chess',
    completed: false,
    index: 0,
  },
  {
    description: 'Pick up groceries',
    completed: false,
    index: 0,
  },
  {
    description: 'Visit Laura',
    completed: false,
    index: 0,
  },
  {
    description: 'Watch a movie',
    completed: false,
    index: 0,
  },
  {
    description: 'Kill a mocking bird',
    completed: false,
    index: 0,
  },
];

const taskList = document.getElementById('task-list');

for (let j = 0; j < list.length; j += 1) {
  const li = document.createElement('li');
  li.setAttribute('draggable', true);

  const input = document.createElement('input');
  input.setAttribute('contenteditable', 'false');
  input.setAttribute('type', 'checkbox');

  const span = document.createElement('span');
  span.setAttribute('class', 'input');
  span.setAttribute('contenteditable', 'true');

  const i = document.createElement('i');
  i.setAttribute('class', 'bi bi-three-dots-vertical');

  span.textContent += list[j].description;
  li.append(input, span, i);
  taskList.appendChild(li);
  list[j].index += j;
}

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
