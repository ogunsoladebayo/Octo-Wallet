const { addAccount } = require('../controllers/accounts');
const { protect } = require('../middleware/auth');
const express = require('express');

const router = express.Router();

router.post('/add', protect, addAccount);

module.exports = router;
