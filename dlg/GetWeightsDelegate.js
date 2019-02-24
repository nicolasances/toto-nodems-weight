var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WeightConverter');
var moment = require('moment-timezone');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var dateFrom = req.query.dateFrom;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Define an empty filter
      let filter = {};

      // IF date from is passed, use it as a filter
      if (dateFrom != null) {
        // Extract the week out of the date
        let d = moment(dateFrom, 'YYYYMMDD').tz(config.timezone);
        let week = d.format('W');
        let year = d.format('YYYY');

        // Update the filter
        filter = {weekOfYear: {$gte: week}, year: {$gte: year}};
      }

      var results = db.db(config.dbName).collection(config.collections.weights)
          .find(filter)
          .sort(converter.weightConverter.sortDateDesc());

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
