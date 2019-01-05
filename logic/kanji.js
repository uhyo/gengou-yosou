// kanjis usable for forming 元号.
// source: https://ja.wikipedia.org/wiki/%E5%B8%B8%E7%94%A8%E6%BC%A2%E5%AD%97%E4%B8%80%E8%A6%A7jj
import kanjis from './kanji.json';
import { generateDescription } from './description.js';
import { searchGengou } from './search.js';
import { composeKanji } from './composeKanji';

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

let egcdCache = null;
/**
 * Calculate canonical id of gengou.
 */
export function canonical(leftCode, rightCode) {
  const targetIndex = rightCode * kanjiNumber + leftCode;
  const targetIndexp = targetIndex - phase;
  const k2 = kanjiNumber * kanjiNumber;
  // targetIndexp == code * factor mod k2
  const [x, _] = egcdCache || (egcdCache = egcd(factor, k2));
  // x * factor + _ * K^2 == 1
  // x * factor == 1 mod K^2
  // x * targetIndexp * factor == targetIndexp mod K^2
  const res = (x * (targetIndexp % k2)) % k2;
  return res >= 0 ? res : res + k2;
}

/**
 * 拡張ユークリッドの互除法
 * Returns [x, y] such that ax + by = 1
 */
function egcd(a, b) {
  if (b === 0) {
    return [1, 0];
  }
  const [x, y] = egcd(b, a % b);
  return [y, x - Math.floor(a / b) * y];
}
/**
 * Search for matching gengou.
 */
export function search(query) {
  return searchGengou(query, kanjis);
}
