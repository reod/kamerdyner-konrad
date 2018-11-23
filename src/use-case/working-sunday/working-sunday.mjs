export function handleQuestionAboutWorkingSunday(date = new Date()) {
  if (!isSunday(date)) {
    return `Dzisiaj nie jest niedziela. Za to najblisza jest ${getSundayLabel(
      date
    )}`;
  }

  return getSundayLabel(date);
}

export function getSundayLabel(date) {
  return isWorkingSunday(date) ? "handlowa" : "niehandlowa";
}

export function isWorkingSunday(date) {
  const workingSundays = {
    8: [2, 30],
    9: [7, 28],
    10: [4, 25],
    11: [2, 16, 23, 30]
  };

  const month = date.getMonth();
  const day = date.getDate();

  if (workingSundays[month]) {
    return workingSundays[month].includes(day);
  }

  return false;
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
