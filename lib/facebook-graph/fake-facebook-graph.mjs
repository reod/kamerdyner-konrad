export default (httpClient, pageAccessToken) => ({
  async sendMessage(senderPsid, response) {
    return {
      status: 200,
      config: {
        data: {
          response,
        }
      }
    }
  }
})