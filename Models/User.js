module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			identifier: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING(512),
				allowNull: false
			},
			description: {
				type: DataTypes.STRING(1000)
			},
			emailAddress: {
				type: DataTypes.STRING(),
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			bitcoinWalletId: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4
			},
			bitcoinWalletBalance: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
				validate: {
					max: 1
				}
			},
			ethereumWalletId: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4
			},
			ethereumWalletBalance: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
				validate: {
					max: 1
				}
			},
			MaxTransactionAmount: {
				type: DataTypes.INTEGER
			}
		},
		{ model: 'User', tableName: 'users' }
	);

	User.associate = (models) => {
		User.hasMany(models.Transaction, {
			foreignKey: 'transactionId'
		});
	};
	return User;
};
