module.exports = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers','Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

	if(req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
};