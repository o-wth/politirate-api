var express = require('express');
var router = express.Router();

var kue = require("kue");

// Create a queue for proessing tasks
let queue = kue.createQueue({
  prefix: 'q',
  redis: {
    host: localhost,
    port: 6379
  }
});

// Getting the calculated rating for a given name
queue.process('getScore', 5, (name, tweetCount, newsFrom) => {

});

// Getting news articles, alongside each article's respective score
queue.process('getNewsAndScore', 5, (query, newsFrom) => {

});

// Getting tweets, alongside each tweet's respective score
queue.process('getTweetsAndScore', 5, (username, count) => {

});

// Base api route
router.get('/', (req, res, next) => {

});

// Get's calculated score for name
router.get('/score', (req, res, next) => {
  
});

// Get tweets and respective score
router.get('/tweets', (req, res, next) => {
  
});

// Get tweets and respective score
router.get('/tweets', (req, res, next) => {

});

module.exports = router; 