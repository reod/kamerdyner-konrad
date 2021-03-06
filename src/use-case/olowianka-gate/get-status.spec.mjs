import { createDateFromHM } from "./../../../lib/date-utils";
import {
  displayDownHours,
  isDownPeriod,
  getDownTimeLeft,
  getUpTimeLeft,
  isDownSeason,
  getGateStatus
} from "./gate-status";

import test from "tape";

test("displayDownHours", t => {
  const now = new Date();
  const status = displayDownHours(now);

  t.equal(
    status,
    `Kładka opuszona o godzinach:
  00:00 - 07:00
  07:30 - 08:00
  08:30 - 09:00
  09:30 - 10:00
  10:30 - 11:00
  11:30 - 12:00
  12:30 - 13:00
  13:30 - 14:00
  14:30 - 15:00
  15:30 - 16:00
  16:30 - 17:00
  17:30 - 18:00
  18:30 - 19:00
  19:30 - 20:00
  20:30 - 21:00
  21:30 - 22:00
  22:30 - 23:00
  23:30 - 00:00`
  );
  t.end();
});

test("isDownPeriod", t => {
  const dateDuringDownPeriod = createDateFromHM(7, 42);
  const resultForDownPeriod = isDownPeriod(dateDuringDownPeriod);
  t.equal(resultForDownPeriod, true);

  const dateNotDuringDownPeriod = createDateFromHM(19, 15);
  const resultForNotDownPeriod = isDownPeriod(dateNotDuringDownPeriod);
  t.equal(resultForNotDownPeriod, false);

  const nightDate = createDateFromHM(1, 15);
  const resultForNightDate = isDownPeriod(nightDate);
  t.equal(resultForNightDate, true);

  t.end();
});

test("getDownTimeLeft", t => {
  const dateWithSevenMinutesLeft = createDateFromHM(7, 53);
  const sevenMinutes = 1000 * 60 * 7;
  t.equal(getDownTimeLeft(dateWithSevenMinutesLeft), sevenMinutes);

  const dateWithSixHoursLeft = createDateFromHM(1, 0);
  const sixHours = 1000 * 60 * 60 * 6;
  t.equal(getDownTimeLeft(dateWithSixHoursLeft), sixHours);

  t.end();
});

test("getUpTimeLeft", t => {
  const dateWithTenMinutesLeft = createDateFromHM(16, 20);
  const tenMinutes = 1000 * 60 * 10;
  t.equal(getUpTimeLeft(dateWithTenMinutesLeft), tenMinutes);

  const dateWithOneMinutesLeft = createDateFromHM(23, 29);
  const oneMinute = 1000 * 60 * 1;
  t.equal(getUpTimeLeft(dateWithOneMinutesLeft), oneMinute);

  t.end();
});

test("isDownSeason", t => {
  t.equal(isDownSeason(new Date(2019, 0, 10)), true);
  t.equal(isDownSeason(new Date(2019, 1, 28)), true);
  t.equal(isDownSeason(new Date(2019, 3, 1)), false);
  t.equal(isDownSeason(new Date(2019, 5, 23)), false);
  t.equal(isDownSeason(new Date(2019, 9, 31)), false);
  t.equal(isDownSeason(new Date(2019, 9, 31)), false);
  t.equal(isDownSeason(new Date(2019, 10, 1)), true);
  t.equal(isDownSeason(new Date(2019, 10, 2)), true);

  t.end();
});

test("getGateStatus", t => {
  t.equal(
    getGateStatus(new Date(2019, 0, 10)),
    "o tej porze roku kładka jest opuszczona cały czas."
  );
  t.equal(
    getGateStatus(new Date(2019, 1, 28)),
    "o tej porze roku kładka jest opuszczona cały czas."
  );
  t.equal(
    getGateStatus(new Date(2019, 3, 1, 7, 35)),
    "kładka jest opuszczona. masz jeszcze 25 minut."
  );
  t.equal(
    getGateStatus(new Date(2019, 4, 2, 9, 15)),
    "kładka jest podniesiona. otworzą za 15 minut."
  );
  t.equal(
    getGateStatus(new Date(2019, 10, 1)),
    "o tej porze roku kładka jest opuszczona cały czas."
  );
  t.equal(
    getGateStatus(new Date(2019, 10, 2)),
    "o tej porze roku kładka jest opuszczona cały czas."
  );

  t.end();
});
