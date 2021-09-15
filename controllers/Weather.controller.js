'use strict';

const WeatherModelData = require('../models/Weather.model');
const axios = require('axios');


let handleWeather = async (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
  let weatherbitResponse = await axios.get(url);
  let modeledResponse = weatherbitResponse.data.data.map(item=>{
    return new WeatherModelData (item.datetime,item.weather.description);
  });

  res.status(200).json(modeledResponse);
};

module.exports=handleWeather;
