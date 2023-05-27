import { TagInfo } from './tag';

export type AppState = {
  amountOfUserDefinedTags: number;
  allTags: Map<string, TagInfo>;
  allTagNodes: HTMLElement[];
  selectedTagNodes: HTMLElement[];
  allFolders: [];
  authorizationHeader: string;
  lastGeneratedSelectedTags: string[];
  scrollbarSize: number;
  isMobile: boolean;
};

export const initialAppState = (): AppState => ({
  amountOfUserDefinedTags: 0,
  allTags: new Map<string, TagInfo>(),
  allTagNodes: [],
  selectedTagNodes: [],
  allFolders: [],
  authorizationHeader: '',
  lastGeneratedSelectedTags: [],
  scrollbarSize: 16,
  isMobile: false,
});

export const getAppState = (): AppState => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyWindow = unsafeWindow as any;
  if (!anyWindow.betterTagsAppState) {
    anyWindow.betterTagsAppState = initialAppState();
  }
  return anyWindow.betterTagsAppState;
};
