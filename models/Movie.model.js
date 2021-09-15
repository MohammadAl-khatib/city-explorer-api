'use strict';

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

module.exports=MovieModelData;
