export function handleQuestionAboutWorkingSunday(date) {
  const today = date || new Date();

  if (today.getDay() !== 0) {
    return `Dzisiaj nie jest niedziela`;
  }

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
