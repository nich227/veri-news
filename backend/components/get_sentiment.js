"use strict";

var fs = require("fs");
var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");
require("dotenv").config({ silent: true }); //  optional

var nlu = new NaturalLanguageUnderstandingV1({
  version: "2018-04-05"
});

var filename = "../res/test.html";
fs.readFile(filename, "utf-8", function(file_error, file_data) {
  if (file_error) {
    console.log(file_error);
  } else {
    var options = {
      html: file_data,
      features: {
        keywords: {
            'emotion': true,
            'sentiment': true,
            'limit': 100
        },
        entities: {
            'emotion': true,
            'sentiment': true,
            'limit': 10
        }
      }
    };
    nlu.analyze(options, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      let output = JSON.stringify(res);
      console.log("OUT: " + output);
      let jsonObj = JSON.parse(output);
      let sum = 0, sumRelevance = 0;
      let numWords = 0;
      let relevanceScores = [], relevanceSquareDiffs = [];
      let avgEmotionScore = 0;
      jsonObj.result.keywords.forEach (word => {
        let emotionScore = (word.emotion.sadness + word.emotion.joy + word.emotion.fear + word.emotion.disgust + word.emotion.anger)/5;
        console.log("Sent: " + word.sentiment.score + " // Emo. Avg: " + emotionScore + " // Rel: " + word.relevance + " // Text: " + word.text);
        sum += Math.abs(word.sentiment.score);
        avgEmotionScore += emotionScore;
        relevanceScores.push(word.relevance);
        numWords++;
      })
      console.log("Words: " + numWords)
      console.log("Average sentiment: " + (sum/numWords));
      console.log("Average Emotional Score: " + (avgEmotionScore/numWords));
      //console.log("Words: " + numWords);
      //console.log("Relevance scores: " + relevanceScores);
      /*
      let rSum = 0;
      relevanceScores.forEach(val => {
        rSum += val;
      })
      let rAvg = rSum/relevanceScores.length;
      //console.log("Relevance Avg: " + rAvg);
      let rStdSummation = 0;
      relevanceScores.forEach(val => {
        relevanceSquareDiffs.push(Math.pow((val - rAvg), 2));
      })
      let sqDiffAvg = 0;
      relevanceSquareDiffs.forEach(val => {
        sqDiffAvg += val;
      })
      sqDiffAvg = sqDiffAvg/relevanceSquareDiffs.length;

      let rStdDev = Math.sqrt(sqDiffAvg);
      console.log("Relevance avg: " + rAvg + ", standard dev: " + rStdDev);
      let excludeLimit = rAvg - rStdDev;

      sum = 0;
      numWords = 0;
      jsonObj.result.keywords.forEach (word => {
        if(word.relevance > rAvg) {
          sum += word.sentiment.score;
          numWords++;
        }
      })
      console.log("Improved sentiment avg: " + (sum/numWords));
      console.log("Words: " + numWords);
      */
    });
  }
});
