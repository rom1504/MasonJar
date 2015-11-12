const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/masonjar');

module.exports = function() {
  var Schema = mongoose.Schema;
  var Player = new Schema({
    updatedAt: { type: Date, default: Date.now() },
    username: String,
    email: { type: String, default: 'Null' },
    twitter: { type: String, default: 'Null' },
    onlinePoints: Number,
    points: Number,
    afk: Boolean,
    onlineStamp: Number,
    UUID: String,
    metadata: { type: Object, default: {joinDate: Date.now()} }
  });
  mongoose.model('Player', Player);

  var Faction = new Schema({
    updatedAt: { type: Date, default: Date.now() },
    name: String,
    id: { type: String, default: 'Null' },
    description: { type: String, default: 'Null' },
    power: Number,
    members: Array,
    data: { type: Object, default: {} }
  }, { strict: false });

  mongoose.model('Faction', Faction);

  var TPSS = new Schema({
    updatedAt: { type: Date, default: Date.now() },
    oneMin: String,
    fiveMin: String,
    fifteenMin: String
  });

  mongoose.model('TPSS', TPSS);

  var Uptime = new Schema({
    updatedAt: { type: Date, default: Date.now() },
    uptimeBreakdown: Object,
    formattedUptime: String,
    uptime: Number
  });

  mongoose.model('Uptime', Uptime);

  var PlayerCount = new Schema({
    updatedAt: { type: Date, default: Date.now() },
    count: Number,
    names: Array
  });

  mongoose.model('PlayerCount', PlayerCount);

  var RestartTimer = new Schema({
    updatedAt: { type: Date, default: Date.now() },
    timeTillRestart: Number,
    formattedRestartCoutdown: String
  });
  mongoose.model('RestartTimer', RestartTimer);
};
