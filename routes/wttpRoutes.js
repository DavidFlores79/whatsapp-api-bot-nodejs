const express = require('express');
const wtppController = require('../controllers/wttpController');
const api = express.Router();
const multiparty = require('connect-multiparty');
const path = multiparty({uploadDir: './uploads'});

api.get('/get_conversations', wtppController.getConversations);
api.get('/conversations/:id/messages', wtppController.getMessages);
api.post('/send', wtppController.sendMessage);
api.post('/upload_file', path, wtppController.uploadFile);
api.get('/get_resource/:name', path, wtppController.getResource);

module.exports = api;