var { cmd } = require('../tools');

const starter_pack = function(mc, payload) {
  var items = ['stone', {name: 'stone', count: 64}];
  cmd.give(mc, items, payload.player);
  console.log('got this far');
};

module.exports = starter_pack;
