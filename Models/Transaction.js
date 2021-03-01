module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		'Transaction',
		{
			identifier: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
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
				allowNull: false
			},
			targetUserId: {
				type: DataTypes.UUID,
				allowNull: false
			},
			createdAt: 'TimestampCreated',
			updatedAt: 'TimestampProcessed',
			state: {
				type: DataTypes.STRING
			}
		},
		{ model: 'Teansaction', tableName: 'transactions' }
	);

	Transaction.associate = (models) => {
		Transaction.hasMany(models.User, {
			foreignKey: 'transactionId'
		});
	};
	return User;
};
