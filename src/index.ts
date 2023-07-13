import { getAppState } from './ppai/appState';
import { imageListener } from './ppai/imageListener';
import { letterSelector } from './ppai/letterSelector';
import { searchBar } from './ppai/searchBar';
import { tagCollector } from './ppai/tagCollector';
import { tamperedStylesheet } from './ppai/tamperedStylesheet';
import {
  registerInjectable,
  startInjectableObserver,
} from './util/dom/injectable';
import { log } from './util/log';

(function () {
  'use strict';

  const state = getAppState();

  const onWindowResize = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile !== state.isMobile) {
      state.isMobile = isMobile;
      log(
        isMobile ? 'Mobile breakpoint detected' : 'Desktop breakpoint detected',
      );
    }
  };
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  log("G'day mates!");

  [
    searchBar,
    tamperedStylesheet,
    imageListener,
    letterSelector,
    tagCollector,
  ].forEach(registerInjectable);
  startInjectableObserver();
})();
