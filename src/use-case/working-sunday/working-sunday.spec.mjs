import test from "tape";
import {
  handleQuestionAboutWorkingSunday,
  isWorkingSunday,
  isSunday,
  getNextSunday
} from "./working-sunday";

test("isWorkingSunday", t => {
  const dateOfWorkingSunday = new Date();
  dateOfWorkingSunday.setFullYear(2018);
  dateOfWorkingSunday.setMonth(10);
  dateOfWorkingSunday.setDate(18);

  t.equal(isWorkingSunday(dateOfWorkingSunday), false);

  const dateOfNotWorkingSunday = new Date();
  dateOfNotWorkingSunday.setFullYear(2018);
  dateOfNotWorkingSunday.setMonth(10);
  dateOfNotWorkingSunday.setDate(25);

  t.equal(isWorkingSunday(dateOfNotWorkingSunday), true);
  t.end();
});

test("isSunday", t => {
  const date = new Date();
  date.setFullYear(2018);
  date.setMonth(10);
  date.setDate(18);

  t.equal(isSunday(date), true);

  date.setDate(19);
  t.equal(isSunday(date), false);

  t.end();
});

test("getNextSunday", t => {
  const date = new Date();
  date.setFullYear(2018);
  date.setMonth(10);
  date.setDate(15);

  const nextSunday = getNextSunday(date);
  t.equal(nextSunday.getDate(), 18);

  nextSunday.setDate(19);

  t.equal(getNextSunday(nextSunday).getDate(), 25);
  t.end();
});

test("handleQuestionAboutWorkingSunday", t => {
  const workingSundayDate = new Date();
  workingSundayDate.setFullYear(2018);
  workingSundayDate.setMonth(10);
  workingSundayDate.setDate(18);

  const msgForWorkingSunday = handleQuestionAboutWorkingSunday(
    workingSundayDate
  );
  const expectedMsgForWorkingSunday = "niehandlowa";
  t.equal(msgForWorkingSunday, expectedMsgForWorkingSunday);

  const notWorkingSundayDate = new Date();
  notWorkingSundayDate.setFullYear(2018);
  notWorkingSundayDate.setMonth(10);
  notWorkingSundayDate.setDate(25);

  const msgForNotWorkingSunday = handleQuestionAboutWorkingSunday(
    notWorkingSundayDate
  );
  const expectedMsgForNotWorkingSunday = "handlowa";
  t.equal(msgForNotWorkingSunday, expectedMsgForNotWorkingSunday);

  const notSundayDate = new Date();
  notSundayDate.setFullYear(2018);
  notSundayDate.setMonth(11);
  notSundayDate.setDate(15);

  const msgForNotSunday = handleQuestionAboutWorkingSunday(notSundayDate);
  const expectedMsgForNotSunday =
    "Dzisiaj nie jest niedziela. Za to najblisza jest niehandlowa";
  t.equal(msgForNotSunday, expectedMsgForNotSunday);

  t.end();
});
