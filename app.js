const express = require('express');
const app = express();

const employeeRoute = require('./routes/employees');
const protfolioviewRoute = require('./routes/protfolioview');

app.set('view engine', 'ejs');

app.use('/employees', employeeRoute);
app.use('/protfolioview', protfolioviewRoute); 

module.exports = app;