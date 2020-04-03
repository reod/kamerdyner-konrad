import test from "tape";
import {
  handleQuestionAboutWorkingSunday,
  isWorkingSunday,
  isSunday,
  getNextSunday
} from "./working-sunday";

test("isWorkingSunday", t => {
  const dateOfNotWorkingSunday = new Date();
  dateOfNotWorkingSunday.setFullYear(2018);
  dateOfNotWorkingSunday.setMonth(10);
  dateOfNotWorkingSunday.setDate(18);

  t.equal(isWorkingSunday(dateOfNotWorkingSunday), false);

  const dateOfWorkingSunday = new Date();
  dateOfWorkingSunday.setFullYear(2020);
  dateOfWorkingSunday.setMonth(3);
  dateOfWorkingSunday.setDate(5);

  t.equal(isWorkingSunday(dateOfWorkingSunday), true);

  const dateOfUnknownSunday = new Date();
  dateOfUnknownSunday.setFullYear(2022);
  dateOfUnknownSunday.setMonth(1);
  dateOfUnknownSunday.setDate(2);

  t.throws(() => {
    isWorkingSunday(dateOfUnknownSunday);
  }, /Unknown sunday/);
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
  workingSundayDate.setDate(4);

  const msgForWorkingSunday = handleQuestionAboutWorkingSunday(
    workingSundayDate
  );
  const expectedMsgForWorkingSunday = "handlowa";
  t.equal(msgForWorkingSunday, expectedMsgForWorkingSunday);

  const notWorkingSundayDate = new Date();
  notWorkingSundayDate.setFullYear(2018);
  notWorkingSundayDate.setMonth(10);
  notWorkingSundayDate.setDate(11);

  const msgForNotWorkingSunday = handleQuestionAboutWorkingSunday(
    notWorkingSundayDate
  );
  const expectedMsgForNotWorkingSunday = "niehandlowa";
  t.equal(msgForNotWorkingSunday, expectedMsgForNotWorkingSunday);

  const notSundayDateButNearestSundayWorking = new Date();
  notSundayDateButNearestSundayWorking.setFullYear(2019);
  notSundayDateButNearestSundayWorking.setMonth(1);
  notSundayDateButNearestSundayWorking.setDate(20);

  const msgForNotSundayButNearestSundayWorking = handleQuestionAboutWorkingSunday(
    notSundayDateButNearestSundayWorking
  );
  const expectedMsgForNotSundayWithNearestSundayWorking =
    "Dzisiaj nie jest niedziela. Za to najblisza jest handlowa";
  t.equal(
    msgForNotSundayButNearestSundayWorking,
    expectedMsgForNotSundayWithNearestSundayWorking
  );

  const notSundayDateButNearestSundayNotWorking = new Date();
  notSundayDateButNearestSundayNotWorking.setFullYear(2019);
  notSundayDateButNearestSundayNotWorking.setMonth(0);
  notSundayDateButNearestSundayNotWorking.setDate(28);

  const msgForNotSundayButNearestSundayNotWorking = handleQuestionAboutWorkingSunday(
    notSundayDateButNearestSundayNotWorking
  );
  const expectedMsgForNotSundayAndNearestSundayNotWorking =
    "Dzisiaj nie jest niedziela. Za to najblisza jest niehandlowa";
  t.equal(
    msgForNotSundayButNearestSundayNotWorking,
    expectedMsgForNotSundayAndNearestSundayNotWorking
  );

  t.end();
});
