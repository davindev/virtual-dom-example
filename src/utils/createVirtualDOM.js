export function createVirtualDOM(type, props, ...children) {
  return { type, props, children: children.flat() };
}
