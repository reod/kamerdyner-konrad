import { getRunningApp, getHttpClient } from "./../../e2e/e2e-utils";
import tape from "tape";

const httClient = getHttpClient();

tape("server launch", async t => {
  const appInstance = await getRunningApp();
  const { status, data } = await httClient.get("/");

  t.equal(status, 200);
  t.equal(data, "nothing to see here");

  await appInstance.close();

  t.end();
});
