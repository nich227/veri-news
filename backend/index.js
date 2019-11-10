const express = require('express')
const bodyParser = require('body-parser')
const processSentiment = require('./components/get_sentiment');
const app = express()
const db = require('./queries')
const port = 3000

//Call function to process sentiment
const score = new processSentiment();



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json(score.getScore());
})
//TODO: Make path /contents/:url
app.get('/contents', db.getContents)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})