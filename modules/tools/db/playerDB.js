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

      players.map(function(p) {
        var p = p;
        p.name = p.name.replace(' ', '');
        var query = Player.findOne({ 'username': p.name });

        query.findOne(function (err, player) {
          if (err) return handleError(err);

          if(player) {
            player.__v ++;
            if(Date.now() - player.onlineStamp >= ONLINE_POINT_MINS*60*1000) {
              if(!p.afk) {
                player.onlinePoints++;
                player.onlineStamp = Date.now();
              }
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
      break;

    default:

      break;
  }
};

module.exports = playerDB;
