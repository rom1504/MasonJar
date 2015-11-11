const mongoose = require('mongoose');


var Player = mongoose.model('Player');

const getAllPlayers = function(callback, limit, by) {
  var sortBy = (by) ? by : 'onlinePoints';
  var limit = (limit && parseInt(limit)) ? parseInt(limit) : 5;
  
  var query = Player.find().sort({ 'onlinePoints' : 'desc' }).limit(limit);
  console.log(sortBy);
  query.find(function (err, players) {
    if (err) return handleError(err);
    if(players) {
      callback(players);
    }else {
      callback({});
    }
  });
};

module.exports = getAllPlayers;
