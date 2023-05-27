import {
  fetchAllFolders,
  fetchAllTags,
  fetchAllTagsForImage,
} from './ppai/api';
import { getAppState } from './ppai/appState';
import { categorySelector } from './ppai/categorySelector';
import { gradientButtonListener } from './ppai/gradientButtonListener';
import { grids } from './ppai/grids';
import { imageListener } from './ppai/imageListener';
import { imageTags } from './ppai/imageTags';
import { popperjs } from './ppai/popperjs';
import { renamedHeaders } from './ppai/renamedHeaders';
import { searchBar } from './ppai/searchBar';
import { selectedTags } from './ppai/selectedTags';
import { tamperedStylesheet } from './ppai/tamperedStylesheet';
import { toolbar } from './ppai/toolbar';
import { tooltip } from './ppai/tooltip';
import { tooltipListeners } from './ppai/tooltipListeners';
import { topHeader } from './ppai/topHeader';
import { getScrollbarWidth } from './util/dom/getScrollbarWidth';
import {
  registerInjectable,
  startInjectableObserver,
} from './util/dom/injectable';
import { log } from './util/log';
import LZString from './util/lzstring';

(function () {
  'use strict';

  const state = getAppState();

  (unsafeWindow as any).LZString = LZString;

  fetchAllTags().then((data) => {
    state.allTags = data;
  });

  // fetchAllFolders().then((data) => {
  //   console.log(data);
  //   state.allFolders = data;
  // });
  (unsafeWindow as any).fetchAllTagsForImage = fetchAllTagsForImage;

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

  state.scrollbarSize = getScrollbarWidth();

  log("G'day mates!");

  [
    popperjs,
    searchBar,
    renamedHeaders,
    tamperedStylesheet,
    tooltip,
    tooltipListeners,
    grids,
    selectedTags,
    topHeader,
    toolbar,
    imageListener,
    categorySelector,
    imageTags,
    gradientButtonListener,
  ].forEach(registerInjectable);
  startInjectableObserver();
})();
