import { COLORS, ON_MOBILE, TABLIST_SELECTOR, registerStyles } from '../styles';
import { Injectable, forceReinject } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { AppState, getAppState } from './appState';
import { toggleFirstTagThatIsNotHidden } from './tag';
import { collectAllTags } from './tagCollector';

export type TooltipInfo = {
  image: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  saves: number;
};

const SEARCHBAR_MARKUP = `
    <input class="searchBar" placeholder="Search..." style="color:white; background: #FFF1; border-right: 1px solid ${COLORS.gray200}; flex-grow: 1; margin:0; padding:0.5rem;"/><button style="background-color: #FFF1; padding:0.5rem 0.8rem;">❌</button>
`;

registerStyles(`
  /* searchBar */
  #searchBarContainer {
    border: 1px solid #fff8;
    width: 100%;
    height: 3rem;
    display: flex;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  ${ON_MOBILE} {
    #searchBarContainer {
      display: none;
    }
  }
`);

export const search = (state: AppState, value: string) => {
  state.allTagNodes.forEach((tagNode) => {
    const regex = state.letterFilter;
    if (
      tagNode.textContent?.includes(value) &&
      tagNode.textContent?.match(regex)
    ) {
      tagNode.style.removeProperty('display');
    } else {
      tagNode.style.display = 'none';
    }
  });
  collectAllTags();
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

      const searchbarContainer = document.createElement('div');
      searchbarContainer.id = 'searchBarContainer';
      searchbarContainer.innerHTML = SEARCHBAR_MARKUP;
      const searchBar = $<HTMLInputElement>('.searchBar', searchbarContainer);
      const deleteButton = $('button', searchbarContainer);

      tablist?.parentNode?.insertBefore(searchbarContainer, tablist);
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
