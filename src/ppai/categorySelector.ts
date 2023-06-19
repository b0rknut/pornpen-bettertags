import {
  HEADERS_SELECTOR,
  ON_MOBILE,
  PANEL_SELECTOR,
  registerStyles,
} from '../styles';
import { Injectable } from '../util/dom/injectable';
import { queryAndDeleteAll } from '../util/dom/markup';
import { $, $$ } from '../util/dom/querySelector';

registerStyles(`
/* categorySelector */

${ON_MOBILE} {
  #categorySelectorContainer {
    display: none;
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

const CATEGORY_SELECTOR_MARKUP = `
<div id="categorySelector"></div>
`;

let lastKnownTagGroups = '';
export const categorySelector: Injectable<never> = (() => ({
  name: 'categorySelector',
  isInjected: () => {
    const tagGroups = $$(HEADERS_SELECTOR)
      .map((header) => header.textContent)
      .join(',');

    if (tagGroups !== lastKnownTagGroups) {
      lastKnownTagGroups = tagGroups;
      return false;
    }

    return !!$('#categorySelectorContainer');
  },
  shouldBeInjected: () => true,
  inject: () => {
    let selector = $('#categorySelector');

    if (!selector) {
      const categorySelectorContainer = document.createElement('div');
      categorySelectorContainer.setAttribute('id', 'categorySelectorContainer');
      categorySelectorContainer.innerHTML = CATEGORY_SELECTOR_MARKUP;

      const destination = $(PANEL_SELECTOR);
      if (!destination) return;

      if (destination.nextSibling) {
        destination.parentNode?.insertBefore(
          categorySelectorContainer,
          destination.nextSibling,
        );
      } else {
        destination.parentNode?.appendChild(categorySelectorContainer);
      }

      selector = $('#categorySelector');
    }

    selector.innerHTML = '';

    for (const header of $$(HEADERS_SELECTOR)) {
      const text = header.textContent ?? '';
      const tagGroup = header.parentElement;

      const container = document.createElement('div');

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', text);
      checkbox.setAttribute('id', `categorySelector-${text}`);
      checkbox.setAttribute('value', text);
      checkbox.setAttribute('checked', 'checked');

      const label = document.createElement('label');
      label.setAttribute('for', `categorySelector-${text}`);
      label.textContent = text;

      container.appendChild(checkbox);
      container.appendChild(label);

      checkbox.addEventListener('change', (evt) => {
        if (tagGroup) {
          tagGroup.style.display = checkbox.checked ? 'inline-block' : 'none';
        }
      });

      selector.appendChild(container);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('categorySelectorButtonContainer');

    const selectAllButton = document.createElement('button');
    selectAllButton.classList.add('categorySelectorButton');
    selectAllButton.textContent = 'Select All';
    selectAllButton.addEventListener('click', () => {
      for (const checkbox of $$<HTMLInputElement>(
        '#categorySelector input[type="checkbox"]',
      )) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
      }
    });

    const deselectAllButton = document.createElement('button');
    deselectAllButton.classList.add('categorySelectorButton');
    deselectAllButton.textContent = 'Deselect All';
    deselectAllButton.addEventListener('click', () => {
      for (const checkbox of $$<HTMLInputElement>(
        '#categorySelector input[type="checkbox"]',
      )) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
      }
    });

    buttonContainer.appendChild(selectAllButton);
    buttonContainer.appendChild(deselectAllButton);
    selector.appendChild(buttonContainer);
  },
  uninject: () => {
    queryAndDeleteAll('#categorySelectorContainer');
  },
  updateData: () => {},
}))();
