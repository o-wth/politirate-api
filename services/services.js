const axios = require("axios");
const Sentiment = require("sentiment");
const sentiment = Sentiment();

const keys = require("../config/keys");
const client = new Twitter(keys.twitter);

function getNewsArticles(query, from) {
  return new Promise((resolve, reject) => {
    let params = {
      q: query,
      from: from,
      apiKey: keys.news.key
    }
    axios.get(
      'https://newsapi.org/v2/everything',
      params
    )
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(error);
      })
      .then(() => {})
  });
}

function getTweetsFromUser(username, count) {
  return new Promise(async (resolve, reject) => {
    let options = { 
      screen_name: username, 
      count: count, 
      exclude_replies: true
    }
    client.get('statuses/user_timeline.json', options, (err, tweets, response) => {
      if (err) return reject(err);
      let tweets_arr = []
      tweets.forEach(object => {
        tweets_arr.push(object);
      });
      return resolve(tweets_arr);
    });
  });
}

function getScoreFromArray(array) {
  return new Promise((resolve, reject) => {
    let array = [];
    array.forEach(value => {
      let score = sentiment.analyze(value);
      analyzedArr.add({"text": value, "score": value});
    })
    return analyzedArr;
  });
}
