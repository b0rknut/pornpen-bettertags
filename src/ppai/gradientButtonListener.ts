import { Injectable } from '../util/dom/injectable';
import { queryAndDeleteAll } from '../util/dom/markup';
import { $, $$ } from '../util/dom/querySelector';
import { getAppState } from './appState';
import { getAllSelectedTags } from './tag';

const GRADIENT_BUTTON_SELECTOR = '.GradientButton';

export const gradientButtonListener: Injectable<never> = (() => ({
  name: 'gradientButtonListener',
  isInjected: () => {
    const container = $(GRADIENT_BUTTON_SELECTOR);
    if (!container) return true;
    if (!container.classList.contains('injected')) return false;
    return true;
  },
  shouldBeInjected: () => true,
  inject: () => {
    const container = $(GRADIENT_BUTTON_SELECTOR);
    if (!container) return;
    container.classList.add('injected');
    container.addEventListener('click', () => {
      const state = getAppState();
      state.lastGeneratedSelectedTags = Array.from(
        getAllSelectedTags(state),
      ).map((tag) => tag.textContent ?? '');
    });
  },
  injectionDelay: 200,
  uninject: () => {},
  updateData: () => {},
}))();
