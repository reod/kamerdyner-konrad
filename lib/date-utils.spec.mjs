import { formatDate } from "./date-utils";

import test from "tape";

test('formatDate', t => {
  t.equal(formatDate(new Date(2018, 0, 1)), '01.01.2018');
  t.end()
})