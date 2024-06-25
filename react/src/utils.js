const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const openingDays = (excludedDays) => {
  const openingDays = weekDays.filter((day) => !excludedDays.includes(day));
  return {fromTo: [openingDays.at(0), openingDays.at(openingDays.length - 1)], days: openingDays};
};
