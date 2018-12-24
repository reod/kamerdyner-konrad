import { getEasterOfYear } from "./holidays";
import {
  extractHolidayInfo,
  requestingMovableHolidaysForYear,
  requestingAllHolidaysForYear
} from "./index";

import test from "tape";

test("getEasterOfYear", t => {
  const easterIn1989 = getEasterOfYear(1989);
  t.equal(easterIn1989.getMonth(), 2);
  t.equal(easterIn1989.getDate(), 26);

  const easterIn2010 = getEasterOfYear(2010);
  t.equal(easterIn2010.getMonth(), 3);
  t.equal(easterIn2010.getDate(), 4);

  const easterIn2034 = getEasterOfYear(2034);
  t.equal(easterIn2034.getMonth(), 3);
  t.equal(easterIn2034.getDate(), 9);
  t.end();
});

test("extractHolidayInfo", t => {
  const currentEaster = extractHolidayInfo("wielkanoc");
  t.equal(currentEaster.name, "wielkanoc");
  t.equal(currentEaster.year, new Date().getFullYear());

  const nextYear = new Date().getFullYear() + 1;
  const nextEaster = extractHolidayInfo(`wielkanoc ${nextYear}`);
  t.equal(nextEaster.name, "wielkanoc");
  t.equal(nextEaster.year, nextYear);

  const currentFatThursday = extractHolidayInfo("tłusty czwartek");
  t.equal(currentFatThursday.name, "tłusty czwartek");
  t.equal(currentFatThursday.year, new Date().getFullYear());

  const nextFatThursday = extractHolidayInfo(`tłusty czwartek ${nextYear}`);
  t.equal(nextFatThursday.name, "tłusty czwartek");
  t.equal(nextFatThursday.year, nextYear);

  t.end();
});

test("requestingMovableHolidaysForYear", t => {
  t.equal(requestingMovableHolidaysForYear("święta 2019"), true);
  t.equal(requestingMovableHolidaysForYear("święta wszystkie"), false);
  t.equal(requestingMovableHolidaysForYear("święta 019"), false);
  t.equal(requestingMovableHolidaysForYear("święta "), false);
  t.end();
});

test("requestingAllHolidaysForYear", t => {
  t.equal(requestingAllHolidaysForYear("święta wszystkie 2019"), true);
  t.equal(requestingAllHolidaysForYear("wszystkie święta 2019"), true);
  t.equal(requestingAllHolidaysForYear("święta nasze 2013"), false);
  t.equal(requestingAllHolidaysForYear("święta 019"), false);
  t.equal(requestingAllHolidaysForYear("święta "), false);
  t.end();
});
