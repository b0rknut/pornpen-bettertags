/* eslint-disable @typescript-eslint/no-empty-function */
import { ON_MOBILE, registerStyles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { fetchAllTagsForImage } from './api';
import { getAppState } from './appState';
import { A_TAG_SELECTOR } from './imageListener';
import { createSmallTag } from './renderSmallTag';
import { toggleTag } from './tag';

const tagCacheMap = new Map<string, string[]>();

const tagCache = async (id: string) => {
  if (!tagCacheMap.has(id)) {
    tagCacheMap.set(id, 'STALE' as any);
    const imageTags = await fetchAllTagsForImage(id);
    tagCacheMap.set(id, imageTags);
  }
  const result = tagCacheMap.get(id)!;
  return {
    stale: result === ('STALE' as any),
    data: result === ('STALE' as any) ? [] : result,
  };
};

export const setImageTags = (id: string, tags: string[]) => {
  tagCacheMap.set(id, tags);
};

const renderImageTags = async (id: string) => {
  const container = $(A_TAG_SELECTOR);
  if (!container) return;

  const isMobile = getAppState().isMobile;

  const targetContainer = isMobile ? container : container.parentNode;

  let target = targetContainer?.querySelector('.imageTags');
  if (!target) {
    target = document.createElement('div');
    target.classList.add('imageTags');
    if (isMobile) {
      target.classList.add('hidden');
    }
    targetContainer?.appendChild(target);
  }

  try {
    target.innerHTML = '';
    const { stale, data } = await tagCache(id);
    if (stale) return;

    target.innerHTML = '';
    for (const tag of data) {
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

registerStyles(`
  /* rating container */
  ${ON_MOBILE} {
    .flex.justify-center.flex-col.items-center.mt-4, .flex.justify-center.flex-col.items-center.mb-4 {
      display: none;
    }

    .imageTags {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-wrap: wrap;
      padding-top: 2rem;
      background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.8) 100%);
      z-index: 50;
      align-items: center;
      justify-content: center;
      width: 100vw;
      border: none;
      pointer-events: auto;
      opacity: 1;
      transition: opacity 0.08s ease-in-out;
    }

    .imageTags.hidden {
      opacity: 0;
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
