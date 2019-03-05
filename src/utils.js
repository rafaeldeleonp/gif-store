const EXTRA_SMALL = 'xs';

export function firstLetterCapitalized(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function isMobileSize(width) {
  return width === EXTRA_SMALL;
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatSearch(value) {
  return value.replace(" ", "+");
}
