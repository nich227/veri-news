"use strict";

var fs = require("fs");
var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");
require("dotenv").config({ silent: true }); //  optional

var nlu = new NaturalLanguageUnderstandingV1({
  //authenticator: new IamAuthenticator({ apikey: "eEvNCsoXt_QRo4WbUk-mnAX1xAVBb8-WoKFJeecrKQ3_" }),
  version: "2018-04-05"
  //url: "https://gateway.watsonplatform.net/natural-language-understanding/api/"
});

var filename = "../res/test.html";
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
      console.log(res);
    });
  }
});
