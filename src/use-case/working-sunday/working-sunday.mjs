import workingSundays from "./working-sundays-by-year";

export function handleQuestionAboutWorkingSunday(date = new Date()) {
  if (!isSunday(date)) {
    return `Dzisiaj nie jest niedziela. Za to najblisza jest ${getSundayLabel(
      getNextSunday(date)
    )}`;
  }

  return getSundayLabel(date);
}

export function getSundayLabel(date) {
  return isWorkingSunday(date) ? "handlowa" : "niehandlowa";
}

export function isWorkingSunday(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (!workingSundays[year] || !workingSundays[year][month]) {
    throw new Error("Unknown sunday.");
  }

  const day = date.getDate();
  const testedMonth = workingSundays[year][month];

  return testedMonth.includes(day);
}

export function isSunday(date) {
  return date.getDay() === 0;
}

export function getNextSunday(date) {
  const sundayDate = new Date(date);

  while (!isSunday(sundayDate)) {
    sundayDate.setDate(sundayDate.getDate() + 1);
  }

  return sundayDate;
}
