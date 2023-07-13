import { TagInfo } from './tag';

export type AppState = {
  amountOfUserDefinedTags: number;
  allTagNodes: HTMLElement[];
  selectedTagNodes: HTMLElement[];
  allFolders: [];
  authorizationHeader: string;
  lastGeneratedSelectedTags: string[];
  isMobile: boolean;
  letterFilter: RegExp;
};

export const initialAppState = (): AppState => ({
  amountOfUserDefinedTags: 0,
  allTagNodes: [],
  selectedTagNodes: [],
  allFolders: [],
  authorizationHeader: '',
  lastGeneratedSelectedTags: [],
  isMobile: false,
  letterFilter: /^/,
});

export const getAppState = (): AppState => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyWindow = unsafeWindow as any;
  if (!anyWindow.betterTagsAppState) {
    anyWindow.betterTagsAppState = initialAppState();
  }
  return anyWindow.betterTagsAppState;
};
