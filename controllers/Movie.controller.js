'use strict';

const MovieModelData = require('../models/Movie.model');
const axios = require('axios');

let handleMovies = async (req, res) => {
  let place = req.query.place;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query='${place}'`;
  let themoviedbResponse = await axios.get(url);
  let modeledResponse = themoviedbResponse.data.results.map(item=>{
    return new MovieModelData (item.title,item.overview,item.vote_average,item.vote_count,item.backdrop_path,item.popularity,item.release_date);
  });

  res.status(200).json(modeledResponse);
};

module.exports = handleMovies;
