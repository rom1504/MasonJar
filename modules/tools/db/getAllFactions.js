const mongoose = require('mongoose');

var Faction = mongoose.model('Faction');

const getAllFactions = function(callback, limit) {
  var limit = (limit && parseInt(limit)) ? parseInt(limit) : 5;

  var query = Faction
    .find()
    .sort({ 'onlinePoints' : 'desc' })
    .limit(limit);

  query.find(function (err, factions) {
    if (err) return handleError(err);
    if(factions) {
      callback(factions);
    }else {
      callback({});
    }
  });
};

module.exports = getAllFactions;
