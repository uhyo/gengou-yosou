/**
 * unique a sorted array of string.
 */
export function unique(arr) {
  const result = [];
  let prev = null;
  for (const elm of arr) {
    if (prev !== elm) {
      result.push(elm);
    }
    prev = elm;
  }
  return result;
}
