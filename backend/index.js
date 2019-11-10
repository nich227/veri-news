const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = process.env.PORT || 3000;
const fs = require("fs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Add headers
var cors = function(req, res, next) {
  var whitelist = [
    'https://veri-news.tech',
    'https://localhost:4200',
  ];
  var origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
}
app.use(cors);

app.get("/contents", db.getContents);

app.get("/", async (request, response) => {
  const processSentiment = require("./components/get_sentiment");
  let output = await processSentiment();
  response.json(output);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
