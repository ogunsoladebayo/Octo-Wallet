const db = require('../models');

const transactions = [];

process.on('message', (transaction) => {
	// add transaction to transactions array
	transactions.push(transaction);
	// console.log(transactions);
});

// worker loop to synchronously run function
const workerLoop = async () => {
	if (transactions.length === 0) {
		setTimeout(workerLoop, 1000);
		console.log('waiting...');
	} else {
		console.log('processing next...');
		t = transactions.shift();
		// console.log(t);
		const sender = await execute(t);
		console.log('processed sender: ' + sender);
		setTimeout(workerLoop, 1000);
	}
};

// main transaction processing function
const execute = async (transactions) => {
	const sender = await db.User.findByPk(transaction.sourceUserId);
	const receiver = await db.User.findByPk(transaction.targetUserId);

	// check if sender has enough currency type and amount
	if (transaction.currencyAmount > sender[`${currencyType}WalletBalance`]) {
		transaction.state = 'FAILED! NOT ENOUGH BALANCE';
		transaction.save();
	} else {
		sender[`${currencyType}WalletBalance`] -= transaction.currencyAmount;
		receiver[`${currencyType}WalletBalance`] += transaction.currencyAmount;
		transaction.state = 'COMPLETED';
		sender.save();
		receiver.save();
		transaction.save();
	}

	console.log('saved...');
	return sender;
};

workerLoop();
