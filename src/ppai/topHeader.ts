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
    height: 3rem;
    align-items: center;
}

${TOP_HEADER_SELECTOR} .font-bold.flex.justify-between.w-full {
  width: auto;
  flex-grow: 1;
}

#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #EEE;
  color: #333;
  box-shadow: 0 0 1rem black;
  z-index: 1000;
  width: 10rem;
  display: flex;
  align-items: center;
  transition: left 0.15s;
}

#sidebar.sidebarHidden {
  left: -10rem;
  box-shadow: none;
}

#sidebar ul {
  display: block;
}

#sidebar ul li {
  padding: 0.5rem;
  padding-left: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  display: block;
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
  ${TOP_HEADER_SELECTOR} .flex.underline {
    display: none;
  }
}

`);

const SIDEBAR_MARKUP = `
  <div id="sidebar" class="sidebarHidden">
    <ul>
      <li><a href="/make">Make</a></li>
      <li><a href="/feed">Feed</a></li>
      <li><a href="/search">Search</a></li>
      <li><a href="/tags">Tags</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/profile">Profile</a></li>
    </ul>
  </div>
`;

const HAMBURGER_MARKUP = `
  <div id="hamburger" class="flex-col justify-center items-center p-2">
    <div class="w-6 h-1 bg-white mt-0.5 mb-1"></div>
    <div class="w-6 h-1 bg-white mb-1"></div>
    <div class="w-6 h-1 bg-white mb-0.5"></div>
  </div>
`;

export const topHeader: Injectable<never> = (() => ({
  name: 'topHeader',
  isInjected: () => !$(`${TOP_HEADER_SELECTOR} > ${MENU_SELECTOR}`),
  shouldBeInjected: () => true,
  inject: () => {
    const menu = $(`${TOP_HEADER_SELECTOR} > ${MENU_SELECTOR}`);
    const menuParent = menu?.parentNode;
    if (!menu || !menuParent || !menuParent.firstChild?.firstChild) return;
    menuParent.firstChild.insertBefore(
      menu,
      menuParent.firstChild.firstChild.nextSibling,
    );

    const hamburger = $('#hamburger');
    if (!hamburger) {
      (menuParent as HTMLElement).insertAdjacentHTML(
        'afterbegin',
        HAMBURGER_MARKUP,
      );
      $('#hamburger').addEventListener('click', (e) => {
        e.stopPropagation();
        $('#sidebar').classList.toggle('sidebarHidden');
      });
    }

    const pp = $(TOP_HEADER_SELECTOR).querySelector('a');
    if (pp) pp.innerText = pp.innerText.replace('pornpen', 'pp');

    let sidebar = $('#sidebar');
    if (!sidebar) {
      document.body.insertAdjacentHTML('afterend', SIDEBAR_MARKUP);
      sidebar = $('#sidebar');
      sidebar.addEventListener(
        'click',
        (e) => {
          e.stopPropagation();
        },
        true,
      );
      document.body.addEventListener('click', (e) => {
        sidebar.classList.add('sidebarHidden');
      });
    }
  },
  uninject: () => {},
  updateData: () => {},
}))();
