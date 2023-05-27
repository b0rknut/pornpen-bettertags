export const addStyle = (styleString: string, id: string) => {
  const style = document.createElement('style');
  style.textContent = styleString;
  style.setAttribute('id', id);
  document.head.append(style);
};

export const addScript = (src: string, id: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('id', id);
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', (e) => reject(e.error));
    document.head.appendChild(script);
  });
};

export const queryAndDeleteAll = (selector: string) => {
  try {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => node.parentNode?.removeChild(node));
    // eslint-disable-next-line no-empty
  } catch (e) {}
};
