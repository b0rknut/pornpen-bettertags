import { registerStyles } from '../styles';
import { Injectable, forceReinject } from '../util/dom/injectable';
import { $ } from '../util/dom/querySelector';
import { AppState, getAppState } from './appState';
import { grids } from './grids';

export type TooltipInfo = {
  image: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  saves: number;
};

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

const LETTER_SELECTOR_MARKUP = `
<div class='letterSelectorContainer'>
  <div class='letterSelector'>
    <div class='letterContainer'><div class='letterContainerInner'><div class="letter"></div></div></div>
    <ol class='labels'>
      <li>🚫</li>
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

export const search = (state: AppState, value: string) => {
  state.allTagNodes.forEach((tagNode) => {
    if (
      tagNode.textContent?.includes(value) &&
      tagNode.textContent?.match(state.letterFilter)
    ) {
      tagNode.style.removeProperty('display');
    } else {
      tagNode.style.display = 'none';
    }
  });
  forceReinject(grids);
};

const sigmoid = (x: number) => {
  return 1 / (1 + Math.exp(-x));
};

const calcOffset = (x: number, i: number, denom = 4) => {
  const quadratic = 1 - ((x - i) / denom) ** 2;
  const smoothQuadratic = sigmoid(2 * (quadratic - 0.2));
  return Math.max(0, smoothQuadratic);
};

export const letterSelector: Injectable<never> = (() => ({
  name: 'letterSelector',
  isInjected: () => !!$('.letterSelectorContainer'),
  shouldBeInjected: () => true,
  inject: () => {
    try {
      let container = $('.letterSelectorContainer');

      if (!container) {
        document.body.insertAdjacentHTML('afterend', LETTER_SELECTOR_MARKUP);
      }

      container = $('.letterSelectorContainer');

      const letter = $('.letter', container);
      const labels = $('.labels', container).querySelectorAll('li');

      const letters = '-#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const regexes = letters.map((letter) => new RegExp(`^${letter}`, 'i'));
      regexes[0] = /^/;
      regexes[1] = /^[0-9]/;

      let selectedIndex = 0;
      let isDragging = 0;

      const input = $<HTMLInputElement>('input', container);

      input.addEventListener('input', () => {
        console.log('asdssssssssasd');
        selectedIndex = 27 - Number(input.value);
        letter.innerText = letters[selectedIndex];
        letter.style.transform = `translateY(${selectedIndex}rem)`;

        labels.forEach((label, i) => {
          const offset = isDragging * 70 * calcOffset(i, selectedIndex, 4);
          label.style.transform = `translate(-${offset}px)`;
        });
      });

      const pointerDown = () => {
        console.log('asdsasd');
        isDragging = 1;
        labels.forEach((label, i) => {
          label.style.transition = `all 0.03s linear`;
          const offset = isDragging * 70 * calcOffset(i, selectedIndex, 4);
          label.style.transform = `translate(-${offset}px)`;
        });
        letter.style.display = 'block';
      };

      const pointerUp = () => {
        isDragging = 0;
        labels.forEach((label, i) => {
          label.style.transition = `all 0.08s ease-out`;
          label.style.transform = `translate(0px)`;
        });
        letter.style.display = 'none';
        getAppState().letterFilter = regexes[selectedIndex];
        search(getAppState(), $<HTMLInputElement>('.searchBar')?.value ?? '');
      };

      input.addEventListener('touchstart', pointerDown);
      input.addEventListener('mousedown', pointerDown);
      input.addEventListener('touchend', pointerUp);
      input.addEventListener('mouseup', pointerUp);

      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  uninject: () => {},
  updateData: () => {},
}))();
