/* eslint-disable @typescript-eslint/no-empty-function */
import { HEADERS_SELECTOR } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { $$ } from '../util/dom/querySelector';

export const renamedHeaders: Injectable<never> = (() => ({
  name: 'renamedHeaders',
  isInjected: () => false,
  shouldBeInjected: () =>
    $$(HEADERS_SELECTOR).some(
      (header) => header.innerText === 'Number of people',
    ),
  inject: () => {
    $$(HEADERS_SELECTOR)
      .filter((header) => header.innerText === 'Number of people')
      .map((header) => (header.innerText = '#👩'));
  },
  uninject: () => {},
  updateData: () => {},
}))();
