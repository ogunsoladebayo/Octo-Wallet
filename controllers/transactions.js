const { fork } = require('child_process');
const db = require('../models');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const transaction_processor = fork('./transaction-processor.js');

exports.submit = asyncHandler(async (req, res, next) => {
	const {
		sourceUserId,
		walletAddress,
		currencyAmount,
		currencyType
	} = req.body;
	if ((sourceUserId || walletAddress || currencyAmount, currencyType)) {
		return next(
			new ErrorResponse('Please provide all transaction details', 400)
		);
	}
	// get target user id from wallet address
	let targetUserId;
	if (currencyType === 'bitcoin') {
		const user = await db.User.findOne({
			where: { bitcoinWalletId: walletAddress }
		});
		targetUserId = user.id;
	}
	if (currencyType === 'ethereum') {
		const user = await db.User.findOne({
			where: { ethereumWalletId: walletAddress }
		});
		targetUserId = user.id;
	}
	if (!targetUserId) {
		return next(
			new ErrorResponse('wallet not found for this address', 401)
		);
	}
	req.body.targetUserId = targetUserId;
	const transaction = await db.Transaction.create({ ...req.body });
	transaction_processor.send(transaction);
	res.status(201).json({
		success: true,
		message: 'Transaction submitted successfully',
		transaction
	});
});
