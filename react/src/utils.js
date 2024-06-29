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
  const parseTime = (time) => {
    if (!time || typeof time !== "string") {
      return null;
    }
    const [hours, minutes] = time.split(":").map((num) => parseInt(num));
    return { hours, minutes };
  };

  const isOpenNow = (currentTime, openTime, closeTime) => {
    if (!currentTime || !openTime || !closeTime) {
      return false;
    }

    const currentTotalMinutes = currentTime.hours * 60 + currentTime.minutes;
    const openTotalMinutes = openTime.hours * 60 + openTime.minutes;
    const closeTotalMinutes = closeTime.hours * 60 + closeTime.minutes;

    // Check if current time is within opening hours
    const withinOpeningHours =
      currentTotalMinutes >= openTotalMinutes &&
      currentTotalMinutes < closeTotalMinutes;

    // Check if today is an excluded day
    const today = weekDays[new Date().getDay()];
    const isExcludedDay = excludedDays.includes(today);

    return withinOpeningHours && !isExcludedDay;
  };

  // Get current time
  const now = new Date();
  const currentTime = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
  };

  // Parse open and close times
  const parsedOpenTime = parseTime(openTime);
  const parsedCloseTime = parseTime(closeTime);

  // Filter out excluded days
  const openingDays = weekDays.filter((day) => !excludedDays.includes(day));
  const isClosed = !isOpenNow(currentTime, parsedOpenTime, parsedCloseTime);

  // Format parsedOpenTime and parsedCloseTime to 12-hour format with AM/PM
  const formatTime = (timeObj) => {
    if (!timeObj) {
      return null;
    }
    const { hours, minutes } = timeObj;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  };

  const formattedOpenTime = formatTime(parsedOpenTime);
  const formattedCloseTime = formatTime(parsedCloseTime);

  // Return the result
  return {
    fromTo: [openingDays[0], openingDays[openingDays.length - 1]],
    days: openingDays,
    open: formattedOpenTime,
    close: formattedCloseTime,
    isClosed: isClosed,
  };
};
