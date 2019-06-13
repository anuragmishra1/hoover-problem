'use strict';

const express = require('express');
const bodyParser = require('body-parser');

require('./DBConnector');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception: ', err);
    process.exit(1);
});
