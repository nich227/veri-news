var fs = require("fs");
var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");
require("dotenv").config({ silent: true }); //  optional

var nlu = new NaturalLanguageUnderstandingV1({
  //authenticator: new IamAuthenticator({ apikey: "eEvNCsoXt_QRo4WbUk-mnAX1xAVBb8-WoKFJeecrKQ3_" }),
  version: "2018-04-05"
  //url: "https://gateway.watsonplatform.net/natural-language-understanding/api/"
});

module.exports = function() {
  var bias_score = 0;
  var top_bias_phrases = [];

  var filename = "../backend/res/test.html";
  fs.readFile(filename, "utf-8", function(file_error, file_data) {
    if (file_error) {
      console.log(file_error);
    } else {
      var options = {
        html: file_data,
        features: {
          keywords: {
            emotion: true,
            sentiment: true,
            limit: 100
          },
          entities: {
            emotion: true,
            sentiment: true,
            limit: 10
          }
        }
      };
      nlu.analyze(options, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }
        let output = JSON.stringify(res);
        let jsonObj = JSON.parse(output);
        let sumSentiment = 0,
          sumRelevance = 0,
          sumEmotionScore = 0;
        let numWords = 0;

        //Calculate average relevance
        let relevanceSum = 0;
        let relevanceSize = 0;
        jsonObj.result.keywords.forEach(word => {
          relevanceSum += word.relevance;
          relevanceSize++;
        });
        let relevanceAvg = relevanceSum / relevanceSize;

        //Ignore all relevances smaller than average
        jsonObj.result.keywords.forEach(word => {
          if (word.relevance < relevanceAvg) word.relevance = 0;
        });

        //Analyzing each keyword
        jsonObj.result.keywords.forEach(word => {
          let emotionScore =
            (word.emotion.sadness +
              word.emotion.joy +
              word.emotion.fear +
              word.emotion.disgust +
              word.emotion.anger) /
            5;
          if (word.relevance != 0) {
            sumSentiment += Math.abs(word.sentiment.score);
            sumEmotionScore += emotionScore;
            numWords++;
            let phrase = {
              text: word.text,
              sentiment: word.sentiment.score,
              sadness: word.emotion.sadness,
              joy: word.emotion.joy,
              fear: word.emotion.fear,
              disgust: word.emotion.disgust,
              anger: word.emotion.anger
            };
            top_bias_phrases.push(phrase);
          }
        });

        bias_score =
          0.5 * (sumSentiment / numWords) + 0.5 * (sumEmotionScore / numWords);
          
          let sentiment = {'bias-score':JSON.stringify(bias_score), 'top-bias-phrases':JSON.stringify(top_bias_phrases)};
          fs.writeFileSync('sentiment-analyze.json', JSON.stringify(sentiment));
      });
    }
  });
};
