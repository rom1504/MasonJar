const mongoose = require('mongoose');
const path = require('path');
const walk = require('walk');
const util = require('util');
const jsonfile = require('jsonfile');
const request = require('request');

const { ONLINE_POINT_MINS, USING_FACTIONS } = require('../../../config.js');

const { assignMetadata } = require('./');

var Player = mongoose.model('Player');

var FACTIONS_PLAYERS = path.join(__dirname, '../../../server/mstore/factions_mplayer');
var FACTIONS_FACTIONS = path.join(__dirname, '../../../server/mstore/factions_faction');

const playerDB = function(action, data) {
  switch(action) {
    case 'online':
      var playersFactionData = {};

      if( USING_FACTIONS ) {
        var walker  = walk.walk(FACTIONS_PLAYERS, { followLinks: false });

        walker.on('file', function(root, stat, next) {
            if(stat.name.match(/.*-.*-.*-.*-.*\.json/)){
              jsonfile.readFile(`${FACTIONS_PLAYERS}/${stat.name}`, function(err, obj) {
                if(obj.factionId) {
                  jsonfile.readFile(`${FACTIONS_FACTIONS}/${obj.factionId}.json`, function(err, faction_obj) {
                    var UUID = stat.name.split('.')[0];
                    playersFactionData[UUID] = {
                      power: obj.power,
                      role: obj.role,
                      factionId: obj.factionId,
                      name: faction_obj.name,
                      description: faction_obj.description
                    };
                    next();
                  });
                }
              });
            }
        });
      }

      var players = (data.names) ? data.names : [];

      walker.on('end', function() {
        players.map(function(p) {
          var p = p;
          p.name = p.name.replace(' ', '');
          var query = Player.findOneAndUpdate({ 'username': p.name });

          query.exec(function (err, player) {
            if (err) return handleError(err);

            if(player) {
              player.__v ++;
              if(Date.now() - player.onlineStamp >= ONLINE_POINT_MINS*60*1000) {
                if(!p.afk) {
                  player.onlinePoints++;
                  player.onlineStamp = Date.now();
                }

              }
              if(playersFactionData[player.UUID]) {
                var metaData = player.metadata;
                player.metadata = Object.assign({}, metaData, {
                  factions: playersFactionData[player.UUID]
                });
              }
              player.save(function(err){
                if (err) {
                  console.log(err);
                }
              });
            }else {
              request.post(`https://us.mc-api.net/v3/uuid/${p.name}`, {json: true}, function(err, res, body) {
                var newPlayer = new Player({
                  updatedAt: Date.now(),
                  username: p.name,
                  afk: p.afk,
                  onlinePoints: 0,
                  points: 0,
                  onlineStamp: Date.now(),
                  UUID: body.full_uuid,
                  plainUUID: body.uuid
                });
                newPlayer.save(function(err){
                  if(err) {
                    console.log(err);
                  }
                });
              });
            }
          });
        });
      });
      break;

    default:

      break;
  }
};

module.exports = playerDB;
