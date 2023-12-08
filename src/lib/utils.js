export function dateStringToLocale(dateStr) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateStr).toLocaleDateString("id-ID", options);
}
