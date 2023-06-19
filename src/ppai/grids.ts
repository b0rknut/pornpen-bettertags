/* eslint-disable @typescript-eslint/no-empty-function */
import { HEADERS_SELECTOR, PANEL_SELECTOR } from '../styles';
import { Injectable, forceReinject } from '../util/dom/injectable';
import { $, $$ } from '../util/dom/querySelector';
import { sortChildrenBy, sortChildrenByText } from '../util/dom/sortChildren';
import { isSorted } from '../util/isSorted';
import { getAppState } from './appState';
import { selectedTags } from './selectedTags';
import { getAmountOfUserDefinedTags } from './tag';

const childLengthComparator = (a: HTMLElement, b: HTMLElement) =>
  a.querySelectorAll('.flex.col.flex-wrap > div').length -
  b.querySelectorAll('.flex.col.flex-wrap > div').length;
export const sortTagGroupByNumberOfTags = sortChildrenBy(childLengthComparator);

export const reflowGrids = () => {
  const state = getAppState();

  state.allTagNodes = [];

  const groups = $(PANEL_SELECTOR);
  sortTagGroupByNumberOfTags(groups);

  const headers = $$(HEADERS_SELECTOR);

  for (const headerNode of [...headers]) {
    const contentNode = headerNode.nextSibling as HTMLElement;
    sortChildrenByText(contentNode);
    const children = [...contentNode.children] as HTMLElement[];
    children.forEach((node) => {
      node.setAttribute('data-category', headerNode.innerText);
    });
    state.allTagNodes = [...state.allTagNodes, ...children];
    const numberOfChildren = contentNode.children.length;

    // if no children that arent hidden, hide header
    if (children.some((child) => child.style.display !== 'none')) {
      headerNode.style.display = 'block';
    } else {
      headerNode.style.display = 'none';
    }
  }

  state.amountOfUserDefinedTags = getAmountOfUserDefinedTags();
};

let lastKnownAmountOfTags = 0;
let lastKnownUrl = '';
export const grids: Injectable<never> = (() => ({
  name: 'grids',
  isInjected: () => {
    // reinject if url changes
    const url = window.location.href;
    if (url !== lastKnownUrl) {
      lastKnownUrl = url;
      return false;
    }

    // reinject if amount of tags changes
    const amountOfTags = getAppState().allTagNodes.length;
    if (amountOfTags !== lastKnownAmountOfTags) {
      lastKnownAmountOfTags = amountOfTags;
      return false;
    }

    // reinject if tag groups not sorted
    const groups = $(PANEL_SELECTOR);
    if (!groups) return true;
    return isSorted(
      [...groups.children] as HTMLElement[],
      childLengthComparator,
    );
  },
  shouldBeInjected: () => true,
  inject: () => {
    const groups = $(PANEL_SELECTOR);
    if (!groups) return;

    if (!groups.classList.contains('data-injected')) {
      groups.addEventListener('wheel', (evt) => {
        if (getAppState().isMobile) return;

        evt.preventDefault();
        groups.scrollLeft += evt.deltaY;
      });
      groups.classList.add('data-injected');
    }

    forceReinject(selectedTags);
    reflowGrids();
  },
  injectionDelay: 200,
  uninject: () => {},
  updateData: () => {},
}))();
