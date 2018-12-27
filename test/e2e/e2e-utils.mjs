import axios from "axios";
import app from "./../../src/http";
import di from "./../../di";

export async function getRunningApp({ port = process.env.PORT } = {}) {
  return new Promise(resolve => {
    const appInstance = app({
      landingController: di.get("landingController"),
      getWebhookController: di.get("getWebhookController"),
      postWebhookController: di.get("postWebhookController"),
      errorHandler: di.get("errorHandler"),
      onErrorListener: di.get("onErrorListener")
    }).listen(port, () => {
      resolve(appInstance);
    });
  });
}

export function getHttpClient({
  protocol = "http",
  host = process.env.HOST,
  port = process.env.PORT
} = {}) {
  return axios.create({
    baseURL: `${protocol}://${host}:${port}`
  });
}

export function createMessage({ message, senderId = +new Date() } = {}) {
  return {
    object: "page",
    entry: [
      {
        messaging: [
          {
            sender: {
              id: senderId
            },
            message: {
              text: message
            }
          }
        ]
      }
    ]
  };
}
