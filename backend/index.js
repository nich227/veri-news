const express = require("express");
const bodyParser = require("body-parser");
const processSentiment = require("./components/get_sentiment");
const app = express();
const db = require("./queries");
const port = 3000;
const fs = require("fs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let output = processSentiment();

app.get("/", (request, response) => {
    response.json("API STATUS : OK");
});

app.get("/contents", db.getContents);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
