var { cmd } = require('../tools');
var { starter } = require('../packs');

const starter_pack = function(mc, payload) {
  cmd.give(starter, payload.player);
};

module.exports = starter_pack;
