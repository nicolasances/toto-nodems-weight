
exports.weightConverter = {

    toWeight: function(json) {

      if (json == null) return {};

      return {
        id: json._id,
        weekOfYear: json.weekOfYear,
        year: json.year,
        weight: json.weight
      };
    },

    toWeightPO : function(weight) {

      return {
        weekOfYear: weight.weekOfYear,
        year: weight.year,
        weight: weight.weight
      };
    },

    sortDateDesc : function() {
      return {"year": -1, "weekOfYear": -1};
    }
}
