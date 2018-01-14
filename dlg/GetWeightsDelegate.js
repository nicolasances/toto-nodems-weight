var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WeightConverter');

var MongoClient = mongo.MongoClient;

exports.getWeights = function() {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      var results = db.db(config.dbName).collection(config.collections.weights).find().sort(converter.weightConverter.sortDateDesc());

      results.toArray(function(err, array) {
        db.close();

        var weights = [];
        for (var i = 0; i < array.length; i++) {

          weights.push(converter.weightConverter.toWeight(array[i]));
        }

        success({weights: weights});

      });
    });
  });

}
