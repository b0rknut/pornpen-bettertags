export const createSmallTag = (text: string) => {
  const tagNode = document.createElement('div');
  tagNode.classList.add('selectedTag');
  tagNode.innerText = text;
  return tagNode;
};
