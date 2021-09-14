'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weather = require('./data/weather.json');
const PORT = process.env.PORT;
const axios = require('axios');

let truncate = (num) => Math.trunc(num * 100) / 100;

app.get('/', (req, res) => {
  let lat = truncate(Number(req.query.lat));
  let lon = truncate(Number(req.query.lon));
  let resultFound = false;
  let result = [];
  for (let i = 0; i < weather.length; i++) {
    if (lat === Number(weather[i].lat) && lon === Number(weather[i].lon)) {
      resultFound = true;
      for (let j = 0; j < weather[i].data.length; j++) {
        result[j] = {
          date: weather[i].data[j].valid_date,
          description: weather[i].data[j].weather.description,
        };
      }
      console.log('anything');

      res.status(200).json(result);
    }
    // else{
    //   res.status(400).send("Please enter Amman,Paris, or Seatle");
    // }
  }
  if (resultFound === false) {
    res
      .status(400)
      .send({ message: 'weather forecast is not available for this place' });
  }
});



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

app.get('/weather', handleWeather);

class WeatherModelData {
  constructor(date,description){
    this.date = date;
    this.description = description;
  }
}

let handleMovies = async (req, res) => {
  let place = req.query.place;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query='${place}'`;
  let themoviedbResponse = await axios.get(url);
  let modeledResponse = themoviedbResponse.data.results.map(item=>{
    return new MovieModelData (item.title,item.overview,item.vote_average,item.vote_count,item.backdrop_path,item.popularity,item.release_date);
  });

  res.status(200).json(modeledResponse);
};

app.get('/movies', handleMovies);

class MovieModelData{
  constructor (title,overView,averageVotes,totalVotes,imageURL,popularity,releasedOn){
    this.title = title;
    this.overview = overView;
    this.average_votes = averageVotes;
    this.total_votes = totalVotes;
    this.image_URL =imageURL;
    this.popularity =popularity;
    this.released_on = releasedOn;
  }
}

app.listen(PORT, () => {});
