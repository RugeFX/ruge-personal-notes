export function dateStringToLocale(locale, dateStr) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateStr).toLocaleDateString(locale, options);
}
