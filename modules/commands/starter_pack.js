var { cmd } = require('../tools');

const starter_pack = function(mc, payload) {
  var items = ['stone', {name: 'stone', count: 64}];
  cmd.give(items, payload.player);
};

module.exports = starter_pack;
