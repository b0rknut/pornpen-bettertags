import { wait } from '../wait';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const $ = <T extends Element = HTMLElement>(
  selector: string,
  node: Element | Document = document,
) => {
  return node.querySelector<T>(selector)!;
};

export const $$ = <T extends Element = HTMLElement>(
  selector: string,
  node: Element | Document = document,
) => {
  return [...node.querySelectorAll<T>(selector)];
};

export const loadIframe = async (src: string) =>
  new Promise<HTMLIFrameElement>((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.width = '0';
    iframe.style.height = '0';
    document.body.appendChild(iframe);
    iframe.src = src;
    (iframe.contentWindow as any).console.log = () => {};
    iframe.onload = () => resolve(iframe);
  });

export const queryableIframe = async (src: string) => {
  const iframe = await loadIframe(src);

  return {
    iframe,
    $: <T extends Element = HTMLElement>(selector: string) =>
      $<T>(selector, iframe.contentWindow!.document),
    $$: <T extends Element = HTMLElement>(selector: string) =>
      $$<T>(selector, iframe.contentWindow!.document),
    destroy: () => {
      iframe.remove();
    },
  };
};

const TIMEOUT = 7000;
export const $$$ = async <T extends Element = HTMLElement>(
  url: string,
  selector: string,
  initialDelay: number = 0,
) => {
  const remote = await queryableIframe(url);
  if (initialDelay > 0) {
    await wait(initialDelay);
  }
  const started = Date.now();

  return new Promise<T[]>((resolve, reject) => {
    const interval = setInterval(() => {
      const tags = remote.$$<T>(selector);
      if (tags.length > 0) {
        clearInterval(interval);
        remote.destroy();
        resolve(tags);
      } else if (Date.now() - started > TIMEOUT) {
        clearInterval(interval);
        remote.destroy();
        reject();
      }
    });
  });
};
