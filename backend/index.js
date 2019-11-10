const express = require("express");
const bodyParser = require("body-parser");
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

app.get("/contents", db.getContents);

app.get("/", (request, response) => {
  const processSentiment = require("./components/get_sentiment");
  let output = processSentiment();
  fs.readFile('sentiment-analyze.json', (err, data) => {
    if(err) throw err;
    let output = JSON.parse(data);
    response.json(output);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
