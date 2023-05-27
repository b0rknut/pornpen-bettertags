import { log } from '../log';

export type Injectable<T> = {
  name: string;
  isInjected: () => boolean;
  shouldBeInjected: () => boolean;
  inject: () => void;
  injectionDelay?: number;
  uninject: () => void;
  updateData: (data: T) => void;
};

const injectables: Injectable<never>[] = [];

export const registerInjectable = <T>(injectable: Injectable<T>) => {
  injectables.push(injectable);
};

const runInjectables = () => {
  for (const injectable of injectables) {
    const isInjected = injectable.isInjected();
    const shouldBeInjected = injectable.shouldBeInjected();
    if (isInjected && !shouldBeInjected) {
      log(`Uninjecting ${injectable.name}`);
      injectable.uninject();
    } else if (!isInjected && shouldBeInjected) {
      log(`Injecting ${injectable.name}`);
      if (injectable.injectionDelay) {
        setTimeout(injectable.inject, injectable.injectionDelay);
      } else {
        injectable.inject();
      }
    }
  }
};

let lastKnownUrl = '';

export const injectableObserver = new MutationObserver(() => {
  if (window.location.href !== lastKnownUrl) {
    // on page switch, run all injectables but a bit delayed to give the page time to load
    setTimeout(runInjectables, 1000);
    lastKnownUrl = window.location.href;
  }
  runInjectables();
});

export const startInjectableObserver = () => {
  const config = { subtree: true, childList: true };
  injectableObserver.observe(document, config);
};

export const forceReinject = (injectable: Injectable<never>) => {
  injectable.uninject();
  injectable.inject();
};
