const mongoose = require('mongoose');

var TPSS = mongoose.model('TPSS');

const setTPS = function(TPS) {
  var query = TPSS.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, tps) {
    if (err) return handleError(err);

    if(tps) {
      tps.oneMin = TPS.oneMin;
      tps.fiveMin = TPS.fiveMin;
      tps.fifteenMin = TPS.fifteenMin;
      tps.updatedAt = Date.now();

      tps.save(function(){});
    }else {
      var tps = new TPSS({
        updatedAt: Date.now(),
        oneMin: TPS.oneMin,
        fiveMin: TPS.fiveMin,
        fifteenMin: TPS.fifteenMin
      });
      tps.save(function(err){
        if(err) {
          console.log(err);
        }
      });
    }
  });
};

module.exports = setTPS;
