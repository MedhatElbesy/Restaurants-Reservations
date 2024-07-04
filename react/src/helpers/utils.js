import isoCodes from "iso-country-currency";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Parse time function
export const parseTime = (time) => {
  if (!time || typeof time !== "string") {
    return null;
  }
  const [hours, minutes] = time.split(":").map((num) => parseInt(num));
  return { hours, minutes };
};

// Check if currently open function
export const isOpenNow = (currentTime, openTime, closeTime, excludedDays) => {
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

// Format time to 12-hour format with AM/PM
export const formatTime = (timeString) => {
  const timeObj = parseTime(timeString);
  if (!timeObj) {
    return null;
  }
  const { hours, minutes } = timeObj;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};

// Function to get opening days without excluded days
export const getOpeningDays = (excludedDays) => {
  return weekDays.filter((day) => !excludedDays.includes(day));
};

// Main function to calculate opening days and times
export const openingDays = (excludedDays, openTime = "", closeTime = "") => {
  // Get current time
  const now = new Date();
  const currentTime = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
  };

  const parsedOpenTime = parseTime(openTime);
  const parsedCloseTime = parseTime(closeTime);

  // Filter out excluded days
  const openingDays = getOpeningDays(excludedDays);
  const isClosed = !isOpenNow(
    currentTime,
    parsedOpenTime,
    parsedCloseTime,
    excludedDays
  );

  // Format open and close times
  const formattedOpenTime = formatTime(openTime);
  const formattedCloseTime = formatTime(closeTime);

  return {
    fromTo: [openingDays[0], openingDays[openingDays.length - 1]],
    days: openingDays,
    open: formattedOpenTime,
    close: formattedCloseTime,
    isClosed: isClosed,
  };
};

// Function to calculate checkout amount
export const checkoutAmount = (table, selectedData) => {
  const extraChairTotal =
    Number(selectedData.extraSeats) * Number(table.extra_chair_price);
  const extraChildTotal =
    Number(selectedData.childSeats) * Number(table.extra_child_chair_price);
  const subTotal = Number(table.price) + extraChildTotal + extraChairTotal;
  const discount = Number(table.price) - Number(table.sale_price);
  const beforeTax = subTotal - discount;
  const tax = beforeTax * 0.1;
  const total = beforeTax + tax;

  return {
    total,
    discount,
    subTotal,
    extraChildTotal,
    extraChairTotal,
    beforeTax,
    tax,
  };
};

export const formatPrice = (price, countryCode) => {
  // Get currency data based on country code
  const currencyData = isoCodes.getAllInfoByISO(countryCode.toUpperCase());

  // Extract the currency code
  const currency = currencyData.currency;

  // Construct the locale using the country code
  const locale = `${countryCode.toLowerCase()}-${countryCode.toUpperCase()}`;

  // Format the price using the retrieved currency and locale
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};