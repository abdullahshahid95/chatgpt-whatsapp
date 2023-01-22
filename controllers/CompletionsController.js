const { getCompletion } = require("../api/completion");
const { sendMessage } = require("../api/whatsapp");

const { WHATSAPP_WEBHOOK_VERIFICATION_TOKEN } = process.env;

const verifyWebhook = async (req, res) => {
  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === WHATSAPP_WEBHOOK_VERIFICATION_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).type("text/plain").send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

const receiveMessage = async (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      // let phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let messageText = body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

      const completionesponse = await getCompletion(messageText);

      await sendMessage(from, completionesponse.data.choices[0].text);
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
};

module.exports = {
  verifyWebhook,
  receiveMessage,
};
