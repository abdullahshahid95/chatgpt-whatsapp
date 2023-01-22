const router = require('express').Router();
const { verifyWebhook, receiveMessage } = require('../controllers/CompletionsController');

router.get('/webhook', verifyWebhook);
router.post('/webhook', receiveMessage);

module.exports = router;