const db = require('./models');

const transactions = [
	// '01bcbde7-0be2-456c-a286-2b87cbdb0acb'
	// '0dff72be-deb2-4b3d-bf9a-2c1b17ee0590',
	// '2fe9a417-23e8-41a8-b741-e7a1b7f01f70',
	// '3d55117d-8c3e-4fbd-a22d-4052e0ac49d2',
	// '595c6057-a1b9-4707-8163-873f1437e742',
	// '704ffc1c-076c-49a5-92a4-68805ac35123',
	// '739f2b15-5fe7-4d20-8eef-739e1a0a03da',
	// '7e86d01d-9af5-456d-ad32-024768529947',
	// '83408f31-9552-41d1-959d-edb18f2e35ca',
	// '92466aad-0274-44b8-8db6-cbcdbd6e37b8',
	// '99e89fe9-8760-4a40-a56a-49a0715c7f8f',
	// 'ab1e1827-6a4c-46d0-b07c-275f91b20e37',
	// 'ab554388-bbf3-4e52-9ced-0cc1c919f891',
	// 'ad45eb0e-6ddd-4062-bca3-6495d226a38b',
	// 'e6addab2-b5a9-447f-a8b8-88e5dfb05bc7',
	// 'ea9a84b2-c48a-40b9-90ba-7b5a7c1964e3',
	// 'f4efea6c-7f41-4e3b-ab9b-aa4a91196bf4'
];

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
