const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:city', authMiddleware, getWeather);

module.exports = router;
