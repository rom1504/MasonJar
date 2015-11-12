var {
  SERVER_JAR, MAX_PLAYERS, DEFAULT_OP, USING_ESSENTIALS
} = require('../../config');

var { setPlayers, playerDB, setTPS } = require('../tools/db');
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
  if(USING_ESSENTIALS && line.match(/\[.*]: TPS from last 1m, 5m, 15m:/)) {
    var tps = line.split(']:')[1].split(':')[1].split(',');
    var TPS = {};
    tps.map(function(tpsi, i) {
      switch(i){
        case 0:
          TPS.oneMin = tpsi.replace(' ', '');
          break;
        case 1:
          TPS.fiveMin = tpsi.replace(' ', '');
          break;
        case 2:
          TPS.fifteenMin = tpsi.replace(' ', '');
          break;
        default:
          break;
      }
    });
    setTPS(TPS);
  }
  callback(CONNECTED_PLAYERS);
};
