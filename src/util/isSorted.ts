export const isSorted = <T>(
  list: T[],
  comparator: (a: T, b: T) => number,
): boolean => {
  for (let i = 1; i < list.length; i++) {
    if (comparator(list[i - 1], list[i]) > 0) {
      return false;
    }
  }
  return true;
};
