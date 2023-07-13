import { USER_DEFINED_TAGS_SELECTOR } from '../styles';
import { AppState } from './appState';

export type TagInfo = {
  id: string;
  name: string;
  category: string;
  description: string;
  numSaves: number;
  imageUrl: string;
  ownerUsername: string;
  featured: boolean;
};

const toggleTagImpl = (state: AppState, tagNode: HTMLElement) => {
  const previousDisplayMode = tagNode.style.display;
  tagNode.style.display = 'block';
  tagNode.dispatchEvent(
    new MouseEvent('click', {
      view: unsafeWindow,
      bubbles: true,
      cancelable: true,
    }),
  );
  tagNode.style.display = previousDisplayMode;
};

export const tagNodeIsSelected = (tagNode: HTMLElement) => {
  return (
    tagNode.classList.contains('bg-green-700') ||
    tagNode.classList.contains('bg-purple-500')
  );
};

export const toggleTag = (state: AppState, name: string) => {
  const found = state.allTagNodes.find((node) => node.innerText === name);

  if (!found) return;
  toggleTagImpl(state, found);
};

export const selectTag = (state: AppState, name: string) => {
  const found = state.allTagNodes.find((node) => node.innerText === name);

  if (!found || tagNodeIsSelected(found)) return;
  toggleTagImpl(state, found);
};

export const deselectTag = (state: AppState, name: string) => {
  const found = state.allTagNodes.find((node) => node.innerText === name);

  if (!found || !tagNodeIsSelected(found)) return;
  toggleTagImpl(state, found);
};

export const toggleFirstTagThatIsNotHidden = (state: AppState) => {
  const found = state.allTagNodes.find((node) => node.style.display !== 'none');

  if (!found) return;
  toggleTagImpl(state, found);
};

export const getAllSelectedTags = (state: AppState) => {
  return state.allTagNodes.filter(tagNodeIsSelected);
};

export const getAmountOfUserDefinedTags = () => {
  return document.querySelectorAll(USER_DEFINED_TAGS_SELECTOR).length;
};

/*
export const parseTagsString = (tagsString: string) => {
  // new URLSearchParams(LZString.decompressFromEncodedURIComponent(new URLSearchParams(new URL(window.location.href).search).get("tags")))
  const decoded = LZString.decompressFromEncodedURIComponent(tagsString);
};
*/
