export function createVirtualDOM(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const $el = document.createElement(node.type);

  Object
    .entries(node.props ?? {})
    .forEach(([ key, value ]) => {
      $el.setAttribute(key, value);
    });

  node.children?.forEach((child) => {
    $el.appendChild(createVirtualDOM(child));
  });

  return $el;
}
