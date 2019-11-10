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
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "https://veri-news.tech");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/contents", db.getContents);

app.get("/", async (request, response) => {
  const processSentiment = require("./components/get_sentiment");
  let output = await processSentiment();
  response.json(output);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
