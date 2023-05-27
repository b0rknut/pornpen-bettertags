/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '../util/dom/injectable';
import { addScript, queryAndDeleteAll } from '../util/dom/markup';
import { $ } from '../util/dom/querySelector';

export const popperjs: Injectable<never> = (() => ({
  name: 'popper.js',
  isInjected: () => !!$('#popperjs'),
  shouldBeInjected: () => true,
  inject: () => {
    addScript('https://unpkg.com/@popperjs/core@2', 'popperjs');
  },
  uninject: () => {
    queryAndDeleteAll('#popperjs');
  },
  updateData: () => {},
}))();
