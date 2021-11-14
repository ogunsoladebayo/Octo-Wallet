const express = require('express');
const {
	register,
	login,
	updatePassword,
	forgotPassword,
	resetPassword,
	getMe
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/updatepassword', updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/getme', protect, getMe);

module.exports = router;
