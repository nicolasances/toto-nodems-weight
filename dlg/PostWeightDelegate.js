var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WeightConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var weight = req.body;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.weights).insertOne(converter.weightConverter.toWeightPO(weight), function(err, res) {

        db.close();

        success({id: res.insertedId});
      });

    });
  });

}
