const getContents = (request, response) => {
    var fs = require('fs')
    fs.truncate('./outputFile.html', 0, function(){console.log('done')})
    var wget = require('wget');
    //TODO: Make a query to allow frontend to pass a link as an query argument
    var source = "https://www.cnn.com/2019/11/08/us/osu-abuse-lawsuit-title-ix/index.html";
    var outputFile = 'outputFile.html';
    wget.download(source, outputFile);

    var fs = require("fs");
    var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");
    require("dotenv").config({ silent: true }); //  optional
    
    var nlu = new NaturalLanguageUnderstandingV1({
      //authenticator: new IamAuthenticator({ apikey: "eEvNCsoXt_QRo4WbUk-mnAX1xAVBb8-WoKFJeecrKQ3_" }),
      version: "2018-04-05"
      //url: "https://gateway.watsonplatform.net/natural-language-understanding/api/"
    });
    
    var filename = "./outputFile.html";
    fs.readFile(filename, "utf-8", function(file_error, file_data) {
      if (file_error) {
        console.log(file_error);
      } else {
        var options = {
          html: file_data,
          features: {
            concepts: {},
            keywords: {}
          }
        };
        nlu.analyze(options, function(err, res) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(JSON.stringify(res));
        });
      }
    });
    response.status(200).json({message: "GET CONTENTS STATUS : OK!"})
}

module.exports = {
    getContents
}