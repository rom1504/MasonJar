const mongoose = require('mongoose');


var TPSS = mongoose.model('TPSS');

const getTPS = function(callback) {
  var query = TPSS.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, tps) {
    if (err) return handleError(err);
    if(tps) {
      callback({
        oneMin: tps.oneMin,
        fiveMin: tps.fiveMin,
        fifteenMin: tps.fifteenMin,
        updatedAt: tps.updatedAt
      });
    }else {
      callback({
        oneMin: 20,
        fiveMin: 20,
        fifteenMin: 20,
        updatedAt: 'never'
      });
    }
  });
};

module.exports = getTPS;
