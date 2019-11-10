const sentiment = require('./components/get_sentiment')

const getContents = (request, response) => {
    var fs = require('fs')
    fs.truncate('./outputFile.html', 0, function(){console.log('done')})
    var wget = require('wget');
    var source = request.query["url"];
    var outputFile = 'outputFile.html';
    wget.download(source, outputFile);

    response.status(200).json({message: "GET CONTENTS STATUS : OK!"})
}

module.exports = {
    getContents
}