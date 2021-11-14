const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../models');
const bitcoin = require('bitcoin-address-generator');
const ethereumjs = require('ethereumjs-wallet');

exports.addAccount = asyncHandler(async (req, res, next) => {
	const { currency } = req.body;
	if (!currency) {
		return next(new ErrorResponse('No currency specified', 400));
	}

	if (req.user[`${currency}WalletId`]) {
		return next(
			new ErrorResponse('Account already exists for this currency', 401)
		);
	}

	let key;
	switch (currency) {
		case 'ethereum':
			const ethereum = ethereumjs.default.generate();
			req.user.ethereumWalletId = ethereum.getAddressString();
			key = ethereum.getPrivateKeyString();
			break;
		case 'bitcoin':
			bitcoin.createWalletAddress((response) => {
				req.user.bitcoinWalletId = response.address;
				key = response.key;
			});
			break;
		default:
			return next(
				new ErrorResponse(
					'Invalid currency specified, Available options: ethereum, bitcoin',
					400
				)
			);
	}
	await req.user.save();

	res.status(201).json({
		success: true,
		message: `Account successfully created for ${currency} wallet`,
		walletAddress: req.user[`${currency}WalletId`],
		privateKey: key
	});
});
