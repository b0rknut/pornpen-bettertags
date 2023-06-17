// ==UserScript==
// @name         pornpen.ai better tags
// @namespace    pornpen.ai
// @version      1.6.1
// @description  better make screen :)
// @author       b0rknut
// @match        https://pornpen.ai/*
// @match        https://pornpen.art/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pornpen.ai
// @grant        unsafeWindow
// ==/UserScript==

"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/util/lzstring.js
  var require_lzstring = __commonJS({
    "src/util/lzstring.js"(exports, module) {
      "use strict";
      var LZString3 = function() {
        var r = String.fromCharCode, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", e = {};
        function t(r2, o2) {
          if (!e[r2]) {
            e[r2] = {};
            for (var n2 = 0; n2 < r2.length; n2++)
              e[r2][r2.charAt(n2)] = n2;
          }
          return e[r2][o2];
        }
        var i = { compressToBase64: function(r2) {
          if (null == r2)
            return "";
          var n2 = i._compress(r2, 6, function(r3) {
            return o.charAt(r3);
          });
          switch (n2.length % 4) {
            default:
            case 0:
              return n2;
            case 1:
              return n2 + "===";
            case 2:
              return n2 + "==";
            case 3:
              return n2 + "=";
          }
        }, decompressFromBase64: function(r2) {
          return null == r2 ? "" : "" == r2 ? null : i._decompress(r2.length, 32, function(n2) {
            return t(o, r2.charAt(n2));
          });
        }, compressToUTF16: function(o2) {
          return null == o2 ? "" : i._compress(o2, 15, function(o3) {
            return r(o3 + 32);
          }) + " ";
        }, decompressFromUTF16: function(r2) {
          return null == r2 ? "" : "" == r2 ? null : i._decompress(r2.length, 16384, function(o2) {
            return r2.charCodeAt(o2) - 32;
          });
        }, compressToUint8Array: function(r2) {
          for (var o2 = i.compress(r2), n2 = new Uint8Array(2 * o2.length), e2 = 0, t2 = o2.length; e2 < t2; e2++) {
            var s = o2.charCodeAt(e2);
            n2[2 * e2] = s >>> 8, n2[2 * e2 + 1] = s % 256;
          }
          return n2;
        }, decompressFromUint8Array: function(o2) {
          if (null == o2)
            return i.decompress(o2);
          for (var n2 = new Array(o2.length / 2), e2 = 0, t2 = n2.length; e2 < t2; e2++)
            n2[e2] = 256 * o2[2 * e2] + o2[2 * e2 + 1];
          var s = [];
          return n2.forEach(function(o3) {
            s.push(r(o3));
          }), i.decompress(s.join(""));
        }, compressToEncodedURIComponent: function(r2) {
          return null == r2 ? "" : i._compress(r2, 6, function(r3) {
            return n.charAt(r3);
          });
        }, decompressFromEncodedURIComponent: function(r2) {
          return null == r2 ? "" : "" == r2 ? null : (r2 = r2.replace(/ /g, "+"), i._decompress(r2.length, 32, function(o2) {
            return t(n, r2.charAt(o2));
          }));
        }, compress: function(o2) {
          return i._compress(o2, 16, function(o3) {
            return r(o3);
          });
        }, _compress: function(r2, o2, n2) {
          if (null == r2)
            return "";
          var e2, t2, i2, s = {}, u = {}, a = "", p = "", c = "", l = 2, f = 3, h = 2, d = [], m = 0, v = 0;
          for (i2 = 0; i2 < r2.length; i2 += 1)
            if (a = r2.charAt(i2), Object.prototype.hasOwnProperty.call(s, a) || (s[a] = f++, u[a] = true), p = c + a, Object.prototype.hasOwnProperty.call(s, p))
              c = p;
            else {
              if (Object.prototype.hasOwnProperty.call(u, c)) {
                if (c.charCodeAt(0) < 256) {
                  for (e2 = 0; e2 < h; e2++)
                    m <<= 1, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++;
                  for (t2 = c.charCodeAt(0), e2 = 0; e2 < 8; e2++)
                    m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
                } else {
                  for (t2 = 1, e2 = 0; e2 < h; e2++)
                    m = m << 1 | t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 = 0;
                  for (t2 = c.charCodeAt(0), e2 = 0; e2 < 16; e2++)
                    m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
                }
                0 == --l && (l = Math.pow(2, h), h++), delete u[c];
              } else
                for (t2 = s[c], e2 = 0; e2 < h; e2++)
                  m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
              0 == --l && (l = Math.pow(2, h), h++), s[p] = f++, c = String(a);
            }
          if ("" !== c) {
            if (Object.prototype.hasOwnProperty.call(u, c)) {
              if (c.charCodeAt(0) < 256) {
                for (e2 = 0; e2 < h; e2++)
                  m <<= 1, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++;
                for (t2 = c.charCodeAt(0), e2 = 0; e2 < 8; e2++)
                  m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
              } else {
                for (t2 = 1, e2 = 0; e2 < h; e2++)
                  m = m << 1 | t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 = 0;
                for (t2 = c.charCodeAt(0), e2 = 0; e2 < 16; e2++)
                  m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
              }
              0 == --l && (l = Math.pow(2, h), h++), delete u[c];
            } else
              for (t2 = s[c], e2 = 0; e2 < h; e2++)
                m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
            0 == --l && (l = Math.pow(2, h), h++);
          }
          for (t2 = 2, e2 = 0; e2 < h; e2++)
            m = m << 1 | 1 & t2, v == o2 - 1 ? (v = 0, d.push(n2(m)), m = 0) : v++, t2 >>= 1;
          for (; ; ) {
            if (m <<= 1, v == o2 - 1) {
              d.push(n2(m));
              break;
            }
            v++;
          }
          return d.join("");
        }, decompress: function(r2) {
          return null == r2 ? "" : "" == r2 ? null : i._decompress(r2.length, 32768, function(o2) {
            return r2.charCodeAt(o2);
          });
        }, _decompress: function(o2, n2, e2) {
          var t2, i2, s, u, a, p, c, l = [], f = 4, h = 4, d = 3, m = "", v = [], g = { val: e2(0), position: n2, index: 1 };
          for (t2 = 0; t2 < 3; t2 += 1)
            l[t2] = t2;
          for (s = 0, a = Math.pow(2, 2), p = 1; p != a; )
            u = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n2, g.val = e2(g.index++)), s |= (u > 0 ? 1 : 0) * p, p <<= 1;
          switch (s) {
            case 0:
              for (s = 0, a = Math.pow(2, 8), p = 1; p != a; )
                u = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n2, g.val = e2(g.index++)), s |= (u > 0 ? 1 : 0) * p, p <<= 1;
              c = r(s);
              break;
            case 1:
              for (s = 0, a = Math.pow(2, 16), p = 1; p != a; )
                u = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n2, g.val = e2(g.index++)), s |= (u > 0 ? 1 : 0) * p, p <<= 1;
              c = r(s);
              break;
            case 2:
              return "";
          }
          for (l[3] = c, i2 = c, v.push(c); ; ) {
            if (g.index > o2)
              return "";
            for (s = 0, a = Math.pow(2, d), p = 1; p != a; )
              u = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n2, g.val = e2(g.index++)), s |= (u > 0 ? 1 : 0) * p, p <<= 1;
            switch (c = s) {
              case 0:
                for (s = 0, a = Math.pow(2, 8), p = 1; p != a; )
                  u = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n2, g.val = e2(g.index++)), s |= (u > 0 ? 1 : 0) * p, p <<= 1;
                l[h++] = r(s), c = h - 1, f--;
                break;
              case 1:
                for (s = 0, a = Math.pow(2, 16), p = 1; p != a; )
                  u = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n2, g.val = e2(g.index++)), s |= (u > 0 ? 1 : 0) * p, p <<= 1;
                l[h++] = r(s), c = h - 1, f--;
                break;
              case 2:
                return v.join("");
            }
            if (0 == f && (f = Math.pow(2, d), d++), l[c])
              m = l[c];
            else {
              if (c !== h)
                return null;
              m = i2 + i2.charAt(0);
            }
            v.push(m), l[h++] = i2 + m.charAt(0), i2 = m, 0 == --f && (f = Math.pow(2, d), d++);
          }
        } };
        return i;
      }();
      "function" == typeof define && define.amd ? define(function() {
        return LZString3;
      }) : "undefined" != typeof module && null != module ? module.exports = LZString3 : "undefined" != typeof angular && null != angular && angular.module("LZString", []).factory("LZString", function() {
        return LZString3;
      });
    }
  });

  // src/util/wait.ts
  var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // src/util/dom/querySelector.ts
  var $ = (selector, node = document) => {
    return node.querySelector(selector);
  };
  var $$ = (selector, node = document) => {
    return [...node.querySelectorAll(selector)];
  };
  var loadIframe = (src) => __async(void 0, null, function* () {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.style.width = "0";
      iframe.style.height = "0";
      document.body.appendChild(iframe);
      iframe.src = src;
      iframe.contentWindow.console.log = () => {
      };
      iframe.onload = () => resolve(iframe);
    });
  });
  var queryableIframe = (src) => __async(void 0, null, function* () {
    const iframe = yield loadIframe(src);
    return {
      iframe,
      $: (selector) => $(selector, iframe.contentWindow.document),
      $$: (selector) => $$(selector, iframe.contentWindow.document),
      destroy: () => {
        iframe.remove();
      }
    };
  });
  var TIMEOUT = 7e3;
  var $$$ = (url, selector, initialDelay = 0) => __async(void 0, null, function* () {
    const remote = yield queryableIframe(url);
    if (initialDelay > 0) {
      yield wait(initialDelay);
    }
    const started = Date.now();
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const tags = remote.$$(selector);
        if (tags.length > 0) {
          clearInterval(interval);
          remote.destroy();
          resolve(tags);
        } else if (Date.now() - started > TIMEOUT) {
          clearInterval(interval);
          remote.destroy();
          reject();
        }
      });
    });
  });

  // src/ppai/api.ts
  var mapFetchedTags = (response) => {
    const map = /* @__PURE__ */ new Map();
    for (const entry of response.result) {
      map.set(entry.name.toLowerCase(), entry);
    }
    return map;
  };
  var fetchAllTags = () => __async(void 0, null, function* () {
    const response = yield fetch(
      "https://us-central1-dreampen-2273f.cloudfunctions.net/getLiveTagsCached",
      {
        credentials: "omit",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
          Accept: "*/*",
          "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
          "Content-Type": "application/json",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site"
        },
        referrer: "https://pornpen.ai/",
        body: '{"data":null}',
        method: "POST",
        mode: "cors"
      }
    );
    return mapFetchedTags(yield response.json());
  });
  var fetchAllTagsForImage = (id) => __async(void 0, null, function* () {
    const tags = yield $$$(
      `https://pornpen.ai/view/${id}`,
      ".flex.col.flex-wrap.max-w-lg.m-auto button"
    );
    return Array.from(tags).map((tag) => {
      var _a;
      return (_a = tag.textContent) != null ? _a : "";
    });
  });

  // src/ppai/appState.ts
  var initialAppState = () => ({
    amountOfUserDefinedTags: 0,
    allTags: /* @__PURE__ */ new Map(),
    allTagNodes: [],
    selectedTagNodes: [],
    allFolders: [],
    authorizationHeader: "",
    lastGeneratedSelectedTags: [],
    scrollbarSize: 16,
    isMobile: false
  });
  var getAppState = () => {
    const anyWindow = unsafeWindow;
    if (!anyWindow.betterTagsAppState) {
      anyWindow.betterTagsAppState = initialAppState();
    }
    return anyWindow.betterTagsAppState;
  };

  // src/styles.ts
  var PANEL_SELECTOR = '*[id^="panel"]';
  var TABLIST_SELECTOR = ".react-tabs__tab-list";
  var HEADERS_SELECTOR = ".mb-4 > .ml-4.font-bold.text-white";
  var USER_DEFINED_TAGS_SELECTOR = "div.border-purple-500";
  var ON_MOBILE = "@media screen and (max-width: 768px)";
  var COLORS = {
    ui: "rgb(12, 18, 29)",
    uiLight: "rgb(67, 73, 85)"
  };
  var styles = `
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

.mb-4 > .ml-4.font-bold.text-white+.ml-4.text-white {
    display: none;
}

/* tag group content */
.mb-4 > .ml-4.font-bold.text-white ~ .flex.col.flex-wrap {
    display: grid;
    grid: repeat(12, auto) / auto-flow;
}

${ON_MOBILE} {
    .mb-4 > .ml-4.font-bold.text-white ~ .flex.col.flex-wrap {
        grid: repeat(6, auto) / auto-flow;
    }

    *[id^="panel"]:not(:empty) {
        height: 240px;
    }
}

/* individual tag */
.mb-4 > .ml-4.font-bold.text-white ~ .flex.col.flex-wrap > div {

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
.mb-4 > .ml-4.font-bold.text-white ~ .flex.col.flex-wrap > div.bg-green-700 {
    background: rgb(144 97 249);
    color: white;
}

/* individual tag: non-builtin */
.mb-4 > .ml-4.font-bold.text-white ~ .flex.col.flex-wrap > div.border-purple-500 {
    background: #FF888822;
}


/* individual tag: non-builtin: selected */
.mb-4 > .ml-4.font-bold.text-white ~ .flex.col.flex-wrap > div.bg-purple-500 {
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
  var addScript = (src, id) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("id", id);
      script.src = src;
      script.addEventListener("load", resolve);
      script.addEventListener("error", (e) => reject(e.error));
      document.head.appendChild(script);
    });
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

  // src/ppai/categorySelector.ts
  registerStyles(`
/* categorySelector */

${ON_MOBILE} {
  #categorySelectorContainer {
    margin-bottom: 3rem;
  }
}

#categorySelector {
    padding:1rem;
    padding-bottom: 1.9rem;
    position: relative;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
    border: 1px solid #FFF2;
    border-top: none;
    background-color: #0004;
    overflow: hidden;
}

#categorySelector > div {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    user-select: none;
}

#categorySelector label {
    padding: 0.25rem;
    color: #FFFFFF88;
    font-size: 0.75rem;
}

#categorySelector input {
    width: 0.8rem;
    height: 0.8rem;
}

.categorySelectorButtonContainer {
    display: flex;
    position: absolute;
    bottom: 0;
    right: -1rem;
    border: 1px solid #FFF2;
    border-top-left-radius: 0.5rem;
    border-bottom: 0;
    border-right: 0;
}

.categorySelectorButton:first-child {
    border-right: 1px solid #FFF2;
}

.categorySelectorButton {
    padding: 0.25rem 0.7rem;
    color: #FFFFFF88;
    font-size: 0.75rem;
}
`);
  var CATEGORY_SELECTOR_MARKUP = `
<div id="categorySelector"></div>
`;
  var lastKnownTagGroups = "";
  var categorySelector = (() => ({
    name: "categorySelector",
    isInjected: () => {
      const tagGroups = $$(HEADERS_SELECTOR).map((header) => header.textContent).join(",");
      if (tagGroups !== lastKnownTagGroups) {
        lastKnownTagGroups = tagGroups;
        return false;
      }
      return !!$("#categorySelectorContainer");
    },
    shouldBeInjected: () => true,
    inject: () => {
      var _a, _b, _c;
      let selector = $("#categorySelector");
      if (!selector) {
        const categorySelectorContainer = document.createElement("div");
        categorySelectorContainer.setAttribute("id", "categorySelectorContainer");
        categorySelectorContainer.innerHTML = CATEGORY_SELECTOR_MARKUP;
        const destination = $(PANEL_SELECTOR);
        if (!destination)
          return;
        if (destination.nextSibling) {
          (_a = destination.parentNode) == null ? void 0 : _a.insertBefore(
            categorySelectorContainer,
            destination.nextSibling
          );
        } else {
          (_b = destination.parentNode) == null ? void 0 : _b.appendChild(categorySelectorContainer);
        }
        selector = $("#categorySelector");
      }
      selector.innerHTML = "";
      for (const header of $$(HEADERS_SELECTOR)) {
        const text = (_c = header.textContent) != null ? _c : "";
        const tagGroup = header.parentElement;
        const container = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", text);
        checkbox.setAttribute("id", `categorySelector-${text}`);
        checkbox.setAttribute("value", text);
        checkbox.setAttribute("checked", "checked");
        const label = document.createElement("label");
        label.setAttribute("for", `categorySelector-${text}`);
        label.textContent = text;
        container.appendChild(checkbox);
        container.appendChild(label);
        checkbox.addEventListener("change", (evt) => {
          if (tagGroup) {
            tagGroup.style.display = checkbox.checked ? "inline-block" : "none";
          }
        });
        selector.appendChild(container);
      }
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("categorySelectorButtonContainer");
      const selectAllButton = document.createElement("button");
      selectAllButton.classList.add("categorySelectorButton");
      selectAllButton.textContent = "Select All";
      selectAllButton.addEventListener("click", () => {
        for (const checkbox of $$(
          '#categorySelector input[type="checkbox"]'
        )) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
      const deselectAllButton = document.createElement("button");
      deselectAllButton.classList.add("categorySelectorButton");
      deselectAllButton.textContent = "Deselect All";
      deselectAllButton.addEventListener("click", () => {
        for (const checkbox of $$(
          '#categorySelector input[type="checkbox"]'
        )) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
      buttonContainer.appendChild(selectAllButton);
      buttonContainer.appendChild(deselectAllButton);
      selector.appendChild(buttonContainer);
    },
    uninject: () => {
      queryAndDeleteAll("#categorySelectorContainer");
    },
    updateData: () => {
    }
  }))();

  // src/ppai/tag.ts
  var import_lzstring = __toESM(require_lzstring());
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
  var tagNodeIsSelected = (tagNode) => {
    return tagNode.classList.contains("bg-green-700") || tagNode.classList.contains("bg-purple-500");
  };
  var toggleTag = (state, name) => {
    const found = state.allTagNodes.find((node) => node.innerText === name);
    if (!found)
      return;
    toggleTagImpl(state, found);
  };
  var toggleFirstTagThatIsNotHidden = (state) => {
    const found = state.allTagNodes.find((node) => node.style.display !== "none");
    if (!found)
      return;
    toggleTagImpl(state, found);
  };
  var getAllSelectedTags = (state) => {
    return state.allTagNodes.filter(tagNodeIsSelected);
  };
  var getAmountOfUserDefinedTags = () => {
    return document.querySelectorAll(USER_DEFINED_TAGS_SELECTOR).length;
  };

  // src/ppai/gradientButtonListener.ts
  var GRADIENT_BUTTON_SELECTOR = ".GradientButton";
  var gradientButtonListener = (() => ({
    name: "gradientButtonListener",
    isInjected: () => {
      const container = $(GRADIENT_BUTTON_SELECTOR);
      if (!container)
        return true;
      if (!container.classList.contains("injected"))
        return false;
      return true;
    },
    shouldBeInjected: () => true,
    inject: () => {
      const container = $(GRADIENT_BUTTON_SELECTOR);
      if (!container)
        return;
      container.classList.add("injected");
      container.addEventListener("click", () => {
        const state = getAppState();
        state.lastGeneratedSelectedTags = Array.from(
          getAllSelectedTags(state)
        ).map((tag) => {
          var _a;
          return (_a = tag.textContent) != null ? _a : "";
        });
      });
    },
    injectionDelay: 200,
    uninject: () => {
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
  var forceReinject = (injectable) => {
    injectable.uninject();
    injectable.inject();
  };

  // src/util/dom/sortChildren.ts
  var sortChildrenBy = (comparator) => (nodes) => {
    if (!(nodes == null ? void 0 : nodes.children))
      return;
    [...nodes.children].sort(comparator).forEach((node) => nodes.appendChild(node));
  };
  var sortChildrenByText = sortChildrenBy(
    (a, b) => a.innerText.localeCompare(b.innerText)
  );

  // src/util/isSorted.ts
  var isSorted = (list, comparator) => {
    for (let i = 1; i < list.length; i++) {
      if (comparator(list[i - 1], list[i]) > 0) {
        return false;
      }
    }
    return true;
  };

  // src/ppai/renderSmallTag.ts
  var createSmallTag = (text) => {
    const tagNode = document.createElement("div");
    tagNode.classList.add("selectedTag");
    tagNode.innerText = text;
    return tagNode;
  };

  // src/ppai/selectedTags.ts
  var renderSelectedTags = (state) => {
    const container = document.querySelector("#selectedTags");
    if (!container)
      return;
    container.innerHTML = "";
    const selectedTagNodes = getAllSelectedTags(state);
    selectedTagNodes.sort((a, b) => a.innerText.localeCompare(b.innerText));
    for (const tagNode of selectedTagNodes) {
      const selectedTag = createSmallTag(tagNode.innerText);
      selectedTag.addEventListener("click", () => {
        toggleTag(state, selectedTag.innerText);
        renderSelectedTags(state);
      });
      container.appendChild(selectedTag);
    }
  };
  var SELECTED_TAGS_MARKUP = `
<div id="selectedTags"></div>
`;
  var selectedTags = (() => ({
    name: "selectedTags",
    isInjected: () => true,
    shouldBeInjected: () => true,
    inject: () => {
      var _a;
      const destination = $("#searchBarContainer");
      const container = $("#selectedTagsContainer");
      const toolbar2 = $(".toolbar");
      if (!container) {
        if (!destination)
          return;
        const container2 = document.createElement("div");
        container2.id = "selectedTagsContainer";
        container2.innerHTML = SELECTED_TAGS_MARKUP;
        (_a = destination.parentNode) == null ? void 0 : _a.insertBefore(container2, destination);
      }
      if (toolbar2 && container.firstChild !== toolbar2)
        container.insertBefore(toolbar2, container.firstChild);
      renderSelectedTags(getAppState());
    },
    injectionDelay: 200,
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/grids.ts
  var childLengthComparator = (a, b) => a.querySelectorAll(".flex.col.flex-wrap > div").length - b.querySelectorAll(".flex.col.flex-wrap > div").length;
  var sortTagGroupByNumberOfTags = sortChildrenBy(childLengthComparator);
  var reflowGrids = () => {
    const state = getAppState();
    state.allTagNodes = [];
    const groups = $(PANEL_SELECTOR);
    sortTagGroupByNumberOfTags(groups);
    const headers = $$(HEADERS_SELECTOR);
    for (const headerNode of [...headers]) {
      const contentNode = headerNode.nextSibling;
      sortChildrenByText(contentNode);
      const children = [...contentNode.children];
      state.allTagNodes = [...state.allTagNodes, ...children];
      const numberOfChildren = contentNode.children.length;
      if (children.some((child) => child.style.display !== "none")) {
        headerNode.style.display = "block";
      } else {
        headerNode.style.display = "none";
      }
    }
    state.amountOfUserDefinedTags = getAmountOfUserDefinedTags();
  };
  var lastKnownAmountOfTags = 0;
  var lastKnownUrl2 = "";
  var grids = (() => ({
    name: "grids",
    isInjected: () => {
      const url = window.location.href;
      if (url !== lastKnownUrl2) {
        lastKnownUrl2 = url;
        return false;
      }
      const amountOfTags = getAppState().allTagNodes.length;
      if (amountOfTags !== lastKnownAmountOfTags) {
        lastKnownAmountOfTags = amountOfTags;
        return false;
      }
      const groups = $(PANEL_SELECTOR);
      if (!groups)
        return true;
      return isSorted(
        [...groups.children],
        childLengthComparator
      );
    },
    shouldBeInjected: () => true,
    inject: () => {
      const groups = $(PANEL_SELECTOR);
      if (!groups)
        return;
      if (!groups.classList.contains("data-injected")) {
        groups.addEventListener("wheel", (evt) => {
          evt.preventDefault();
          groups.scrollLeft += evt.deltaY;
        });
        groups.classList.add("data-injected");
      }
      forceReinject(selectedTags);
      reflowGrids();
    },
    injectionDelay: 200,
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/imageTags.ts
  var tagCacheMap = /* @__PURE__ */ new Map();
  var tagCache = (id) => __async(void 0, null, function* () {
    if (!tagCacheMap.has(id)) {
      tagCacheMap.set(id, "STALE");
      const imageTags2 = yield fetchAllTagsForImage(id);
      tagCacheMap.set(id, imageTags2);
    }
    const result = tagCacheMap.get(id);
    return {
      stale: result === "STALE",
      data: result === "STALE" ? [] : result
    };
  });
  var setImageTags = (id, tags) => {
    tagCacheMap.set(id, tags);
  };
  var renderImageTags = (id) => __async(void 0, null, function* () {
    const container = $(A_TAG_SELECTOR);
    if (!container)
      return;
    const isMobile = getAppState().isMobile;
    const targetContainer = isMobile ? container : container.parentNode;
    let target = targetContainer == null ? void 0 : targetContainer.querySelector(".imageTags");
    if (!target) {
      target = document.createElement("div");
      target.classList.add("imageTags");
      if (isMobile) {
        target.classList.add("hidden");
      }
      targetContainer == null ? void 0 : targetContainer.appendChild(target);
    }
    try {
      target.innerHTML = "";
      const { stale, data } = yield tagCache(id);
      if (stale)
        return;
      target.innerHTML = "";
      for (const tag of data) {
        const tagNode = createSmallTag(tag);
        tagNode.addEventListener("click", () => {
          toggleTag(getAppState(), tag);
        });
        target.appendChild(tagNode);
      }
    } catch (e) {
      console.error(e);
    }
  });
  registerStyles(`
  /* rating container */
  ${ON_MOBILE} {
    .flex.justify-center.flex-col.items-center.mt-4, .flex.justify-center.flex-col.items-center.mb-4 {
      display: none;
    }

    .imageTags {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-wrap: wrap;
      padding-top: 2rem;
      background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.8) 100%);
      z-index: 50;
      align-items: center;
      justify-content: center;
      width: 100vw;
      border: none;
      pointer-events: auto;
      opacity: 1;
      transition: opacity 0.08s ease-in-out;
    }

    .imageTags.hidden {
      opacity: 0;
    }
  }
`);
  var lastKnownId = "";
  var imageTags = (() => ({
    name: "imageTags",
    isInjected: () => {
      var _a;
      const container = $(A_TAG_SELECTOR);
      if (!container)
        return true;
      return ((_a = container.parentElement) == null ? void 0 : _a.querySelector(".imageTags")) !== null;
    },
    shouldBeInjected: () => !!window.location.href.match(/make/),
    inject: () => {
      const container = $(A_TAG_SELECTOR);
      if (!container)
        return;
      const id = container.getAttribute("href").split("/")[2];
      lastKnownId = id;
      renderImageTags(id);
    },
    injectionDelay: 200,
    uninject: () => {
    },
    updateData: (id) => {
      const targetId = id != null ? id : lastKnownId;
      renderImageTags(targetId);
    }
  }))();

  // src/ppai/imageListener.ts
  var A_TAG_SELECTOR = '.w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/view/"], .w-full>.flex.flex-col.overflow-auto.mb-8.justify-center a[href^="/private/"]';
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
        imageTags.updateData(image.id);
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

.imageLink {
  position: relative;
}

${ON_MOBILE} {
  #generatedImageContainer {
    margin-bottom: 0rem;
    margin-top: 0rem;
    position: fixed;
    top: 3rem; /* topHeader height */
    width: 100vw;
    border-radius: 0;
    z-index: 100;
  }

  #generatedImages {
    padding: 0rem;
    min-height: 4rem;
    display: flex; 
    background-color: ${COLORS.ui};
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
  var GENERATED_IMAGES_MARKUP = `
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
  var generatedImages = /* @__PURE__ */ new Map();
  var imageListener = (() => ({
    name: "imageListener",
    isInjected: () => {
      var _a, _b, _c, _d;
      const images = $$(A_TAG_SELECTOR);
      let updateNecessary = false;
      for (const imageContainer of images) {
        (_a = imageContainer.parentElement) == null ? void 0 : _a.classList.add("genericUiElement");
        const id = (_b = imageContainer.getAttribute("href")) == null ? void 0 : _b.split("/").slice(1).join("/");
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
        const imageUrl = (_c = imageContainer.querySelector("img")) == null ? void 0 : _c.getAttribute("src");
        if (!id || !imageUrl)
          continue;
        if (!generatedImages.has(id)) {
          generatedImages.set(id, { id, url: imageUrl });
          setImageTags(id, getAppState().lastGeneratedSelectedTags);
          updateNecessary = true;
        }
      }
      if (updateNecessary || ((_d = $("#generatedImages")) == null ? void 0 : _d.children.length) === 0) {
        render();
      }
      return !!$("#generatedImageContainer");
    },
    shouldBeInjected: () => !!window.location.href.match(/make/),
    inject: () => {
      var _a;
      const container = document.createElement("div");
      container.id = "generatedImageContainer";
      container.innerHTML = GENERATED_IMAGES_MARKUP;
      (_a = $(PANEL_SELECTOR).parentNode) == null ? void 0 : _a.appendChild(container);
    },
    uninject: () => {
      queryAndDeleteAll("#generatedImageContainer");
      generatedImages = /* @__PURE__ */ new Map();
    },
    updateData: () => {
    }
  }))();

  // src/ppai/popperjs.ts
  var popperjs = (() => ({
    name: "popper.js",
    isInjected: () => !!$("#popperjs"),
    shouldBeInjected: () => true,
    inject: () => {
      addScript("https://unpkg.com/@popperjs/core@2", "popperjs");
    },
    uninject: () => {
      queryAndDeleteAll("#popperjs");
    },
    updateData: () => {
    }
  }))();

  // src/ppai/renamedHeaders.ts
  var renamedHeaders = (() => ({
    name: "renamedHeaders",
    isInjected: () => false,
    shouldBeInjected: () => $$(HEADERS_SELECTOR).some(
      (header) => header.innerText === "Number of people"
    ),
    inject: () => {
      $$(HEADERS_SELECTOR).filter((header) => header.innerText === "Number of people").map((header) => header.innerText = "#\u{1F469}");
    },
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/searchBar.ts
  var SEARCHBAR_MARKUP = `
<div id="searchBarContainer" style="display: flex; width:100%">
    <input class="searchBar" placeholder="Search..." style="color:white; background: #FFF1; border: 1px solid #FFF2; flex-grow: 1; margin:0; padding:0.5rem; border-top-left-radius:0.5rem;"/><button style="background-color: #FFF1; border: 1px solid #FFF2; border-left: none; border-top-right-radius:0.5rem; padding:0.5rem 0.8rem;">\u274C</button>
</div>
`;
  var search = (state, value) => {
    state.allTagNodes.forEach((tagNode) => {
      var _a;
      if ((_a = tagNode.textContent) == null ? void 0 : _a.includes(value)) {
        tagNode.style.display = "block";
      } else {
        tagNode.style.display = "none";
      }
    });
    forceReinject(grids);
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
        const toolsContainer = document.createElement("div");
        toolsContainer.innerHTML = SEARCHBAR_MARKUP;
        const searchBar2 = $(".searchBar", toolsContainer);
        const deleteButton = $("button", toolsContainer);
        (_a = tablist == null ? void 0 : tablist.parentNode) == null ? void 0 : _a.insertBefore(toolsContainer, tablist);
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

  // src/ppai/toolbar.ts
  var GRADIENT_BUTTON_SELECTOR2 = ".sticky .GradientButton";
  var PRIVATE_MODE_SWITCH_SELECTOR = ".p-4.rounded-lg.pointer-events-auto.backdrop-blur .mt-2.text-center";
  var STICKY_CONTAINER_SELECTOR = ".sticky.bottom-0.p-4.z-50.flex.justify-center.items-center.flex-col.pointer-events-none";
  var TOOLBAR_DESTINATION_SELECTOR = ".flex.flex-col-reverse.min-h-screen>.grow.px-4";
  var GENERATOR_AND_RATIO_SELECTOR = ".flex.flex-col-reverse.min-h-screen>.grow.px-4>.flex.flex-row";
  var CLEAR_TAGS_AND_COPY_TAGS_SELECTOR = ".flex.flex-col-reverse.min-h-screen>.grow.px-4>div.mb-4";
  var POSE_BUTTON_SELECTOR = ".flex.flex-col-reverse.min-h-screen>.grow.px-4>.bg-orange-500";
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
  var toolbar = (() => ({
    name: "toolbar",
    isInjected: () => !$(GRADIENT_BUTTON_SELECTOR2),
    shouldBeInjected: () => true,
    inject: () => {
      var _a, _b, _c;
      const destination = $(TOOLBAR_DESTINATION_SELECTOR);
      const generatorAndRatio = $(GENERATOR_AND_RATIO_SELECTOR);
      const clearTagsAndCopyTags = $(CLEAR_TAGS_AND_COPY_TAGS_SELECTOR);
      const gradientButton = $(GRADIENT_BUTTON_SELECTOR2);
      const privateMode = $(PRIVATE_MODE_SWITCH_SELECTOR);
      const poseButton = $(POSE_BUTTON_SELECTOR);
      if (!destination || !generatorAndRatio || !clearTagsAndCopyTags || !gradientButton || !privateMode || !poseButton)
        return;
      console.log("clearcopy", clearTagsAndCopyTags);
      const container = document.createElement("div");
      container.classList.add("toolbar");
      container.appendChild(gradientButton);
      [
        ...$$("select", generatorAndRatio),
        ...clearTagsAndCopyTags.children,
        poseButton
      ].forEach((child) => {
        container.appendChild(child);
      });
      container.appendChild(privateMode);
      queryAndDeleteAll(STICKY_CONTAINER_SELECTOR);
      queryAndDeleteAll(CLEAR_TAGS_AND_COPY_TAGS_SELECTOR);
      queryAndDeleteAll(GENERATOR_AND_RATIO_SELECTOR);
      console.log("container", container);
      (_a = container.children[2]) == null ? void 0 : _a.classList.add("desktop-only");
      (_b = container.children[3]) == null ? void 0 : _b.classList.add("desktop-only");
      (_c = container.children[4]) == null ? void 0 : _c.classList.add("desktop-only");
      if (container.children[6])
        container.children[6].querySelector("span").innerText = "Private";
      container.appendChild(container.querySelector(".GradientButton"));
      destination.insertBefore(container, destination.firstChild);
    },
    injectionDelay: 200,
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/tooltip.ts
  var TOOLTIP_MARKUP = `
<div id="tooltip" style="display: none; pointer-events: none; position: fixed; top: 0; left: 0; z-index: 10; background-color: #000; border-radius: 0.5rem; color: #AAA; height: 5rem; overflow: hidden; max-width: 30rem; box-shadow: 0 0.2rem 0.5rem 0 rgba(0,0,0,0.6)">
    <img id="tooltip_image" src="https://cdn.pornpen.ai/df1a6625-f1b6-4c03-87cb-8a593e980a17.jpg" style="width: 8rem; height: 8rem" />
    <div id="tooltip_info" style="font-size: 0.8rem; display: flex; flex-direction: column;">
        <div id="tooltip_name" style="padding-top: 0.25rem; padding-left: 0.5rem; padding-right: 0.5rem; font-weight: bold; color: white; flex-shrink: 0;">lil black dress</div>
        <div id="tooltip_description" style="padding-left: 0.5rem; padding-right: 0.5rem; flex-shrink: 1; flex-grow: 1; overflow: clip; min-height: 0;">do fjsopaijopijopfja oisdjposisjdopij do fjsopaijopijopfja oisdjposisjdopij do fjsopaijopijopfja oisdjposisjdopij do fjsopaijopijopfja oisdjposisjdopijdo fjsopaijopijopfja oisdjposisjdopij do fjsopaijopijopfja oisdjposisjdopijdo fjsopaijopijopfja oisdjposisjdopij do fjsopaijopijopfja oisdjposisjdopij</div>
        <div id="tooltip_footer" style="padding-left: 0.5rem; padding-right: 0.5rem; display: flex; background-color: #222; color: #888; font-size: 0.7rem; flex-shrink: 0;">
            <div id="tooltip_category">Clothing</div><div>&nbsp;-&nbsp;by&nbsp;</div>
            <div id="tooltip_creator">Sushislut</div><div>&nbsp;-&nbsp;</div>
            <div id="tooltip_saves">2203</div><div>&nbsp;saves</div>
        </div>
    </div>
</div>
`;
  var tooltip = (() => ({
    name: "tooltip",
    isInjected: () => !!$("#tooltipContainer"),
    shouldBeInjected: () => true,
    inject: () => {
      const tooltipContainer = document.createElement("div");
      tooltipContainer.setAttribute("id", "tooltipContainer");
      tooltipContainer.innerHTML = TOOLTIP_MARKUP;
      document.body.appendChild(tooltipContainer);
    },
    uninject: () => {
      queryAndDeleteAll("#tooltipContainer");
    },
    updateData: (data) => {
      try {
        $("#tooltip_image").setAttribute("src", data.image);
        $("#tooltip_name").innerText = data.name;
        $("#tooltip_description").innerText = data.description;
        $("#tooltip_category").innerText = data.category;
        $("#tooltip_creator").innerText = data.creator;
        $("#tooltip_saves").innerText = data.saves.toString();
      } catch (e) {
      }
    }
  }))();

  // src/ppai/tooltipListeners.ts
  var attachTagNodeEventListeners = (state) => {
    state.allTagNodes.forEach((tagNode) => {
      if (tagNode.getAttribute("data-injected") === "1")
        return;
      let popper;
      tagNode.addEventListener("mouseover", () => {
        const name = tagNode.innerText;
        const tag = state.allTags.get(name);
        if (!tag)
          return;
        tooltip.updateData({
          name: tag.name,
          description: tag.description,
          category: tag.category,
          creator: tag.ownerUsername,
          saves: tag.numSaves,
          image: tag.imageUrl
        });
        $("#tooltip").style.display = "flex";
        popper = unsafeWindow.Popper.createPopper(
          tagNode,
          document.querySelector("#tooltip"),
          {
            placement: "right"
          }
        );
      });
      tagNode.addEventListener("mouseout", () => {
        const tooltip2 = $("#tooltip");
        tooltip2.style.display = "none";
        popper == null ? void 0 : popper.destroy();
      });
      tagNode.addEventListener("click", () => {
        setTimeout(() => forceReinject(selectedTags), 25);
      });
      tagNode.setAttribute("data-injected", "1");
    });
  };
  var lastKnownAmountOfTags2 = 0;
  var lastKnownUrl3 = "";
  var tooltipListeners = (() => ({
    name: "tooltipListeners",
    isInjected: () => {
      const url = window.location.href;
      if (url !== lastKnownUrl3) {
        lastKnownUrl3 = url;
        return false;
      }
      const amountOfTags = getAppState().allTagNodes.length;
      if (amountOfTags !== lastKnownAmountOfTags2) {
        lastKnownAmountOfTags2 = amountOfTags;
        return false;
      }
      return true;
    },
    shouldBeInjected: () => true,
    inject: () => {
      attachTagNodeEventListeners(getAppState());
    },
    injectionDelay: 200,
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/ppai/topHeader.ts
  var TOP_HEADER_SELECTOR = ".flex.text-white.text-lg.p-2.select-none.flex-wrap.overflow-x-scroll.max-w-full";
  var MENU_SELECTOR = ".flex.underline";
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
  var SIDEBAR_MARKUP = `
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
  var HAMBURGER_MARKUP = `
  <div id="hamburger" class="flex-col justify-center items-center p-2">
    <div class="w-6 h-1 bg-white mt-0.5 mb-1"></div>
    <div class="w-6 h-1 bg-white mb-1"></div>
    <div class="w-6 h-1 bg-white mb-0.5"></div>
  </div>
`;
  var topHeader = (() => ({
    name: "topHeader",
    isInjected: () => !$(`${TOP_HEADER_SELECTOR} > ${MENU_SELECTOR}`),
    shouldBeInjected: () => true,
    inject: () => {
      var _a;
      const menu = $(`${TOP_HEADER_SELECTOR} > ${MENU_SELECTOR}`);
      const menuParent = menu == null ? void 0 : menu.parentNode;
      if (!menu || !menuParent || !((_a = menuParent.firstChild) == null ? void 0 : _a.firstChild))
        return;
      menuParent.firstChild.insertBefore(
        menu,
        menuParent.firstChild.firstChild.nextSibling
      );
      const hamburger = $("#hamburger");
      if (!hamburger) {
        menuParent.insertAdjacentHTML(
          "afterbegin",
          HAMBURGER_MARKUP
        );
        $("#hamburger").addEventListener("click", (e) => {
          e.stopPropagation();
          $("#sidebar").classList.toggle("sidebarHidden");
        });
      }
      const pp = $(TOP_HEADER_SELECTOR).querySelector("a");
      if (pp)
        pp.innerText = pp.innerText.replace("pornpen", "pp");
      let sidebar = $("#sidebar");
      if (!sidebar) {
        document.body.insertAdjacentHTML("afterend", SIDEBAR_MARKUP);
        sidebar = $("#sidebar");
        sidebar.addEventListener(
          "click",
          (e) => {
            e.stopPropagation();
          },
          true
        );
        document.body.addEventListener("click", (e) => {
          sidebar.classList.add("sidebarHidden");
        });
      }
    },
    uninject: () => {
    },
    updateData: () => {
    }
  }))();

  // src/util/dom/getScrollbarWidth.ts
  var getScrollbarWidth = () => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);
    const inner = document.createElement("div");
    outer.appendChild(inner);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
  };

  // src/index.ts
  var import_lzstring2 = __toESM(require_lzstring());
  (function() {
    "use strict";
    const state = getAppState();
    unsafeWindow.LZString = import_lzstring2.default;
    fetchAllTags().then((data) => {
      state.allTags = data;
    });
    unsafeWindow.fetchAllTagsForImage = fetchAllTagsForImage;
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
    state.scrollbarSize = getScrollbarWidth();
    log("G'day mates!");
    [
      popperjs,
      searchBar,
      renamedHeaders,
      tamperedStylesheet,
      tooltip,
      tooltipListeners,
      grids,
      selectedTags,
      topHeader,
      toolbar,
      imageListener,
      categorySelector,
      imageTags,
      gradientButtonListener
    ].forEach(registerInjectable);
    startInjectableObserver();
  })();
})();
