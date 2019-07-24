const express = require('express');
const app = express();
const port = 9898;
const bodyParser = require('body-parser');
const cors = require('./lib/cors');

app.use(bodyParser.json());
app.use(cors);
app.use((req, res, next) => {
	console.log(`${req.method.toUpperCase()} ${req.path}`);
	next();
});

app.use('/contacts', require('./contacts'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));