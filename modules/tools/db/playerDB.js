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
      var players = (data.names) ? data.names : [];
      console.log(data);
      players.map(function(p) {
        var p = p;
        p.name = p.name.replace(' ', '');
        var query = Player.findOne({ 'username': p.name });

        query.findOne(function (err, player) {
          if (err) return handleError(err);

          if(player) {
            player.__v ++;
            if(Date.now() - player.onlineStamp >= ONLINE_POINT_MINS*60*1000) {
              player.onlinePoints++;
              player.onlineStamp = Date.now();
            }
            if( USING_FACTIONS ) {
              jsonfile.readFile(`${FACTIONS_PLAYERS}/${player.UUID}.json`, function(err, obj) {
                if(obj && obj.factionId) {
                  jsonfile.readFile(`${FACTIONS_FACTIONS}/${obj.factionId}.json`, function(err, faction_obj) {
                    player.metadata = Object.assign({}, player.metadata, {
                      factions: {
                        power: obj.power,
                        role: obj.role,
                        factionId: obj.factionId,
                        name: faction_obj.name,
                        description: faction_obj.description
                      }
                    });
                    player.save(function(err){
                      if (err) {
                        console.log(err);
                      }
                    });
                  });
                }
              });
            }else{
              player.save(function(err){
                if (err) {
                  console.log(err);
                }
              });
            }
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
      break;

    default:

      break;
  }
};

module.exports = playerDB;
