const axios = require("axios");
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

const keys = require("../config/keys");
const Twitter = require("twitter");
const client = new Twitter(keys.twitter);

var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require("path");

async function getNewsArticles(query, from) {
  return new Promise((resolve, reject) => {
    let params = {
      q: query,
      from: from,
      apiKey: keys.news.key
    }
    axios.get(
        'https://newsapi.org/v2/everything', {
          params: params
        })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
      .then(() => {})
  });
}

async function getTweetsFromUser(username, count) {
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

async function getTwitterProfilePicture(username) {
  return new Promise(async (resolve, reject) => {
    let options = {
      screen_name: username
    };
    client.get('users/show', options, (err, data) => {
      if(err) return reject(err);
      let url = data.profile_image_url_https;
      url = url.replace("normal", "bigger");
      resolve({image: url});
    });
  })
}

async function getScoreFromNews(array) {
  return new Promise((resolve, reject) => {
    let analyzedArr = [];
    let totalScore = 0;
    array.forEach(value => {
      let num = 2;
      console.log(value);
      let descSentiment, titleSentiment;
      if(!value.description) {
        descSentiment = {score: 0};
        num = 1;
      } else {
        descSentiment = sentiment.analyze(value.description);
      }
      if(!value.title) {
        titleSentiment = {score: 0};
        num = 1;
      } else {
        titleSentiment = sentiment.analyze(value.title);
      }
      let thisScore = (descSentiment.score + titleSentiment.score) / num;
      totalScore += thisScore;
      analyzedArr.push({
        "title": value.title,
        "description": value.description,
        "score": thisScore
      });
    })
    return resolve({
      totalScore: totalScore,
      articles: analyzedArr
    });
  });
}

async function getScoreFromTweets(array) {
  return new Promise((resolve, reject) => {
    let analyzedArr = [];
    let totalScore = 0;
    array.forEach(value => {
      let text = value.text;
      let tweetSentiment = sentiment.analyze(text);
      totalScore += tweetSentiment.score;
      analyzedArr.push({
        text: text,
        score: tweetSentiment.score
      });
    });
    resolve({
      totalScore: totalScore,
      tweets: analyzedArr
    });
  })
}

async function getPolitician(name) {
  let names = JSON.parse(await fs.readFileAsync(path.join(__dirname, "../data/names.json")));
  let social = JSON.parse(await fs.readFileAsync(path.join(__dirname, "../data/social.json")));
  politicianList = [];
  finalList = [];
  names.forEach(value => {
    let currentName = value.name.official_full;
    let currentParty = value.terms[value.terms.length - 1].party;
    let currentState = value.terms[value.terms.length - 1].state;
    if (currentName.toLowerCase().indexOf(name.toLowerCase()) == 0) {
      politicianList.push({
        name: currentName,
        id: value.id.bioguide,
        dob: value.bio.birthday,
        party: currentParty,
        state: currentState
      });
    }
  });
  politicianList.forEach(value => {
    social.forEach(socialValue => {
      socialID = socialValue.id.bioguide;
      if (socialID == value.id) {
        finalList.push({
          name: value.name,
          twitter: socialValue.social.twitter,
          id: value.id,
          dob: value.dob,
          party: value.party,
          state: value.state
        });
      }
    });
  });
  return finalList;
}

module.exports = {
  getNewsArticles: getNewsArticles,
  getTweetsFromUser: getTweetsFromUser,
  getScoreFromNews: getScoreFromNews,
  getScoreFromTweets: getScoreFromTweets,
<<<<<<< HEAD
  getPolitician: getPolitician
}
=======
  getPolitician: getPolitician,
  getTwitterProfilePicture: getTwitterProfilePicture
}
>>>>>>> e75564d14bc56103472d21362ab818f812d085ab
