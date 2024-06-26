const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const openingDays = (excludedDays, openTime, closeTime) => {
  const openingDays = weekDays.filter((day) => !excludedDays.includes(day));

  const formatTime = (time) => {
    if (!time || typeof time !== "string") {
      return "";
    }
    const [hours, minutes] = time.split(":");
    const period = parseInt(hours) >= 12 ? "PM" : "AM";
    const formattedHours = parseInt(hours) % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formattedOpenTime = formatTime(openTime);
  const formattedCloseTime = formatTime(closeTime);

  return {
    fromTo: [openingDays[0], openingDays[openingDays.length - 1]],
    days: openingDays,
    open: formattedOpenTime,
    close: formattedCloseTime,
  };
};
