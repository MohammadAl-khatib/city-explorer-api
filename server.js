'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weather = require('./data/weather.json');
const PORT = process.env.PORT;

let truncate = (num)=>Math.trunc(num*100)/100;

app.get('/weather', (req, res) => {
  let lat = truncate(Number(req.query.lat));
  let lon = truncate(Number(req.query.lon));
  let result = [];
  for (let i = 0; i < weather.length; i++) {
    if (lat === Number(weather[i].lat) && lon === Number(weather[i].lon)) {
      for (let j = 0; j < weather[i].data.length; j++) {
        result[j] = {
          date: weather[i].data[j].valid_date,
          description: weather[i].data[j].weather.description,
        };
      }
      res.status(200).json(result);
    }
    // else{
    //   res.status(400).send("Please enter Amman,Paris, or Seatle");
    // }
  }
});

app.listen(PORT, () => {});
