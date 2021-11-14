const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('sequelize');

const errorHandler = require('./middleware/error');
const auth = require('./routes/auth');
const accounts = require('./routes/accounts');
const transactions = require('./routes/transactions');

const app = express();
app.use(morgan('tiny'));

// express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// mount routes
app.use('/api/auth', auth);
app.use('/api/accounts', accounts);
app.use('/api/transactions', transactions);

app.use(errorHandler);

module.exports = app;
