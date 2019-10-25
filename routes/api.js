var express = require('express');
var router = express.Router();

var kue = require("kue");
var services = require('../services/services');

// Create a queue for proessing tasks
let queue = kue.createQueue({
  prefix: 'q',
  redis: {
    host: "localhost",
    port: 6379
  }
});

// Getting the calculated rating for a given name
queue.process('getPoliticians', 5, async (job, done) => {

});

// Getting the calculated rating for a given name
queue.process('getScore', 5, (job, done) => {

});

// Getting news articles, alongside each article's respective score
queue.process('getNewsAndScore', 5, (job, done) => {
  services.getNewsArticles(job.data.query)
    .then((res) => { console.log(res); done(res) })
    .catch(err => { done(new Error(err)) })
});

// Getting tweets, alongside each tweet's respective score
queue.process('getTweetsAndScore', 5, (job, done) => {

});

// Base api route
router.get('/', (req, res, next) => {
  return res.send("Welcome to the API");
});

// Get the name of all politicians
router.get('/get_politicians', async (req, res, next) => {
  let params = req.query;
  if (!params.name)
    res.send({ error: "Please supply a name" });
  let politicanList = await services.getPolitician(params.name);
  console.log(politicanList);
  return res.send(politicanList);
});

// Get's calculated score for name
router.get('/score', async (req, res, next) => {
  let params = req.query;
  if (!params.name)
    return res.json({ error: "No name provided" }).status(400);
  try {
    let politicanList = await services.getPolitician(params.name);
    if(politicanList.length == 0)
      return res.send({error: "Politician not found"});
    let currentPol = politicanList[0];

    let [newsRes, tweetsRes] = await Promise.all([services.getNewsArticles(currentPol.name, params.from),
      services.getTweetsFromUser(currentPol.twitter)]);
    let [newsScores, tweetsScores] = await Promise.all([services.getScoreFromNews(newsRes.data.articles), 
      services.getScoreFromTweets(tweetsRes)]);
    let finalScore = newsScores.totalScore + tweetsScores.totalScore;

    return res.send({ score: finalScore });
  } catch (e) {
    console.log(e);
    return res.send(e).status(400);
  }
});

// Get news and respective score
router.get('/news', async (req, res, next) => {
  let params = req.params;
  if (!params.q)
    return res.send({ error: "Please supply a query in param q" }).status(200);
  try {
    newsRes = await services.getNewsArticles(params.q, params.from);
    scoresWithNews = await services.getScoreFromNews(newsRes.data.articles);
    return res.send(scoresWithNews);
  } catch (e) {
    console.log(e);
    return res.send(e).status(400);
  }
});

// Get tweets and respective score
router.get('/tweets', async (req, res, next) => {
  let params = req.query;
  if (!params.username && !params.name)
    return res.send({ error: "Please supply a username or name" }).status(400);
  try {
    let tweetsRes = await services.getTweetsFromUser(params.username, req.query.count || 30);
    let tweetScores = await services.getScoreFromTweets(tweetsRes);
    return res.send({ tweetScores });
  } catch (e) {
    console.log(e);
    return res.send(e).status(400);
  }
});

module.exports = router; 
