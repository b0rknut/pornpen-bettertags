export const sortChildrenBy =
  (comparator: (a: HTMLElement, b: HTMLElement) => number) =>
  (nodes: HTMLElement) => {
    if (!nodes?.children) return;
    ([...nodes.children] as HTMLElement[])
      .sort(comparator)
      .forEach((node) => nodes.appendChild(node));
  };

export const sortChildrenByText = sortChildrenBy((a, b) =>
  a.innerText.localeCompare(b.innerText),
);
