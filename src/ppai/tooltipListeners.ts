/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, forceReinject } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { AppState, getAppState } from './appState';
import { selectedTags } from './selectedTags';
import { tooltip } from './tooltip';

export const attachTagNodeEventListeners = (state: AppState) => {
  state.allTagNodes.forEach((tagNode) => {
    if (tagNode.getAttribute('data-injected') === '1') return;

    let popper: unknown;
    tagNode.addEventListener('mouseover', () => {
      const name = tagNode.innerText;
      const tag = state.allTags.get(name);

      if (!tag) return;

      tooltip.updateData({
        name: tag.name,
        description: tag.description,
        category: tag.category,
        creator: tag.ownerUsername,
        saves: tag.numSaves,
        image: tag.imageUrl,
      });

      $('#tooltip').style.display = 'flex';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      popper = (unsafeWindow as any).Popper.createPopper(
        tagNode,
        document.querySelector('#tooltip'),
        {
          placement: 'right',
        },
      );
    });

    tagNode.addEventListener('mouseout', () => {
      const tooltip = $('#tooltip');
      tooltip.style.display = 'none';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (popper as any)?.destroy();
    });

    tagNode.addEventListener('click', () => {
      // this should result in all the event handlers registered
      // by the site to run to completion, and our event handler
      // to run after that
      setTimeout(() => forceReinject(selectedTags), 25);
    });

    tagNode.setAttribute('data-injected', '1');
  });
};

let lastKnownAmountOfTags = 0;
let lastKnownUrl = '';
export const tooltipListeners: Injectable<never> = (() => ({
  name: 'tooltipListeners',
  isInjected: () => {
    const url = window.location.href;
    if (url !== lastKnownUrl) {
      lastKnownUrl = url;
      return false;
    }

    const amountOfTags = getAppState().allTagNodes.length;
    if (amountOfTags !== lastKnownAmountOfTags) {
      lastKnownAmountOfTags = amountOfTags;
      return false;
    }

    return true;
  },
  shouldBeInjected: () => true,
  inject: () => {
    attachTagNodeEventListeners(getAppState());
  },
  injectionDelay: 200,
  uninject: () => {},
  updateData: () => {},
}))();
