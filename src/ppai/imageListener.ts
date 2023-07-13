import { COLORS, ON_MOBILE, PANEL_SELECTOR, registerStyles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { queryAndDeleteAll } from '../util/dom/markup';
import { $, $$ } from '../util/dom/querySelector';
import { getAppState } from './appState';

type GeneratedImageData = {
  id: string;
  url: string;
};

export const A_TAG_SELECTOR =
  '.w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/view/"], .w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/private/"]';

export const SELECTED_TAGS_SELECTOR =
  '.ml-2.mb-2.flex.flex-wrap.bg-slate-800.pt-2.pl-2.rounded-lg';

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
      linkNode.setAttribute('href', `/${image.id}`);
      linkNode.querySelector('img')?.setAttribute('src', image.url);
    });

    container.appendChild(imageNode);
  }
};

registerStyles(`
/* the thing that is shown while an image is generating */
.mb-8.flex.justify-center.items-center.flex-col.max-w-lg .text-white.text-center.mt-4.w-full {
  margin-top: 0;
}

/* imageListener */
#generatedImages {
    border: 1px solid #fff8;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
    background-color: #0002;
    font-size: 0.75rem;
    color: #FFF8;
    width: 100%;
    padding: 0.75rem;
    flex-grow: 1;
    min-height: 104px;
    max-height: 25rem;
    overflow-y: scroll;
    box-sizing: content-box;
}

#generatedImages:empty {
    display: none;
}

#generatedImagesMain {
    display: flex;
}

#generatedImagesMain li {
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    border-bottom: 1px solid ${COLORS.gray200};
}

.generatedImage {
    cursor: pointer;
    width: 6rem;
    height: 6rem;
    margin: 0.25rem;
    display: inline-block;
}

.imageLink {
  position: relative;
}

${ON_MOBILE} {
  #generatedImages {
    margin-bottom: 0rem;
    margin-top: 0rem;
    position: fixed;
    top: 3rem; /* topHeader height */
    width: 100vw;
    border-radius: 0;
    z-index: 100;
    padding: 0rem;
    min-height: 4rem;
    display: flex; 
  }
  
  .generatedImage {
    width: 4rem;
    height: 4rem;
    margin: 0 1px 0 0;
  }

  .generatedImage:first-child {
    margin-left: 0rem;
  }

  .generatedImage:last-child {
    margin-right: 0rem;
  }

  /* image */ 
  .text-white.text-center.underline.m-auto {
    border: none;
  }

  /* save and edit buttons */
  .flex.flex-col.overflow-auto.mb-8.justify-center .mt-2 {
    border: none;
    margin-top: 0;
    padding: 0.25rem;
    pointer-events: auto;
  }

  .mb-4 {
    margin-bottom: 0;
  }

}

`);

let generatedImages = new Map<string, GeneratedImageData>();
export const imageListener: Injectable<never> = (() => ({
  name: 'imageListener',
  isInjected: () => {
    // this function runs on every dom update, we check if new images
    // have been generated (can be multiple!)
    const images = $$(A_TAG_SELECTOR);
    let updateNecessary = false;
    for (const imageContainer of images) {
      const id = imageContainer
        .getAttribute('href')
        ?.split('/')
        .slice(1)
        .join('/');
      imageContainer.classList.add('imageLink');

      const state = getAppState();
      if (state.isMobile) {
        //imageContainer.style.pointerEvents = 'none';
      }

      imageContainer.addEventListener('click', (e) => {
        if (state.isMobile) {
          $('.imageTags', imageContainer)?.classList.toggle('hidden');
          e.stopImmediatePropagation();
          e.preventDefault();
          return false;
        }
      });

      const imageUrl = imageContainer.querySelector('img')?.getAttribute('src');
      if (!id || !imageUrl) continue;
      if (!generatedImages.has(id)) {
        generatedImages.set(id, { id, url: imageUrl });
        updateNecessary = true;
      }
    }
    if (updateNecessary || $('#generatedImages')?.children.length === 0) {
      render();
    }

    return !!$('#generatedImages');
  },
  shouldBeInjected: () => !!window.location.href.match(/make/),
  inject: () => {
    const container = document.createElement('div');
    container.id = 'generatedImages';

    const selectedTags = $(SELECTED_TAGS_SELECTOR);
    selectedTags.parentNode?.insertBefore(container, selectedTags);
  },
  uninject: () => {
    queryAndDeleteAll('#generatedImages');
    generatedImages = new Map<string, GeneratedImageData>();
  },
  updateData: () => {},
}))();
