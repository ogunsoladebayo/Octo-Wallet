const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			identifier: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: sequelize.Sequelize.UUIDV4,
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
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				set(value) {
					const salt = bcrypt.genSaltSync(10);
					const password = bcrypt.hashSync(value, salt);
					this.setDataValue('password', password);
				}
			},
			resetPasswordToken: {
				type: DataTypes.STRING,
				set(value) {
					// Hash token and set to resetPasswordToken field
					const resetPasswordToken = crypto
						.createHash('sha256')
						.update(value)
						.digest('hex');
					this.setDataValue('resetPasswordToken', resetPasswordToken);
					// Set expire
					this.setDataValue(
						'resetPasswordExpire',
						Date.now() + 10 * 60 * 1000
					);
				}
			},
			resetPasswordExpire: {
				type: DataTypes.DATE
			},
			bitcoinWalletId: {
				type: DataTypes.STRING
			},
			bitcoinWalletBalance: {
				type: DataTypes.FLOAT,
				validate: {
					max: 1
				}
			},
			ethereumWalletId: {
				type: DataTypes.STRING
			},
			ethereumWalletBalance: {
				type: DataTypes.FLOAT,
				validate: {
					max: 1
				}
			},
			MaxTransactionAmount: {
				type: DataTypes.INTEGER
			}
		},
		{
			getterMethods: {
				signJwt() {
					return jwt.sign(
						{ id: this.identifier },
						process.env.JWT_SECRET,
						{
							expiresIn: process.env.JWT_EXPIRE
						}
					);
				}
			}
		}
	);
	// User.sync()
	// 	.then(() => console.log('synced Users'))
	// 	.catch((err) => console.log(err));

	return User;
};
