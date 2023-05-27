/* eslint-disable @typescript-eslint/no-empty-function */
import { styles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { addStyle, queryAndDeleteAll } from '../util/dom/markup';
import { $ } from '../util/dom/querySelector';

export const tamperedStylesheet: Injectable<never> = (() => ({
  name: 'tamperedStylesheet',
  isInjected: () => !!$('#tamperedStylesheet'),
  // when clicking "clear tags" the url will be rewritten to just pp.ai/. This is a bug in the app.
  shouldBeInjected: () => true,
  inject: () => {
    addStyle(styles, 'tamperedStylesheet');
  },
  uninject: () => {
    queryAndDeleteAll('#tamperedStylesheet');
  },
  updateData: () => {},
}))();
