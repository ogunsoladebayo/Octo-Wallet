const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../models');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		// Make sure token exists
		if (!token) {
			return next(new ErrorResponse('Not authorized, No token!', 401));
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await db.User.findByPk(decoded.id);
		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorized!', 401));
	}
});
