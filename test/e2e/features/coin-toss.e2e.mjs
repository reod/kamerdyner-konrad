import {
  getRunningApp,
  getHttpClient,
  createMessage
} from "./../../e2e/e2e-utils";
import tape from "tape";

const httClient = getHttpClient();

tape("moneta", async t => {
  const appInstance = await getRunningApp();
  const { status, data } = await httClient.post(
    "/webhook",
    createMessage({ message: "moneta" })
  );

  t.equal(status, 200);
  t.ok(["orzeł", "reszka"].includes(data.response.text));

  await appInstance.close();

  t.end();
});
