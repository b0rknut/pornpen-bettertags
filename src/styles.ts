export const PANEL_SELECTOR = '*[id^="panel"]';
export const TABLIST_SELECTOR = '.react-tabs__tab-list';
export const HEADERS_SELECTOR = '.mb-4 > .ml-4.font-bold.text-white';
export const USER_DEFINED_TAGS_SELECTOR = 'div.border-purple-500';
export const RESULT_IMAGE_CONTAINER_SELECTOR =
  '.flex.flex-col.overflow-auto.mb-8.justify-center';
export const RESULT_IMAGE_SELECTOR = 'img.m-auto.max-w-sm.sm:max-w-lg';

export const ON_MOBILE = '@media screen and (max-width: 768px)';

export const COLORS = {
  ui: 'rgb(12, 18, 29)',
  uiLight: 'rgb(67, 73, 85)',

  ocre50: '#15130c',
  ocre100: '#292617',
  ocre200: '#534d2e',
  ocre300: '#7c7346',
  ocre400: '#a69a5d',
  ocre500: '#cfc074',
  ocre600: '#d9cd90',
  ocre700: '#e2d9ac',
  ocre800: '#ece6c7',
  ocre900: '#f5f2e3',

  gray100: '#101010',
  gray200: '#303030',
  gray300: '#616161',
  gray400: '#818181',
  gray500: '#a1a1a1',
  gray600: '#b4b4b4',
  gray700: '#c7c7c7',
  gray800: '#d9d9d9',
  gray900: '#ececec',

  salmon100: '#291a17',
  salmon200: '#53342e',
  salmon300: '#7c4e44',
  salmon400: '#a6685b',
  salmon500: '#cf8272',
  salmon600: '#d99b8e',
  salmon700: '#e2b4aa',
  salmon800: '#eccdc7',
  salmon900: '#f5e6e3',
};

export let styles = `
body, #root {
    max-width: 100vw;
}

img {
    border-radius: 0.5rem;
}

/* so all the ui controls are in one line */
.flex.flex-col-reverse.min-h-screen > .grow.px-4 {
    display: flex;
    flex-wrap: wrap;
    max-width: calc(100% - 512px);
}

.flex.flex-col-reverse.min-h-screen {
    align-items: flex-start;
}

.flex.flex-col-reverse.min-h-screen > .grow.px-4 > * {
    height: min-content;
}


/* where search bar and tags are located */
.grow.px-4 > .flex.flex-col.items-start.text-white {
    width: 100%;
    margin-top: 0.5rem;
}


.flex.flex-col-reverse.min-h-screen > .grow.px-4 button, .flex.flex-col-reverse.min-h-screen > .grow.px-4 select {
    height: 3rem;
}
${ON_MOBILE} {
    img {
        border-radius: 0;
    }
}

.mobile-only {
    display: none;
}

.desktop-only {
    display: block;
}

${ON_MOBILE} {
    .mobile-only {
        display: block;
    }

    .desktop-only {
        display: none;
    }
}

${ON_MOBILE} {
    .flex.flex-col-reverse.min-h-screen > .grow.px-4 {
        padding: 0;
    }
}

/* Edit screen on mobile */
${ON_MOBILE} {
    .max-w-2xl.p-2.m-auto {
        max-width: 100vw;
    }
    .max-w-2xl.p-2.m-auto > .my-8.text-center {
        display: none;
    }
}

/* container for everything */
div[class="w-full md:w-10/12"] {
    position: relative;
}

/* where the resulting images are */
div[class="w-full md:w-fit md:flex-none md:min-w-[512px]"] {
    position: absolute;
    right: 0;
    height: 100%;
}

/* where the main images are located */
${ON_MOBILE} {
    div[class="w-full md:w-fit md:flex-none md:min-w-[512px]"] {
        margin-top: 7rem; /* 3rem top bar, 4 rem generatedImages */
        position: static;
        height: auto;
        right: auto;
    }

    /* some weird container inside */
    .flex.flex-col.overflow-auto.mb-8.justify-center {
        margin-bottom: 0;
    }
}

*[id^="panel"]:not(:empty) {
    display: flex;
    flex-wrap: wrap;
}

/* tag group */
*[id^="panel"]:not(:empty) .mb-4 {
    margin: 1px;
    width: fit-content;
    border: 1px solid #fff8;
    border-radius: 0.5rem;
    padding: 0;
    display: flex;
    flex-direction: column;
}

/* tag group header */
.mb-4 > .ml-4.font-bold.text-white {
    padding: 0.5rem 1rem;
    background: #fff2;
    border-bottom: 1px solid #fff8;
    flex-grow: 1;
    margin-left: 0;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: lighter;
    letter-spacing: 0.1rem;
}

/* tag list */
.mb-4 > .flex.col.flex-wrap {
    padding: 1rem;
    width: fit-content;
    background: #0002;
}

/* tag */
.text-base.px-4.py-2.m-2.border.rounded-lg, .flex.justify-center.items-center.px-4.py-2.rounded-md  {
    border-radius: 0;
    margin: 1px;
    padding: 0.2rem 0.8rem;
    font-size: 0.75rem;
    border: 1px solid #fff4 !important;
    color: #fffA !important;
}

.text-base.px-4.py-2.m-2.border.rounded-lg.border-purple-500 {
    border: 1px solid #faf5 !important;
}

/* result image container */
.flex.flex-col.overflow-auto.mb-8.justify-center > div {
    /*height: 0;
    overflow: hidden;
    opacity: 0;*/
}

/* search view */
.split-view-container > div:first-child {
  padding: 1rem;
}

/* selected tags */
.ml-2.mb-2.flex.flex-wrap.bg-slate-800.pt-2.pl-2.rounded-lg {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #fff8;
    background: #0002;
}

${ON_MOBILE} {
    .genericUiElement {
        border-radius: 0;
    }

    *[class="relative rounded-lg bg-white shadow dark:bg-gray-700"] {
        top: 15rem;
    }
}

.scrollbar-measure {
	width: 100px;
	height: 100px;
	overflow: scroll;
	position: absolute;
	top: -9999px;
}

/* image tags */
.imageTags {
    padding: 1rem;
    border-top: 1px solid ${COLORS.gray200};
    background: ${COLORS.gray100};
    width: min-content;
    min-width: 100%;
}
`;

export const registerStyles = (style: string) => {
  styles += style + '\n\n';
};
