const express = require('express');
const {
	register,
	login,
	getMe,
	updatePassword,
	forgotPassword
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/updatepassword', updatePassword);
router.post('/forgotpassword', forgotPassword);
// router.get('/getme',  getMe);

module.exports = router;
