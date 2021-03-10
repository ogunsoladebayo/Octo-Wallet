const express = require('express');

const { submit } = require('../controllers/transactions');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/submit', protect, submit);

module.exports = router;
