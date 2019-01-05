import { composeKanji } from './composeKanji';

/**
 * Search a gengou from query.
 */
export function searchGengou(query, kanjis) {
  if (!query) return [];
  // binary-search for first character.
  const rangeStart = prefixBSearchStart(query, kanjis, false);
  if (rangeStart == null) {
    return [];
  }
  const rangeEnd = prefixBSearchEnd(query, kanjis, false);
  if (rangeEnd == null) {
    return [];
  }
  const firstKanjis = kanjis.slice(rangeStart, rangeEnd + 1);
  const cache = {};
  const result = [];
  for (let leftCode = rangeStart; leftCode <= rangeEnd; leftCode++) {
    const obj = kanjis[leftCode];
    const secondQuery = query.slice(obj.read.length);
    if (cache[secondQuery] == null) {
      const rangeStart = prefixBSearchStart(secondQuery, kanjis, true);
      if (rangeStart == null) {
        cache[secondQuery] = [];
        continue;
      }
      const rangeEnd = prefixBSearchEnd(secondQuery, kanjis, true);
      if (rangeEnd == null) {
        cache[secondQuery] = [];
        continue;
      }
      cache[secondQuery] = { rangeStart, rangeEnd };
    }
    const c = cache[secondQuery];
    for (let rightCode = c.rangeStart; rightCode <= c.rangeEnd; rightCode++) {
      const secondKanji = kanjis[rightCode];
      result.push({
        ...composeKanji(obj, secondKanji),
        leftCode,
        rightCode
      });
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
