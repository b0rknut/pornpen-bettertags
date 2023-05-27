import { $ } from '../util/dom/querySelector';

type WellKnownGenerator =
  | 'women_crisp'
  | 'women_real'
  | 'women_accurate'
  | 'women'
  | 'anime'
  | 'doggystyle'
  | 'blowjob'
  | 'missionary'
  | 'titfuck'
  | 'men'
  | (string & {});

export const selectGenerator = (name: WellKnownGenerator) => {
  const node = $<HTMLOptionElement>(`option[value="${name}"]`);
  const select = node.parentElement;
  if (!node || !select) return;
  node.selected = true;
  select.dispatchEvent(
    new Event('change', {
      bubbles: true,
      cancelable: true,
    }),
  );
};
