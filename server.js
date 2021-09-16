'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
const weatherController = require('./controllers/Weather.controller');
const movieController = require('./controllers/Movie.controller');

app.get('/weather', weatherController);
app.get('/movies', movieController);
app.listen(PORT, () => {});

