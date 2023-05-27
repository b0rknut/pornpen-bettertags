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
};

export let styles = `
body, #root {
    max-width: 100vw;
}

img {
    border-radius: 0.5rem;
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

*::-webkit-scrollbar {
    background-color: #0000;
}

*::-webkit-scrollbar-thumb {
    background-color: #FFF2;
    border: 2px solid #0000;
}

/* some dumb container that has min-h-screen on it */
.flex.flex-col-reverse.min-h-screen {
    min-height: 0;
}

/* where all the ui items are in */
.flex.flex-col.items-start.text-white {
    display: block;
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

/* where the main images are located */
${ON_MOBILE} {
    *[class="w-full md:w-fit md:flex-none md:min-w-[512px]"] {
        margin-top: 7rem; /* 3rem top bar, 4 rem generatedImages */
    }

    /* some weird container inside */
    .flex.flex-col.overflow-auto.mb-8.justify-center {
        margin-bottom: 0;
    }
}

/* clear tags and copy tags */
.flex.flex-col-reverse.min-h-screen > .grow.px-4 > div:nth-child(2) {
    display: inline-block;
    margin-left: 0.5rem;
}

*[id^="panel"]:not(:empty) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    border: 1px solid #FFF2;
    border-top: none;
    background: #0004;
    padding: 1rem;
    box-sizing: content-box;
    height: 444px;
}

/* main content container */
*[class="w-full md:w-10/12"] {
    max-width: 100rem;
}

@media only screen and (min-width: 768px) {
    /* the div inside the main content container */
    *[class="w-full md:w-10/12"] > .flex.flex-col-reverse.min-h-screen {
        display: grid;
        grid: auto-flow / minmax(0, 1fr) max-content;
    }
}

/* where the search bar and tag list are */
.flex.flex-col.items-start.text-white {
    display: block;
}

/* tag group */
*[id^="panel"] > .mb-4 {
    display: inline-block;
    border-radius: 0.5rem;
    vertical-align: top;
    min-width: max-content;
    margin: 0;
}

/* tag group header */
.mb-4 > .ml-4.font-bold.text-white {
    margin: 1px;
    padding: 0.3rem 0.5rem;
    background: #FFFFFF33;
    position: sticky;
    left: 0;
}

/* tag group content */
.mb-4 > .ml-4.font-bold.text-white+.flex.col.flex-wrap {
    display: grid;
    grid: repeat(12, auto) / auto-flow;
}

${ON_MOBILE} {
    .mb-4 > .ml-4.font-bold.text-white+.flex.col.flex-wrap {
        grid: repeat(6, auto) / auto-flow;
    }

    *[id^="panel"]:not(:empty) {
        height: 240px;
    }
}

/* individual tag */
.mb-4 > .ml-4.font-bold.text-white+.flex.col.flex-wrap > div {

    flex: 1;

    border: none;
    background: #FFFFFF11;
    border-radius: 0;
    margin: 1px;
    padding: 0.3rem 0.5rem;

    color: #FFFFFF88;
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 8rem;

    height: 2rem;

}

/* individual tag: selected */
.mb-4 > .ml-4.font-bold.text-white+.flex.col.flex-wrap > div.bg-green-700 {
    background: rgb(144 97 249);
    color: white;
}

/* individual tag: non-builtin */
.mb-4 > .ml-4.font-bold.text-white+.flex.col.flex-wrap > div.border-purple-500 {
    background: #FF888822;
}


/* individual tag: non-builtin: selected */
.mb-4 > .ml-4.font-bold.text-white+.flex.col.flex-wrap > div.bg-purple-500 {
    background: rgb(144 97 249);
    color: white;
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



/* selectedTags */
#selectedTagsContainer {
    border: 1px solid #FFF2;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow: hidden;
}

#selectedTags {
    padding: 1rem;
    background-color: #0004;
}

.selectedTag {
    font-size: 0.7rem;
    color: #FFF8;
    display: inline-block;
    padding: 0.2rem 0.6rem;
    margin: 1px;
    background-color: rgb(44, 50, 59);
    border-radius: 0.5rem;
    cursor: pointer;
}


/* generic ui */
.genericUiElement {
    border: 1px solid #FFF2;
    border-radius: 0.5rem;
    overflow: hidden;
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
    border-top: 1px solid #FFF2;
    background: #0002;
    width: min-content;
    min-width: 100%;
}

`;

export const registerStyles = (style: string) => {
  styles += style + '\n\n';
};
