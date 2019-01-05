/**
 * Compose two kanji object.
 */
export function composeKanji(left, right) {
  return {
    value: left.value + right.value,
    read: left.read + right.read
  };
}
