const express = require('express');

const app = express();

const { getDataHandler } = require('../actions/data');

app.get('/getData', getDataHandler);

module.exports = app;