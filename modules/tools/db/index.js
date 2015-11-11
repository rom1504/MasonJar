var setPlayers = require('./setPlayers.js');
var getPlayers = require('./getPlayers.js');
var setUptime = require('./setUptime.js');
var getUptime = require('./getUptime.js');
var setRestartTime = require('./setRestartTime.js');
var getRestartTime = require('./getRestartTime.js');
var playerDB = require('./playerDB.js');
var getPlayerByName = require('./getPlayerByName.js');
var getAllPlayers = require('./getAllPlayers.js');

module.exports = {
  setPlayers,
  getPlayers,
  setUptime,
  getUptime,
  setRestartTime,
  getRestartTime,
  playerDB,
  getPlayerByName,
  getAllPlayers
};
