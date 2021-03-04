const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const db = require('../models');

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
	const user = await db.User.create({ ...req.body });
	res.status(201).json({
		success: true,
		message: 'user details registered successfully',
		token: user.signJwt
	});
});

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate emil & password
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide an email and password', 400)
		);
	}

	// Check for user
	const user = await db.User.findOne({ email });

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if password matches
	const isMatch = bcrypt.compareSync(password, user.password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	res.status(201).json({
		success: true,
		token: user.signJwt
	});
});

// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});

	res.status(200).json({
		success: true,
		data: {}
	});
});

// @desc      Update password
// @route     PUT /api/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await db.User.findByPk(req.user.id);

	// Check current password
	if (!(await bcrypt.compareSync(req.body.currentPassword, user.password))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	res.status(200).json({
		success: true,
		message: 'Password successfully updated.'
	});
});

// @desc      Forgot password
// @route     POST /api/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await db.User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	// Generate and hash password token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Get reset token
	user.resetPasswordToken = resetToken;

	await user.save();

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/auth/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.emailAddress,
			subject: 'Password reset token',
			message
		});

		res.status(200).json({ success: true, data: 'Email sent' });
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = '';
		user.resetPasswordExpire = Date.now();

		await user.save();

		return next(new ErrorResponse('Email could not be sent', 500));
	}
});

// @desc      Reset password
// @route     PUT /api/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	if (!req.params.resettoken) {
		return next(new ErrorResponse('Please provide token'), 401);
	}
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await db.User.findOne({
		resetPasswordToken
	});
	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// check if token is not expired
	if (user.resetPasswordExpire < Date.now()) {
		return next(new ErrorResponse('Token expired, please try again', 400));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = '';
	user.resetPasswordExpire = Date.now();
	await user.save();

	res.status(201).json({
		success: true,
		token: user.signJwt
	});
});

// @desc      Get current logged in user
// @route     GET /api/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = req.user;

	res.status(200).json({
		success: true,
		data: user
	});
});
