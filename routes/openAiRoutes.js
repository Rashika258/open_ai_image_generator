const express = require('express');
const { generateImage } = require('../controllers/openAiController');
const imagerouter = express.Router();

imagerouter.post('/generateImage', generateImage);

module.exports = imagerouter;