import { getEasterOfYear } from "./holidays";

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
