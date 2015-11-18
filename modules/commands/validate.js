const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var { cmd } = require('../tools');

const validate = function(uuid, uid) {
  args = args.toLowerCase();

  var query = DayVote.where({ executed: false }).sort({'timestamp': 'desc'});
  query.findOne(function (err, day_vote) {
    if (err) return handleError(err);

    if(day_vote) {

    }
  });

};

module.exports = validate;
