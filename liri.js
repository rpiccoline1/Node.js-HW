require("dotenv").config();


var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var twitter = require("twitter");
var fs = require("fs");

var userInput = process.argv[2];

var userSearch = process.argv[3];

for (i = 4; i < process.argv.length; i++) {
  userSearch += " " + process.argv[i];
}

function nintendoSwitch() {
  switch (userInput) {

    case "movie-this":
      grabMovie();
      break;

    case "my-tweets":
      grabTweets();
      break;

    case "spotify-this-song":
      grabSpotify();
      break;

    case "do-what-it-says":
      randomness();
      break;
  }
};

function grabMovie() {

  var userMovieQuery;

  if (userSearch === "") {
    userMovieQuery = "Mr. Nobody";
  } else {
    userMovieQuery = userSearch;
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + userMovieQuery + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log(`
    Title: ${JSON.parse(body).Title}
    Release Date: ${JSON.parse(body).Year}
    IMDB Rating: ${JSON.parse(body).imdbRating}
    Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1]}
    Production Country: ${JSON.parse(body).Production}
    Language: ${JSON.parse(body).Country}
    Plot: ${JSON.parse(body).Plot}
    Actors: ${JSON.parse(body).Actors}
    `)
    }
  });
};

function grabSpotify() {

  var spotify = new Spotify(keys.spotify);

  var userSpotifyQuery;

  if (userSearch === "") {
    userSpotifyQuery = "The Sign";
  } else {
    userSpotifyQuery = userSearch;
  }

  spotify.search({ type: 'track', query: userSearch, limit: 1 }, function (err, data) {
    console.log(data);

    if (err) {
      console.log('Error occurred: ' + err);
      return;

    } else {

      console.log(`
      Title: ${userSearch}
      Artist: ${JSON.parse(tracks.items.artists)}
      
      `)
    }
  });
};

function grabTweets() {

  var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {
    screen_name: DefNotReal_pt2,
    count: 20
  };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
};

function randomness() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      console.log(error);
    } else {

      var randomArr = data.split(",");
      userInput = randomArr[0];
      userSearch = randomArr[1];

      for (x = 2; x < randomArr.length; x++)
        userSearch = userSearch + "+" + randomArr[x];
    }
  });
};

nintendoSwitch();