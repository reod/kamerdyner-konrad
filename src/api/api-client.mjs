import axios from "axios";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export async function callSendAPI(senderPsid, response) {
  let request_body = {
    recipient: {
      id: senderPsid
    },
    message: response
  };

  const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  await axios.post(url, request_body);
}
