import { TABLIST_SELECTOR } from '../styles';
import { Injectable, forceReinject } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { AppState, getAppState } from './appState';
import { grids } from './grids';
import { toggleFirstTagThatIsNotHidden } from './tag';

export type TooltipInfo = {
  image: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  saves: number;
};

const SEARCHBAR_MARKUP = `
<div id="searchBarContainer" style="display: flex; width:100%">
    <input class="searchBar" placeholder="Search..." style="color:white; background: #FFF1; border: 1px solid #FFF2; flex-grow: 1; margin:0; padding:0.5rem; border-top-left-radius:0.5rem;"/><button style="background-color: #FFF1; border: 1px solid #FFF2; border-left: none; border-top-right-radius:0.5rem; padding:0.5rem 0.8rem;">❌</button>
</div>
`;

export const search = (state: AppState, value: string) => {
  state.allTagNodes.forEach((tagNode) => {
    if (tagNode.textContent?.includes(value)) {
      tagNode.style.display = 'block';
    } else {
      tagNode.style.display = 'none';
    }
  });
  forceReinject(grids);
};

export const searchBar: Injectable<never> = (() => ({
  name: 'searchBar',
  isInjected: () => !!$('#searchBarContainer') || !$(TABLIST_SELECTOR),
  shouldBeInjected: () => true,
  inject: () => {
    try {
      const tablist = $(TABLIST_SELECTOR);

      if (!tablist) return;

      const state = getAppState();

      const toolsContainer = document.createElement('div');
      toolsContainer.innerHTML = SEARCHBAR_MARKUP;
      const searchBar = $<HTMLInputElement>('.searchBar', toolsContainer);
      const deleteButton = $('button', toolsContainer);

      tablist?.parentNode?.insertBefore(toolsContainer, tablist);
      tablist?.parentNode?.removeChild(tablist);

      searchBar.addEventListener('input', () => {
        search(state, searchBar.value);
      });

      searchBar.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          toggleFirstTagThatIsNotHidden(state);
        }
      });

      deleteButton.addEventListener('click', () => {
        searchBar.value = '';
        search(state, '');
      });

      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  uninject: () => {},
  updateData: () => {},
}))();
