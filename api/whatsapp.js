const { default: axios } = require("axios");

const {
    WHATSAPP_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID,
  } = process.env,
  url = "https://graph.facebook.com/v12.0/";

const sendMessage = async (to, textMessage) => {
  await axios.post(
    `${url}${WHATSAPP_PHONE_NUMBER_ID}/messages?access_token=${WHATSAPP_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN}`,
    {
      messaging_product: "whatsapp",
      to,
      text: { body: textMessage },
    },
    { "Content-Type": "application/json" }
  );
};

module.exports = {
  sendMessage,
};
