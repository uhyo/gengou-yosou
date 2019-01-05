/**
 * String representation of gengou code.
 */
export function gengouIdString(code) {
  return `0000000${code.toString(16)}`.slice(-8);
}
