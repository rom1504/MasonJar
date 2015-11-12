const mongoose = require('mongoose');

var Player = mongoose.model('Player');

const assignMeta = function(username, newMetadata) {
  var query = Player
    .findOne({ 'username': username })
    .where('__v').gt(0)
    .sort({'updatedAt': 'desc'});

  query.findOne(function (err, player) {
    if (err) return handleError(err);
    if(player) {
      var metadata = player.metadata;
      player.metadata = Object.assign({}, metadata, newMetadata, {
        updatedAt: Date.now()
      });
      player.save(function(err) {
        if(err) {
          console.log('assignMetadata save error', err);
        }
      });
    }
  });
};

module.exports = assignMeta;
