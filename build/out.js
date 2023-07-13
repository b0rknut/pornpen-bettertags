// ==UserScript==
// @name         pornpen.ai better tags
// @namespace    pornpen.ai
// @version      2.0.0
// @description  better make screen :)
// @author       b0rknut
// @match        https://pornpen.ai/*
// @match        https://pornpen.art/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pornpen.ai
// @grant        unsafeWindow
// ==/UserScript==

"use strict";
(() => {
  var __pow = Math.pow;

  // src/ppai/appState.ts
  var initialAppState = () => ({
    amountOfUserDefinedTags: 0,
    allTagNodes: [],
    selectedTagNodes: [],
    allFolders: [],
    authorizationHeader: "",
    lastGeneratedSelectedTags: [],
    isMobile: false,
    letterFilter: /^/
  });
  var getAppState = () => {
    const anyWindow = unsafeWindow;
    if (!anyWindow.betterTagsAppState) {
      anyWindow.betterTagsAppState = initialAppState();
    }
    return anyWindow.betterTagsAppState;
  };

  // src/styles.ts
  var TABLIST_SELECTOR = ".react-tabs__tab-list";
  var HEADERS_SELECTOR = ".mb-4 > .ml-4.font-bold.text-white";
  var USER_DEFINED_TAGS_SELECTOR = "div.border-purple-500";
  var ON_MOBILE = "@media screen and (max-width: 768px)";
  var COLORS = {
    ui: "rgb(12, 18, 29)",
    uiLight: "rgb(67, 73, 85)",
    ocre50: "#15130c",
    ocre100: "#292617",
    ocre200: "#534d2e",
    ocre300: "#7c7346",
    ocre400: "#a69a5d",
    ocre500: "#cfc074",
    ocre600: "#d9cd90",
    ocre700: "#e2d9ac",
    ocre800: "#ece6c7",
    ocre900: "#f5f2e3",
    gray100: "#101010",
    gray200: "#303030",
    gray300: "#616161",
    gray400: "#818181",
    gray500: "#a1a1a1",
    gray600: "#b4b4b4",
    gray700: "#c7c7c7",
    gray800: "#d9d9d9",
    gray900: "#ececec",
    salmon100: "#291a17",
    salmon200: "#53342e",
    salmon300: "#7c4e44",
    salmon400: "#a6685b",
    salmon500: "#cf8272",
    salmon600: "#d99b8e",
    salmon700: "#e2b4aa",
    salmon800: "#eccdc7",
    salmon900: "#f5e6e3"
  };
  var styles = `
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
  var registerStyles = (style) => {
    styles += style + "\n\n";
  };

  // src/util/dom/markup.ts
  var addStyle = (styleString, id) => {
    const style = document.createElement("style");
    style.textContent = styleString;
    style.setAttribute("id", id);
    document.head.append(style);
  };
  var queryAndDeleteAll = (selector) => {
    try {
      const nodes = document.querySelectorAll(selector);
      nodes.forEach((node) => {
        var _a;
        return (_a = node.parentNode) == null ? void 0 : _a.removeChild(node);
      });
    } catch (e) {
    }
  };

  // src/util/dom/querySelector.ts
  var $ = (selector, node = document) => {
    return node.querySelector(selector);
  };
  var $$ = (selector, node = document) => {
    return [...node.querySelectorAll(selector)];
  };

  // src/ppai/imageListener.ts
  var A_TAG_SELECTOR = '.w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/view/"], .w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/private/"]';
  var SELECTED_TAGS_SELECTOR = ".ml-2.mb-2.flex.flex-wrap.bg-slate-800.pt-2.pl-2.rounded-lg";
  var render = () => {
    const container = $("#generatedImages");
    if (!container)
      return;
    container.innerHTML = "";
    for (const image of generatedImages.values()) {
      const imageNode = document.createElement("img");
      imageNode.classList.add("generatedImage");
      imageNode.src = image.url;
      imageNode.addEventListener("click", () => {
        var _a;
        const linkNode = $(`${A_TAG_SELECTOR}`);
        if (!linkNode)
          return;
        linkNode.setAttribute("href", `/${image.id}`);
        (_a = linkNode.querySelector("img")) == null ? void 0 : _a.setAttribute("src", image.url);
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
  var generatedImages = /* @__PURE__ */ new Map();
  var imageListener = (() => ({
    name: "imageListener",
    isInjected: () => {
      var _a, _b, _c;
      const images = $$(A_TAG_SELECTOR);
      let updateNecessary = false;
      for (const imageContainer of images) {
        const id = (_a = imageContainer.getAttribute("href")) == null ? void 0 : _a.split("/").slice(1).join("/");
        imageContainer.classList.add("imageLink");
        const state = getAppState();
        if (state.isMobile) {
        }
        imageContainer.addEventListener("click", (e) => {
          var _a2;
          if (state.isMobile) {
            (_a2 = $(".imageTags", imageContainer)) == null ? void 0 : _a2.classList.toggle("hidden");
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
          }
        });
        const imageUrl = (_b = imageContainer.querySelector("img")) == null ? void 0 : _b.getAttribute("src");
        if (!id || !imageUrl)
          continue;
        if (!generatedImages.has(id)) {
          generatedImages.set(id, { id, url: imageUrl });
          updateNecessary = true;
        }
      }
      if (updateNecessary || ((_c = $("#generatedImages")) == null ? void 0 : _c.children.length) === 0) {
        render();
      }
      return !!$("#generatedImages");
    },
    shouldBeInjected: () => !!window.location.href.match(/make/),
    inject: () => {
      var _a;
      const container = document.createElement("div");
      container.id = "generatedImages";
      const selectedTags = $(SELECTED_TAGS_SELECTOR);
      (_a = selectedTags.parentNode) == null ? void 0 : _a.insertBefore(container, selectedTags);
    },
    uninject: () => {
      queryAndDeleteAll("#generatedImages");
      generatedImages = /* @__PURE__ */ new Map();
    },
    updateData: () => {
    }
  }))();

  // src/ppai/tag.ts
  var toggleTagImpl = (state, tagNode) => {
    const previousDisplayMode = tagNode.style.display;
    tagNode.style.display = "block";
    tagNode.dispatchEvent(
      new MouseEvent("click", {
        view: unsafeWindow,
        bubbles: true,
        cancelable: true
      })
    );
    tagNode.style.display = previousDisplayMode;
  };
  var toggleFirstTagThatIsNotHidden = (state) => {
    const found = state.allTagNodes.find((node) => node.style.display !== "none");
    if (!found)
      return;
    toggleTagImpl(state, found);
  };
  var getAmountOfUserDefinedTags = () => {
    return document.querySelectorAll(USER_DEFINED_TAGS_SELECTOR).length;
  };

  // src/ppai/tagCollector.ts
  var collectAllTags = () => {
    const state = getAppState();
    state.allTagNodes = [];
    const headers = $$(HEADERS_SELECTOR);
    for (const headerNode of [...headers]) {
      const children = [
        ...headerNode.nextSibling.children
      ];
      state.allTagNodes = [...state.allTagNodes, ...children];
      if (children.some((child) => child.style.display !== "none")) {
        headerNode.parentNode.style.removeProperty("display");
      } else {
        headerNode.parentNode.style.display = "none";
      }
    }
    state.amountOfUserDefinedTags = getAmountOfUserDefinedTags();
  };
  var tagCollector = (() => ({
    name: "tagCollector",
    isInjected: () => false,
    shouldBeInjected: () => true,
    inject: collectAllTags,
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/searchBar.ts
  var SEARCHBAR_MARKUP = `
    <input class="searchBar" placeholder="Search..." style="color:white; background: #FFF1; border-right: 1px solid ${COLORS.gray200}; flex-grow: 1; margin:0; padding:0.5rem;"/><button style="background-color: #FFF1; padding:0.5rem 0.8rem;">\u274C</button>
`;
  registerStyles(`
  /* searchBar */
  #searchBarContainer {
    border: 1px solid #fff8;
    width: 100%;
    height: 3rem;
    display: flex;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  ${ON_MOBILE} {
    #searchBarContainer {
      display: none;
    }
  }
`);
  var search = (state, value) => {
    state.allTagNodes.forEach((tagNode) => {
      var _a, _b;
      const regex = state.letterFilter;
      if (((_a = tagNode.textContent) == null ? void 0 : _a.includes(value)) && ((_b = tagNode.textContent) == null ? void 0 : _b.match(regex))) {
        tagNode.style.removeProperty("display");
      } else {
        tagNode.style.display = "none";
      }
    });
    collectAllTags();
  };
  var searchBar = (() => ({
    name: "searchBar",
    isInjected: () => !!$("#searchBarContainer") || !$(TABLIST_SELECTOR),
    shouldBeInjected: () => true,
    inject: () => {
      var _a, _b;
      try {
        const tablist = $(TABLIST_SELECTOR);
        if (!tablist)
          return;
        const state = getAppState();
        const searchbarContainer = document.createElement("div");
        searchbarContainer.id = "searchBarContainer";
        searchbarContainer.innerHTML = SEARCHBAR_MARKUP;
        const searchBar2 = $(".searchBar", searchbarContainer);
        const deleteButton = $("button", searchbarContainer);
        (_a = tablist == null ? void 0 : tablist.parentNode) == null ? void 0 : _a.insertBefore(searchbarContainer, tablist);
        (_b = tablist == null ? void 0 : tablist.parentNode) == null ? void 0 : _b.removeChild(tablist);
        searchBar2.addEventListener("input", () => {
          search(state, searchBar2.value);
        });
        searchBar2.addEventListener("keydown", (evt) => {
          if (evt.key === "Enter") {
            toggleFirstTagThatIsNotHidden(state);
          }
        });
        deleteButton.addEventListener("click", () => {
          searchBar2.value = "";
          search(state, "");
        });
      } catch (e) {
      }
    },
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/letterSelector.ts
  registerStyles(`
.letterSelectorContainer {
  width: 2rem;
  height: 28rem;
  display: flex;
  margin: 0 0 0 0;
  
  position: fixed;
  bottom: 4rem;
  right: 0;
  user-select: none;
  z-index: 10000;
}

.labels {
  list-style: none;
  margin: 0;
  padding: 0 0.1rem;
  pointer-events: none;
  color: white;
}

.labels li {
  height: 1rem;
  font-size: 0.8rem;
  transition: all 0.03s linear;
  pointer-events: none;
}

.letterSelector {
  height: 100%;
  flex: 1;
  position: relative;
}

.letterSelector>*{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.rangeContainer {
  display: flex;
}

.rangeContainer input[type=range] {
  width: 100%;
  height: 100%;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
  opacity: 0;
}

.letterContainer {
  justify-content: center;
  height: 0rem;
  width: 0;
  position: relative;
}

.letterContainerInner {
  height: 6rem;
  bottom: 3rem;
  width: 2rem;
  right: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.letter {
  font-size: 4rem;
  position: relative;
  right: 115px;
  top: 10px;
  pointer-events: none;
  color: white;
  z-index: 10000;
}
`);
  var LETTER_SELECTOR_MARKUP = `
<div class='letterSelectorContainer'>
  <div class='letterSelector'>
    <div class='letterContainer'><div class='letterContainerInner'><div class="letter"></div></div></div>
    <ol class='labels'>
      <li>\u{1F6AB}</li>
      <li>#</li>
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>H</li>
      <li>I</li>
      <li>J</li>
      <li>K</li>
      <li>L</li>
      <li>M</li>
      <li>N</li>
      <li>O</li>
      <li>P</li>
      <li>Q</li>
      <li>R</li>
      <li>S</li>
      <li>T</li>
      <li>U</li>
      <li>V</li>
      <li>W</li>
      <li>X</li>
      <li>Y</li>
      <li>Z</li>
    </ol>    
    <div class='rangeContainer'>
      <input type="range" value="1" min="0" max="27" step="1" orient="vertical" />
    </div>
  </div>
</div>
`;
  var sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
  };
  var calcOffset = (x, i, denom = 4) => {
    const quadratic = 1 - __pow((x - i) / denom, 2);
    const smoothQuadratic = sigmoid(2 * (quadratic - 0.2));
    return Math.max(0, smoothQuadratic);
  };
  var letterSelector = (() => ({
    name: "letterSelector",
    isInjected: () => !!$(".letterSelectorContainer"),
    shouldBeInjected: () => true,
    inject: () => {
      try {
        let container = $(".letterSelectorContainer");
        if (!container) {
          document.body.insertAdjacentHTML("afterend", LETTER_SELECTOR_MARKUP);
        }
        container = $(".letterSelectorContainer");
        const letter = $(".letter", container);
        const labels = $(".labels", container).querySelectorAll("li");
        const letters = "-#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const regexes = letters.map((letter2) => new RegExp(`^${letter2}`, "i"));
        regexes[0] = /^/;
        regexes[1] = /^[0-9]/;
        let selectedIndex = 0;
        let isDragging = 0;
        const input = $("input", container);
        input.addEventListener("input", () => {
          selectedIndex = 27 - Number(input.value);
          letter.innerText = letters[selectedIndex];
          letter.style.transform = `translateY(${selectedIndex}rem)`;
          labels.forEach((label, i) => {
            const offset = isDragging * 70 * calcOffset(i, selectedIndex, 4);
            label.style.transform = `translate(-${offset}px)`;
          });
        });
        const pointerDown = () => {
          isDragging = 1;
          labels.forEach((label, i) => {
            label.style.transition = `all 0.03s linear`;
            const offset = isDragging * 70 * calcOffset(i, selectedIndex, 4);
            label.style.transform = `translate(-${offset}px)`;
          });
          letter.style.display = "block";
        };
        const pointerUp = () => {
          var _a, _b;
          isDragging = 0;
          labels.forEach((label, i) => {
            label.style.transition = `all 0.08s ease-out`;
            label.style.transform = `translate(0px)`;
          });
          letter.style.display = "none";
          getAppState().letterFilter = regexes[selectedIndex];
          search(getAppState(), (_b = (_a = $(".searchBar")) == null ? void 0 : _a.value) != null ? _b : "");
        };
        input.addEventListener("touchstart", pointerDown);
        input.addEventListener("mousedown", pointerDown);
        input.addEventListener("touchend", pointerUp);
        input.addEventListener("mouseup", pointerUp);
      } catch (e) {
      }
    },
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/tamperedStylesheet.ts
  var tamperedStylesheet = (() => ({
    name: "tamperedStylesheet",
    isInjected: () => !!$("#tamperedStylesheet"),
    // when clicking "clear tags" the url will be rewritten to just pp.ai/. This is a bug in the app.
    shouldBeInjected: () => true,
    inject: () => {
      addStyle(styles, "tamperedStylesheet");
    },
    uninject: () => {
      queryAndDeleteAll("#tamperedStylesheet");
    },
    updateData: () => {
    }
  }))();

  // src/util/log.ts
  var log = (...stuff) => console.log("[BETTER TAGS]", ...stuff);

  // src/util/dom/injectable.ts
  var injectables = [];
  var registerInjectable = (injectable) => {
    injectables.push(injectable);
  };
  var runInjectables = () => {
    for (const injectable of injectables) {
      const isInjected = injectable.isInjected();
      const shouldBeInjected = injectable.shouldBeInjected();
      if (isInjected && !shouldBeInjected) {
        log(`Uninjecting ${injectable.name}`);
        injectable.uninject();
      } else if (!isInjected && shouldBeInjected) {
        log(`Injecting ${injectable.name}`);
        if (injectable.injectionDelay) {
          setTimeout(injectable.inject, injectable.injectionDelay);
        } else {
          injectable.inject();
        }
      }
    }
  };
  var lastKnownUrl = "";
  var injectableObserver = new MutationObserver(() => {
    if (window.location.href !== lastKnownUrl) {
      setTimeout(runInjectables, 1e3);
      lastKnownUrl = window.location.href;
    }
    runInjectables();
  });
  var startInjectableObserver = () => {
    const config = { subtree: true, childList: true };
    injectableObserver.observe(document, config);
  };

  // src/index.ts
  (function() {
    "use strict";
    const state = getAppState();
    const onWindowResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile !== state.isMobile) {
        state.isMobile = isMobile;
        log(
          isMobile ? "Mobile breakpoint detected" : "Desktop breakpoint detected"
        );
      }
    };
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    log("G'day mates!");
    [
      searchBar,
      tamperedStylesheet,
      imageListener,
      letterSelector,
      tagCollector
    ].forEach(registerInjectable);
    startInjectableObserver();
  })();
})();
