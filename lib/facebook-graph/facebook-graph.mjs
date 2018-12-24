export default ({ httpClient, pageAccessToken }) => {
  const apiUrl = `https://graph.facebook.com/v2.6/me/messages?access_token=${pageAccessToken}`;

  return {
    sendMessage(senderPsid, message) {
      const requestBody = {
        recipient: { id: senderPsid },
        message
      };

      return httpClient.post(apiUrl, requestBody);
    }
  };
};
