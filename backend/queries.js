const getContents = (request, response) => {
    var fs = require('fs')
    fs.truncate('./outputFile.html', 0, function(){console.log('done')})
    var wget = require('wget');
    var source = request.query["url"];
    var outputFile = 'outputFile.html';
    wget.download(source, outputFile);
    response.json(200);
}

module.exports = {
    getContents
}