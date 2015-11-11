const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { ONLINE_POINT_MINS } = require('../../../config.js');

var Player = new Schema({
  updatedAt: { type: Date, default: Date.now() },
  username: String,
  email: { type: String, default: 'Null' },
  twitter: { type: String, default: 'Null' },
  onlinePoints: Number,
  points: Number,
  afk: Boolean,
  onlineStamp: Number,
  UUID: String
}); 

mongoose.model('Player', Player);
var Player = mongoose.model('Player');

var request = require('request');

const playerDB = function(action, data) {
  switch(action) {
    case 'online':
      
      var players = (data.names) ? data.names : [];
      
      
      players.map(function(p) {
        var query = Player.findOne({ 'username': p.name.replace(' ', '') });
        
        query.findOne(function (err, player) {
          if (err) return handleError(err);
      
          if(player) {
            if(Date.now() - player.onlineStamp >= ONLINE_POINT_MINS*60*1000) {
              if(!player.afk) { 
                player.onlinePoints++;
              }
              player.onlineStamp = Date.now();
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
