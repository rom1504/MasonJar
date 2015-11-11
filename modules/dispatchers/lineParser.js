var {
  SERVER_JAR, MAX_PLAYERS, DEFAULT_OP, USING_ESSENTIALS
} = require('../../config');

var { setPlayers, playerDB } = require('../tools/db');
var CONNECTED_PLAYERS = {};

module.exports = function(mc, line, callback) {
  console.log(line);

  if(line.indexOf('<') === -1 && line.indexOf('players online') != -1) {
    CONNECTED_PLAYERS = {
      count: parseInt(line.split(':')[3].split(' ')[3].split('/')[0]),
      names: []
    };
  }

  if( USING_ESSENTIALS ) {
    if( line.match(/\[.* INFO]: default:/) ){
      var players = line.replace(/\[.* INFO]: default:/, '').replace(' ', '').split(',');
      for (player in players) {
        var now = Date.now();
        if(players[player].match(/\[.*].*/)) {
          players[player] = {
            name: players[player].split(']')[1],
            afk: true
          };
        }else{
          players[player] = {
            name: players[player],
            afk: false
          };
        }
      }
      CONNECTED_PLAYERS.names = players;
      CONNECTED_PLAYERS.count = players.length;
      setPlayers(CONNECTED_PLAYERS);
      playerDB('online', CONNECTED_PLAYERS);
    }else{
      setPlayers(CONNECTED_PLAYERS);
      playerDB('online', CONNECTED_PLAYERS);
    }
  }
  callback(CONNECTED_PLAYERS);
};
