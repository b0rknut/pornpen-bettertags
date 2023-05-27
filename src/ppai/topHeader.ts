import { COLORS, ON_MOBILE, registerStyles } from '../styles';
import { Injectable } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';

const TOP_HEADER_SELECTOR =
  '.flex.text-white.text-lg.p-2.select-none.flex-wrap.overflow-x-scroll.max-w-full';
const MENU_SELECTOR = '.flex.underline';

registerStyles(`
/* pornpen.ai header */
${TOP_HEADER_SELECTOR} {
    width: 100vw;
    background: #000;
    margin-bottom: 1rem;
    height: 2rem;
}

${ON_MOBILE} {
  ${TOP_HEADER_SELECTOR} {
    margin-bottom: 6rem;
    position: fixed;
    top: 0;
    font-size: 0.75rem;
    z-index: 100;
    background: ${COLORS.ui};
  } 
}

`);

export const topHeader: Injectable<never> = (() => ({
  name: 'topHeader',
  isInjected: () => !$(`${TOP_HEADER_SELECTOR} > ${MENU_SELECTOR}`),
  shouldBeInjected: () => true,
  inject: () => {
    const menu = $(`${TOP_HEADER_SELECTOR} > ${MENU_SELECTOR}`);
    if (!menu || !menu.parentNode?.firstChild?.firstChild) return;
    menu.parentNode?.firstChild.insertBefore(
      menu,
      menu.parentNode.firstChild.firstChild.nextSibling,
    );
    const pp = menu.querySelector('a');
    if (pp) pp.innerText = pp.innerText.replace('pornpen', 'pp');
  },
  uninject: () => {},
  updateData: () => {},
}))();
