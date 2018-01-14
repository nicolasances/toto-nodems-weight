var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WeightConverter');

var MongoClient = mongo.MongoClient;

exports.deleteWeight = function(weightId) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      var results = db.db(config.dbName).collection(config.collections.weights).deleteOne({_id: new mongo.ObjectId(weightId)}, function(err, doc) {

        db.close();

        success();

      });
    });
  });

}