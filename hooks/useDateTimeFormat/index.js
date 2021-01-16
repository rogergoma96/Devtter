const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat;

const formatDate = (timestamp, { language = "es-ES" } = {}) => {
  const date = new Date(timestamp);

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString(language, options);
  }

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Intl.DateTimeFormat(language, options).format(date);
};

const useDateTimeFormat = (timestamp) =>
  formatDate(timestamp, { language: "es-ES" });

export default useDateTimeFormat;
