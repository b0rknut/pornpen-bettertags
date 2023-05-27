/* eslint-disable @typescript-eslint/no-empty-function */
import { ON_MOBILE, registerStyles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { fetchAllTagsForImage } from './api';
import { getAppState } from './appState';
import { createSmallTag } from './renderSmallTag';
import { toggleTag } from './tag';

const tagCache = new Map<string, string[]>();
const renderImageTags = async (id: string) => {
  const container = $(A_TAG_SELECTOR);
  if (!container) return;

  let target = container.parentNode?.querySelector('.imageTags');
  if (!target) {
    target = document.createElement('div');
    target.classList.add('imageTags');
    container.parentNode?.appendChild(target);
  }

  target.innerHTML = '';
  try {
    if (!tagCache.has(id)) {
      const imageTags = await fetchAllTagsForImage(id);
      tagCache.set(id, imageTags);
    }
    const imageTags = tagCache.get(id)!;
    for (const tag of imageTags) {
      const tagNode = createSmallTag(tag);
      tagNode.addEventListener('click', () => {
        toggleTag(getAppState(), tag);
      });
      target.appendChild(tagNode);
    }
  } catch (e) {
    console.error(e);
  }
};

export const setImageTags = (id: string, tags: string[]) => {
  tagCache.set(id, tags);
};

const A_TAG_SELECTOR =
  '.w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/view/"]';

registerStyles(`
  /* rating container */
  ${ON_MOBILE} {
    .flex.justify-center.flex-col.items-center.mt-4, .flex.justify-center.flex-col.items-center.mb-4 {
      display: none;
    }
  }
`);

let lastKnownId = '';
export const imageTags: Injectable<string | null> = (() => ({
  name: 'imageTags',
  isInjected: () => {
    // no need to inject if no image present
    const container = $(A_TAG_SELECTOR);
    if (!container) return true;

    return container.parentElement?.querySelector('.imageTags') !== null;
  },
  shouldBeInjected: () => !!window.location.href.match(/make/),
  inject: () => {
    const container = $(A_TAG_SELECTOR);
    if (!container) return;

    const id = container.getAttribute('href')!.split('/')[2];
    lastKnownId = id;
    renderImageTags(id);
  },
  injectionDelay: 200,
  uninject: () => {},
  updateData: (id: string | null) => {
    const targetId = id ?? lastKnownId;
    renderImageTags(targetId);
  },
}))();
