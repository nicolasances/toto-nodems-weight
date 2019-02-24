var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WeightConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var weightId = req.params.id;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      var results = db.db(config.dbName).collection(config.collections.weights).findOne({_id: new mongo.ObjectId(weightId)}, function(err, doc) {

        db.close();

        success(converter.weightConverter.toWeight(doc));

      });
    });
  });

}
