import { $$$ } from '../util/dom/querySelector';
import { TagInfo } from './tag';

export type FetchAllTagsResponse = {
  result: TagInfo[];
};

export const mapFetchedTags = (response: FetchAllTagsResponse) => {
  const map = new Map<string, TagInfo>();
  for (const entry of response.result) {
    map.set(entry.name.toLowerCase(), entry);
  }
  return map;
};

export const fetchAllTags = async () => {
  const response = await fetch(
    'https://us-central1-dreampen-2273f.cloudfunctions.net/getLiveTagsCached',
    {
      credentials: 'omit',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0',
        Accept: '*/*',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
      },
      referrer: 'https://pornpen.ai/',
      body: '{"data":null}',
      method: 'POST',
      mode: 'cors',
    },
  );

  return mapFetchedTags(await response.json());
};

export const fetchAllFolders = async () => {
  const response = await unsafeWindow.fetch(
    'https://us-central1-dreampen-2273f.cloudfunctions.net/getFolders',
    {
      credentials: 'include',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0',
        Accept: '*/*',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
      },
      referrer: 'https://pornpen.ai/',
      body: '{"data":null}',
      method: 'POST',
      mode: 'cors',
    },
  );
  return await response.json();
};

export const fetchAllTagsForImage = async (id: string) => {
  const tags = await $$$(
    `https://pornpen.ai/view/${id}`,
    '.flex.col.flex-wrap.max-w-lg.m-auto button',
  );
  return Array.from(tags).map((tag) => tag.textContent ?? '');
};
