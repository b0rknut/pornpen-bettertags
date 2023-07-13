/* eslint-disable @typescript-eslint/no-empty-function */
import { HEADERS_SELECTOR } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { $, $$ } from '../util/dom/querySelector';
import { getAppState } from './appState';
import { getAmountOfUserDefinedTags } from './tag';

export const collectAllTags = () => {
  const state = getAppState();

  state.allTagNodes = [];

  const headers = $$(HEADERS_SELECTOR);
  for (const headerNode of [...headers]) {
    const children = [
      ...(headerNode.nextSibling as HTMLElement).children,
    ] as HTMLElement[];
    state.allTagNodes = [...state.allTagNodes, ...children];

    // if no children that arent hidden, hide header
    if (children.some((child) => child.style.display !== 'none')) {
      (headerNode.parentNode as HTMLElement).style.removeProperty('display');
    } else {
      (headerNode.parentNode as HTMLElement).style.display = 'none';
    }
  }

  state.amountOfUserDefinedTags = getAmountOfUserDefinedTags();
};

export const tagCollector: Injectable<never> = (() => ({
  name: 'tagCollector',
  isInjected: () => false,
  shouldBeInjected: () => true,
  inject: collectAllTags,
  uninject: () => {},
  updateData: () => {},
}))();
