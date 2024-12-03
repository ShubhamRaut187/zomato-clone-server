require('dotenv').config();

const mongoose = require('mongoose');

const databaseConnection = mongoose.connect(process.env.DBCONNECTIONSTRING);

module.exports = { databaseConnection };