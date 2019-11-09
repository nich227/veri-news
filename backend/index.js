//
//Experimenting using cheerio
// const rp = require('request-promise');
// const cheerio = require('cheerio');

// const options = {
//     uri: `https://www.nytimes.com/2019/11/04/upshot/trump-biden-warren-polls.html`,
//     transform: function (body) {
//         return cheerio.load(body);
//     }
// };

// rp(options)
//     .then(($) => {
//         console.log($);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({info: 'Node.js API' })
})

app.get('/health', (request, response) => {
    response.json({message: 'GET HEALTH STATUS : OK !'})
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})