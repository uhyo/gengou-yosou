import { composeKanji } from './composeKanji';

/**
 * Search a gengou from query.
 */
export function searchGengou(query, kanjis) {
  if (!query) return [];
  if (query.length >= 7) {
    // gengou with more than 6 characters read is not known.
    return [];
  }
  const result = [];
  for (let i = 1; i < query.length; i++) {
    const firstKanji = query.slice(0, i);
    const secondKanji = query.slice(i);
    // binary-seach for first kanji.
    const rangeStart1 = prefixBSearchStart(firstKanji, kanjis, true);
    const rangeEnd1 = prefixBSearchEnd(firstKanji, kanjis, true);
    if (rangeStart1 == null || rangeEnd1 == null) {
      continue;
    }
    // search for second kanji.
    const rangeStart2 = prefixBSearchStart(secondKanji, kanjis, true);
    const rangeEnd2 = prefixBSearchEnd(secondKanji, kanjis, true);
    if (rangeStart2 == null || rangeEnd2 == null) {
      continue;
    }
    for (let leftCode = rangeStart1; leftCode <= rangeEnd1; leftCode++) {
      const leftKanji = kanjis[leftCode];
      for (let rightCode = rangeStart2; rightCode <= rangeEnd2; rightCode++) {
        const rightKanji = kanjis[rightCode];
        result.push({
          ...composeKanji(leftKanji, rightKanji),
          leftCode,
          rightCode
        });
      }
    }
  }
  return result;
}

function prefixBSearchStart(query, kanjis, exact) {
  let start = 0;
  let end = kanjis.length - 1;
  while (start < end) {
    const center = Math.floor((start + end) / 2);
    const read = kanjis[center].read;
    const q = exact ? query : query.slice(0, read.length);
    if (q <= read) {
      end = center;
    } else {
      start = center + 1;
    }
  }
  const read = kanjis[start].read;
  const q = exact ? query : query.slice(0, read.length);
  if (read === q) {
    return start;
  } else {
    return null;
  }
}

function prefixBSearchEnd(query, kanjis, exact) {
  let start = 0;
  let end = kanjis.length - 1;
  while (start < end) {
    const center = Math.floor((start + end + 1) / 2);
    const read = kanjis[center].read;
    const q = exact ? query : query.slice(0, read.length);
    if (read > q) {
      end = center - 1;
    } else {
      start = center;
    }
  }
  const read = kanjis[start].read;
  const q = exact ? query : query.slice(0, read.length);
  if (read === q) {
    return start;
  } else {
    return null;
  }
}
