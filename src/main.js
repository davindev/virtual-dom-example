/** @jsx createElement */
import { createElement, createVirtualDOM } from './utils';

const vm = createVirtualDOM(
  <div>
    <button type="button">
      -
    </button>
    0
    <button type="button">
      +
    </button>
  </div>
);
