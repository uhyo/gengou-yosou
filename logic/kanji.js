// kanjis usable for forming 元号.
// source: https://ja.wikipedia.org/wiki/%E5%B8%B8%E7%94%A8%E6%BC%A2%E5%AD%97%E4%B8%80%E8%A6%A7jj
import kanjis from './kanji.json';
import { generateDescription } from './description.js';

/**
 * Number of available kanjis.
 */
const kanjiNumber = kanjis.length;

/**
 * a prime.
 */
const factor = 2702159;

const phase = 1111111;
/**
 * Get data of gengou from given code.
 */
export function getGengouData(code) {
  const gengouIndex = code * factor + phase;
  const left = gengouIndex % kanjiNumber;
  const right = Math.floor(gengouIndex / kanjiNumber) % kanjiNumber;
  return {
    ...composeKanji(kanjis[left], kanjis[right]),
    description: generateDescription(left, right, kanjis)
  };
}

/**
 * Compose two kanji object.
 */
function composeKanji(left, right) {
  return {
    value: left.value + right.value,
    read: left.read + right.read
  };
}
