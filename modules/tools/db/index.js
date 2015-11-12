var setPlayers = require('./setPlayers.js');
var getPlayers = require('./getPlayers.js');
var setUptime = require('./setUptime.js');
var getUptime = require('./getUptime.js');
var setRestartTime = require('./setRestartTime.js');
var getRestartTime = require('./getRestartTime.js');
var playerDB = require('./playerDB.js');
var getPlayerByName = require('./getPlayerByName.js');
var getAllPlayers = require('./getAllPlayers.js');
var setTPS = require('./setTPS.js');
var getTPS = require('./getTPS.js');
var assignMetadata = require('./assignMetadata.js');

module.exports = {
  setPlayers,
  getPlayers,
  setUptime,
  getUptime,
  setRestartTime,
  getRestartTime,
  playerDB,
  getPlayerByName,
  getAllPlayers,
  setTPS,
  getTPS,
  assignMetadata
};
