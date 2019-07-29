const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('./lib/cors');

app.use(bodyParser.json());
app.use(cors);
app.use((req, res, next) => {
	console.log(`${req.method.toUpperCase()} ${req.path}`);
	next();
});

app.use('/contacts', require('./contacts'));

module.exports = app;
