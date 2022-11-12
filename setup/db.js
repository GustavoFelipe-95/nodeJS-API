const mongoose        = require('mongoose');

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    { useNewUrlParser: true, }
);

mongoose.connection.on('error', () => console.log('Connection error:'));
mongoose.connection.once('open', () => console.log('Database connected'));