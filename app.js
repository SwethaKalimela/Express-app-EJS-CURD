const express = require('express');
const app = express();

const employeeRoute = require('./routes/employees');
const protfolioviewRoute = require('./routes/protfolioview');

app.set('view engine', 'ejs'); //configure this middleware to use ejs template engine in the app

app.use('/employees', employeeRoute); //configure the employee middleware to define /employee route
app.use('/protfolioview', protfolioviewRoute); //configure the protfolioview middleware to define /protfolioview route

module.exports = app;
