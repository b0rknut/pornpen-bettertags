/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { AppState, getAppState } from './appState';
import { createSmallTag } from './renderSmallTag';
import { getAllSelectedTags, toggleTag } from './tag';

export const renderSelectedTags = (state: AppState) => {
  const container = document.querySelector('#selectedTags');
  if (!container) return;

  container.innerHTML = '';

  const selectedTagNodes = getAllSelectedTags(state);
  selectedTagNodes.sort((a, b) => a.innerText.localeCompare(b.innerText));

  for (const tagNode of selectedTagNodes) {
    const selectedTag = createSmallTag(tagNode.innerText);
    selectedTag.addEventListener('click', () => {
      toggleTag(state, selectedTag.innerText);
      renderSelectedTags(state);
    });

    container.appendChild(selectedTag);
  }
};

const SELECTED_TAGS_MARKUP = `
<div id="selectedTags"></div>
`;

export const selectedTags: Injectable<never> = (() => ({
  name: 'selectedTags',
  isInjected: () => true,
  shouldBeInjected: () => true,
  inject: () => {
    const destination = $('#searchBarContainer');
    const container = $('#selectedTagsContainer');
    const toolbar = $('.toolbar');
    if (!container) {
      if (!destination) return;
      const container = document.createElement('div');
      container.id = 'selectedTagsContainer';
      container.innerHTML = SELECTED_TAGS_MARKUP;
      destination.parentNode?.insertBefore(container, destination);
    }

    if (toolbar && container.firstChild !== toolbar)
      container.insertBefore(toolbar, container.firstChild);

    renderSelectedTags(getAppState());
  },
  injectionDelay: 200,
  uninject: () => {},
  updateData: () => {},
}))();
