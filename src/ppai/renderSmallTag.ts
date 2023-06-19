export const createSmallTag = (text: string, category?: string) => {
  const tagNode = document.createElement('div');

  if (category) {
    const categoryNode = document.createElement('span');
    categoryNode.textContent = category;
    categoryNode.classList.add('category');
    tagNode.appendChild(categoryNode);
  }

  const textNode = document.createElement('span');
  textNode.textContent = text;
  textNode.classList.add('text');
  tagNode.appendChild(textNode);

  tagNode.classList.add('selectedTag');
  return tagNode;
};
