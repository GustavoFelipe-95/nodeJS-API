const express = require('express');
const app = express();

const mongoose = require('mongoose');

const parkingRoutes    = require('./routes/parkingRoutes');

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT } = process.env;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/parking', parkingRoutes);

mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    { useNewUrlParser: true, }
)
.then(() => {
    app.listen(SERVER_PORT);
})
.catch((err) => console.log(err))