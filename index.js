const app = require('./server');

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT);