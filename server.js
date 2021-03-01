const app = require('./app');

// Port Normalization
const normalizePort = (val) => {
	const port = parseInt(val, 10);
	if (!Number.isNaN(port)) {
		return val;
	}

	if (port > 0) {
		return port;
	}

	return false;
};
// set the port
const port = normalizePort(
	process.env.NODE_ENV === 'deployment' ? process.env.PORT : '3000'
);

// create a http server
const server = app.listen(port, () => {
	const address = server.address();
	const bind = typeof host === 'string' ? `pipe ${address}` : `port: ${port}`;
	// eslint-disable-next-line no-console
	console.log(`listening on ${bind}`);
});
