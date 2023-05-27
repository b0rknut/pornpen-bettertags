import { COLORS, ON_MOBILE, PANEL_SELECTOR, registerStyles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { queryAndDeleteAll } from '../util/dom/markup';
import { $, $$ } from '../util/dom/querySelector';
import { getAppState } from './appState';
import { imageTags, setImageTags } from './imageTags';

type GeneratedImageData = {
  id: string;
  url: string;
};

const A_TAG_SELECTOR =
  '.w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/view/"], .w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/private/"]';

const render = () => {
  const container = $('#generatedImages');
  if (!container) return;
  container.innerHTML = '';

  for (const image of generatedImages.values()) {
    const imageNode = document.createElement('img');
    imageNode.classList.add('generatedImage');
    imageNode.src = image.url;

    imageNode.addEventListener('click', () => {
      const linkNode = $(`${A_TAG_SELECTOR}`);
      if (!linkNode) return;
      linkNode.setAttribute('href', `/view/${image.id}`);
      linkNode.querySelector('img')?.setAttribute('src', image.url);
      imageTags.updateData(image.id);
    });

    container.appendChild(imageNode);
  }
};

registerStyles(`
/* imageListener */
#generatedImageContainer {
    border: 1px solid #FFF2;
    border-radius: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: ${COLORS.ui};
    font-size: 0.75rem;
    color: #FFF8;
}

#generatedImages {
    padding: 0.75rem;
    background-color: ${COLORS.ui};
    flex-grow: 1;
    min-height: 104px;
    max-height: 25rem;
    overflow-y: scroll;
    box-sizing: content-box;
}

#generatedImagesMain {
    display: flex;
}

#generatedImagesMain li {
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    border-bottom: 1px solid #FFF2;
}

#generatedImagesLeft {
    flex-shrink: 0;
    border-right: 1px solid #FFF2;
}

.generatedImage {
    cursor: pointer;
    width: 6rem;
    height: 6rem;
    margin: 0.25rem;
    display: inline-block;
}

${ON_MOBILE} {
  #generatedImageContainer {
    margin-bottom: 0rem;
    margin-top: 0rem;
    position: fixed;
    top: 2rem;
    width: 100vw;
    border-radius: 0;
    z-index: 100;
  }

  #generatedImages {
    padding: 0.25rem;
    min-height: 4rem;
    display: flex; 
  }
  
  .generatedImage {
    width: 4rem;
    height: 4rem;
    margin: 0 0.25rem 0 0.25rem;
  }

  .generatedImage:first-child {
    margin-left: 0rem;
  }

  .generatedImage:last-child {
    margin-right: 0rem;
  }
  
}

`);

const GENERATED_IMAGES_MARKUP = `
<div id="generatedImagesHeader"></div>
<div id="generatedImagesMain">
  <div id="generatedImagesLeft" class="desktop-only">
    <ul>
      <li>Active Session</li>
    </ul>
  </div>
  <div id="generatedImages"></div>
</div>
`;

let generatedImages = new Map<string, GeneratedImageData>();
export const imageListener: Injectable<never> = (() => ({
  name: 'imageListener',
  isInjected: () => {
    // this function runs on every dom update, we check if new images
    // have been generated (can be multiple!)
    const images = $$(A_TAG_SELECTOR);
    let updateNecessary = false;
    for (const imageNode of images) {
      imageNode.parentElement?.classList.add('genericUiElement');
      const id = imageNode.getAttribute('href')?.split('/')[2];
      const imageUrl = imageNode.querySelector('img')?.getAttribute('src');
      if (!id || !imageUrl) continue;
      if (!generatedImages.has(id)) {
        generatedImages.set(id, { id, url: imageUrl });
        setImageTags(id, getAppState().lastGeneratedSelectedTags);
        updateNecessary = true;
      }
    }
    if (updateNecessary || $('#generatedImages')?.children.length === 0) {
      render();
    }

    return !!$('#generatedImageContainer');
  },
  shouldBeInjected: () => !!window.location.href.match(/make/),
  inject: () => {
    const container = document.createElement('div');
    container.id = 'generatedImageContainer';
    container.innerHTML = GENERATED_IMAGES_MARKUP;
    $(PANEL_SELECTOR).parentNode?.appendChild(container);
  },
  uninject: () => {
    queryAndDeleteAll('#generatedImageContainer');
    generatedImages = new Map<string, GeneratedImageData>();
  },
  updateData: () => {},
}))();
