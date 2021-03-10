module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define('Transaction', {
		identifier: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		currencyAmount: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		currencyType: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sourceUserId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'identifier'
			}
		},
		targetUserId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'identifier'
			}
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'PENDING'
		}
	});
	return Transaction;
};
