const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('sequelize');
const db = require('./config/db');

// // import models
// const User = require('./Models/User')(sequelize, sequelize.DataTypes)
// const Transaction = require('./Models/Transaction');

const app = express();
app.use(morgan('tiny'));

// express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// connect db
db.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});
// User.sync();
// Transaction.sync();

module.exports = app;
