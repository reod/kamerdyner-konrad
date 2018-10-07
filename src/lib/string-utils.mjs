export function appendLeadingZero(n) {
  const str = String(n);
  const withLeadingZero = str.length === 1 ? `0${n}` : str;

  return withLeadingZero;
}
