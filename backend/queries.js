const processSentiment = require("./components/get_sentiment");
let output = processSentiment();

const getContents = (request, response) => {
    var fs = require('fs')
    fs.truncate('./outputFile.html', 0, function(){console.log('done')})
    var wget = require('wget');
    var source = request.query["url"];
    var outputFile = 'outputFile.html';
    wget.download(source, outputFile);
    fs.readFile('sentiment-analyze.json', (err, data) => {
        if(err) throw err;
        let output = JSON.parse(data);
        response.json(output);
      });
}

module.exports = {
    getContents
}