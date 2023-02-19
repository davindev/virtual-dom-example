/** @jsx createElement */
import { createElement, updateElement } from './utils';
import { OLD_LIST, NEW_LIST } from './constants';

const render = (state) => (
  <div>
    <ul>
      {state.map((item) => <li>{item}</li>)}
    </ul>
    <button
      type="button"
      aria-label="Add"
    >
      Add
    </button>
  </div>
);

const oldNode = render(OLD_LIST);
const newNode = render(NEW_LIST);
const $root = document.querySelector('#root');

updateElement({
  parentNode: $root,
  newNode: oldNode,
});

const handleClickAddButton = () => {
  updateElement({
    parentNode: $root,
    oldNode,
    newNode,
  });
};

const $button = document.querySelector('[aria-label="Add"]');
$button.onclick = handleClickAddButton;
