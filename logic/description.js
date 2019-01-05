import {
  descriptionSource,
  sourceNumber,
  conjunctionNumber,
  conjunctions,
  sourceTextNumber,
  sourceText
} from './description-data';

const factor = 211;
/**
 * Generate a description from gengou.
 */
export function generateDescription(leftId, rightId, kanjis) {
  const leftCode = (leftId + rightId * factor) % sourceNumber;
  const rightCodeRaw = (leftId * factor + rightId) % (sourceNumber - 1);
  const rightCode = rightCodeRaw < leftCode ? rightCodeRaw : rightCodeRaw + 1;

  const conjCode = (leftId + rightId) % conjunctionNumber;
  const sourceCode = ((leftId + rightId) * factor) % sourceTextNumber;
  return (
    descriptionSource[leftCode].replace('{{kanji}}', kanjis[leftId].value) +
    conjunctions[conjCode] +
    descriptionSource[rightCode].replace('{{kanji}}', kanjis[rightId].value) +
    sourceText[sourceCode]
  );
}
