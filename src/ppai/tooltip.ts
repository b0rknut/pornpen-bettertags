import { Injectable } from '../util/dom/injectable';
import { queryAndDeleteAll } from '../util/dom/markup';
import { $ } from '../util/dom/querySelector';

export type TooltipInfo = {
  image: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  saves: number;
};

const TOOLTIP_MARKUP = `
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

export const tooltip: Injectable<TooltipInfo> = (() => ({
  name: 'tooltip',
  isInjected: () => !!$('#tooltipContainer'),
  shouldBeInjected: () => true,
  inject: () => {
    const tooltipContainer = document.createElement('div');
    tooltipContainer.setAttribute('id', 'tooltipContainer');
    tooltipContainer.innerHTML = TOOLTIP_MARKUP;
    document.body.appendChild(tooltipContainer);
  },
  uninject: () => {
    queryAndDeleteAll('#tooltipContainer');
  },
  updateData: (data) => {
    try {
      $('#tooltip_image').setAttribute('src', data.image);
      $('#tooltip_name').innerText = data.name;
      $('#tooltip_description').innerText = data.description;
      $('#tooltip_category').innerText = data.category;
      $('#tooltip_creator').innerText = data.creator;
      $('#tooltip_saves').innerText = data.saves.toString();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
}))();
