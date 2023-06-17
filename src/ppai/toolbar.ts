import { COLORS, ON_MOBILE, registerStyles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { queryAndDeleteAll } from '../util/dom/markup';
import { $, $$ } from '../util/dom/querySelector';

const GRADIENT_BUTTON_SELECTOR = '.sticky .GradientButton';
const PRIVATE_MODE_SWITCH_SELECTOR =
  '.p-4.rounded-lg.pointer-events-auto.backdrop-blur .mt-2.text-center';
const STICKY_CONTAINER_SELECTOR =
  '.sticky.bottom-0.p-4.z-50.flex.justify-center.items-center.flex-col.pointer-events-none';
const TOOLBAR_DESTINATION_SELECTOR =
  '.flex.flex-col-reverse.min-h-screen>.grow.px-4';
const GENERATOR_AND_RATIO_SELECTOR =
  '.flex.flex-col-reverse.min-h-screen>.grow.px-4>.flex.flex-row';
const CLEAR_TAGS_AND_COPY_TAGS_SELECTOR =
  '.flex.flex-col-reverse.min-h-screen>.grow.px-4>div.mb-4';
const POSE_BUTTON_SELECTOR =
  '.flex.flex-col-reverse.min-h-screen>.grow.px-4>.bg-orange-500';

registerStyles(`
/* toolbar */
.toolbar {
    display: flex;
    border-bottom: 1px solid #FFF2;
    background: ${COLORS.ui};
    flex-wrap: wrap;
}

.toolbar button, .toolbar select, .toolbar > .mt-2.text-center {
    padding: 0.75rem 1.25rem;
    height: 1rem !important;
    font-size: 0.75rem;
    box-sizing: content-box;
    width: max-content;
    border-radius: 0;
    margin: 0 !important;
    color: #FFF8;
    border: none;
    border-right: 1px solid #FFF2;
    line-height: initial;
}

.toolbar > .mt-2.text-center .text-white {
    color: #FFF8;
}

.toolbar select, .toolbar button:not(.GradientButton), .toolbar > .mt-2.text-center {
    background: ${COLORS.ui};
}

.toolbar option {
    background-color: #222;
    color: #FFF8;
}

.toolbar > * {
    height: 3rem !important;
    margin: 0.25rem !important;
    margin-top: 0 !important;
}

${ON_MOBILE} {
  .toolbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    z-index: 100;
    border-top: 1px solid #FFF2;
  }

  .toolbar .GradientButton {
    flex-grow: 1;
  }

  /* Edit screen toolbar */
  *[class="bg-gray-700/80 sticky bottom-0 p-4 z-50"] {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: ${COLORS.ui};
  }
} 
`);

export const toolbar: Injectable<never> = (() => ({
  name: 'toolbar',
  isInjected: () => !$(GRADIENT_BUTTON_SELECTOR),
  shouldBeInjected: () => true,
  inject: () => {
    const destination = $(TOOLBAR_DESTINATION_SELECTOR);
    const generatorAndRatio = $(GENERATOR_AND_RATIO_SELECTOR);
    const clearTagsAndCopyTags = $(CLEAR_TAGS_AND_COPY_TAGS_SELECTOR);
    const gradientButton = $(GRADIENT_BUTTON_SELECTOR);
    const privateMode = $(PRIVATE_MODE_SWITCH_SELECTOR);
    const poseButton = $(POSE_BUTTON_SELECTOR);

    if (
      !destination ||
      !generatorAndRatio ||
      !clearTagsAndCopyTags ||
      !gradientButton ||
      !privateMode ||
      !poseButton
    )
      return;

    console.log('clearcopy', clearTagsAndCopyTags);

    const container = document.createElement('div');
    container.classList.add('toolbar');

    container.appendChild(gradientButton);
    [
      ...$$('select', generatorAndRatio),
      ...clearTagsAndCopyTags.children,
      poseButton,
    ].forEach((child) => {
      container.appendChild(child);
    });
    container.appendChild(privateMode);

    queryAndDeleteAll(STICKY_CONTAINER_SELECTOR);
    queryAndDeleteAll(CLEAR_TAGS_AND_COPY_TAGS_SELECTOR);
    queryAndDeleteAll(GENERATOR_AND_RATIO_SELECTOR);

    console.log('container', container);

    // ratio
    container.children[2]?.classList.add('desktop-only');
    // clear tags
    container.children[3]?.classList.add('desktop-only');
    // copy tags
    container.children[4]?.classList.add('desktop-only');

    if (container.children[6])
      (container.children[6].querySelector('span') as HTMLElement).innerText =
        'Private';

    // move generate button to the right for easier thumb access
    container.appendChild(container.querySelector('.GradientButton')!);

    destination.insertBefore(container, destination.firstChild);
  },
  injectionDelay: 200,
  uninject: () => {},
  updateData: () => {},
}))();
