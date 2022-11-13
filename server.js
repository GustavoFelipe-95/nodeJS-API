require("./setup/db");

const express   = require('express');
const app       = express();

const parkingRoutes    = require('./routes/parkingRoutes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/parking', parkingRoutes);

module.exports = app