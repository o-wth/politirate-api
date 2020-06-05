## Setup

-   create `api/endpoints.js` with the following contents:

```js
module.exports = {
    aylien: 'https://api.aylien.com/api/v1',
    aylienKey: '<AYLIEN KEY>',
    aylienID: '<AYLIEN ID>',
    phone2action: 'https://fmrrixuk32.execute-api.us-east-1.amazonaws.com/hacktj/legislators',
    phone2actionKey: '<PHONE2ACTION KEY>',

}
```

-   create `api/twitterKeys.js` with the following contents:

```js
module.exports = {
    consumer_key: '<TWITTER CONSUMER KEY>',
    consumer_secret: '<TWITTER CONSUMER SECRET>',
    access_token_key: '<TWITTER ACCESS TOKEN KEY>',
    access_token_secret: '<TWITTER ACCESS TOKEN SECRET>'
}
```
