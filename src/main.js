/** @jsx createVirtualDOM */
import { createVirtualDOM, updateElement } from './utils';
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

const oldVirtualDOM = render(OLD_LIST);
const newVirtualDOM = render(NEW_LIST);
const $root = document.querySelector('#root');

updateElement({
  parentNode: $root,
  newNode: oldVirtualDOM,
});

const handleClickAddButton = () => {
  updateElement({
    parentNode: $root,
    oldNode: oldVirtualDOM,
    newNode: newVirtualDOM,
  });
};

const $button = document.querySelector('[aria-label="Add"]');
$button.onclick = handleClickAddButton;
