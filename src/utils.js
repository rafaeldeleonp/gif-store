const LARGE_SCREENS = 'lg';
const EXTRA_LARGE_SCREENS = 'xl';

export function firstLetterCapitalized(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function isMobileSize(width) {
  return width !== LARGE_SCREENS && width !== EXTRA_LARGE_SCREENS;
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatSearch(value) {
  return value.replace(" ", "+");
}
