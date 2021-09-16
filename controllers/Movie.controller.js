'use strict';

const MovieModelData = require('../models/Movie.model');
const axios = require('axios');
const Cache = require('../helpers/cache');
let cache = new Cache([]);

let handleMovies = async (req, res) => {
  let place = req.query.place;
  let dateConvert=(date)=> Math.floor(date/1000/60/60/23.993/7); // to convert ms to weeks

  if (cache.data.length > 0 && cache.place === place && cache.date === dateConvert(Date.now())) {
    res.status(200).json(cache);
  } else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query='${place}'`;
    let themoviedbResponse = await axios.get(url);
    let modeledResponse = themoviedbResponse.data.results.map((item) => {
      return new MovieModelData(
        item.title,
        item.overview,
        item.vote_average,
        item.vote_count,
        item.backdrop_path,
        item.popularity,
        item.release_date
      );
    });

    Object.assign(cache,{data:modeledResponse,place:place,date:dateConvert(Date.now())}) ;
    res.status(200).json(modeledResponse);
  }
};

module.exports = handleMovies;
