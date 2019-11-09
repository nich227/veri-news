const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
    uri: `https://www.nytimes.com/2019/11/04/upshot/trump-biden-warren-polls.html`,
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($) => {
        console.log($);
    })
    .catch((err) => {
        console.log(err);
    });