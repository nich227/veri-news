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

app.get("/", async (request, response) => {
  const processSentiment = require("./components/get_sentiment");
  let output = await processSentiment();
  response.json(output);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
