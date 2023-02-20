import { createVirtualDOM } from './createVirtualDOM';

export function updateElement({ parentNode, oldNode, newNode, index = 0 }) {
  // 노드가 새로 추가된 경우 부모 노드 아래에 추가한다.
  if (!oldNode && newNode) {
    parentNode?.appendChild(createVirtualDOM(newNode));
    return;
  }

  // 기존 노드가 삭제된 경우 부모 노드에서 삭제한다.
  if (oldNode && !newNode) {
    parentNode?.removeChild(parentNode?.childNodes?.[index]);
    return;
  }

  // 노드의 type이 다른 경우 새로운 노드로 대체한다.
  if (oldNode && newNode && (oldNode.type !== newNode.type)) {
    parentNode?.replaceChild(createVirtualDOM(newNode), parentNode?.childNodes?.[index]);
    return;
  }

  // 노드의 type이 같은 경우 attribute를 업데이트한다.
  // 1. newNode의 props를 순회하면서 노드의 attribute를 추가/수정한다.
  Object
    .entries(newNode?.props ?? {})
    .forEach(([key, value]) => {
      if (oldNode?.props?.[key] !== value) {
        parentNode?.childNodes?.[index].setAttribute(key, value);
      }
    });

  // 2. oldNode의 props를 순회하면서 newNode에 해당 prop이 없는 경우 노드의 attribute를 삭제한다.
  Object
    .keys(oldNode?.props ?? {})
    .forEach((key) => {
      if (!newNode?.props?.[key]) {
        parentNode?.childNodes?.[index].removeAttribute(key);
      }
    });

  // 자식 노드들을 순회한다.
  const maxLength = Math.max((oldNode?.children?.length ?? 0), (newNode?.children?.length ?? 0));

  for (let i = 0; i < maxLength; i += 1) {
    updateElement({
      parentNode: parentNode?.childNodes?.[index],
      oldNode: oldNode?.children?.[i],
      newNode: newNode?.children?.[i],
      index: i,
    });
  }
}
