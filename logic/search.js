import { composeKanji } from './composeKanji';

/**
 * Search a gengou from query.
 */
export function searchGengou(query, kanjis) {
  if (!query) return [];
  // binary-search for first character.
  console.log(query);
  const rangeStart = prefixBSearchStart(query, kanjis, false);
  console.log('start', rangeStart);
  if (rangeStart == null) {
    return [];
  }
  const rangeEnd = prefixBSearchEnd(query, kanjis, false);
  console.log('end', rangeEnd);
  if (rangeEnd == null) {
    return [];
  }
  const firstKanjis = kanjis.slice(rangeStart, rangeEnd + 1);
  const cache = {};
  const result = [];
  for (const obj of firstKanjis) {
    const secondQuery = query.slice(obj.read.length);
    console.log(query, obj.read, secondQuery);
    if (cache[secondQuery]) {
      for (const secondKanji of cache[secondQuery]) {
        result.push(composeKanji(obj, secondKanji));
      }
      continue;
    }
    const rangeStart = prefixBSearchStart(secondQuery, kanjis, true);
    console.log('second start', rangeStart);
    if (rangeStart == null) {
      cache[secondQuery] = [];
      continue;
    }
    const rangeEnd = prefixBSearchEnd(secondQuery, kanjis, true);
    console.log('second end', rangeEnd);
    if (rangeEnd == null) {
      cache[secondQuery] = [];
      continue;
    }
    cache[secondQuery] = kanjis.slice(rangeStart, rangeEnd + 1);
    console.log('second', cache[secondQuery]);
    for (const secondKanji of cache[secondQuery]) {
      result.push(composeKanji(obj, secondKanji));
    }
  }
  return result;
}

function prefixBSearchStart(query, kanjis, exact) {
  const qlen = query.length;
  let start = 0;
  let end = kanjis.length - 1;
  while (start < end) {
    const center = Math.floor((start + end) / 2);
    const read = kanjis[center].read;
    const q = exact ? query : query.slice(0, read.length);
    console.log(center, read);
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
  const qlen = query.length;
  let start = 0;
  let end = kanjis.length - 1;
  while (start < end) {
    const center = Math.floor((start + end + 1) / 2);
    const read = kanjis[center].read;
    const q = exact ? query : query.slice(0, read.length);
    console.log(center, read);
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
