var { cmd } = require('../tools');

const help = function(mc, payload) {
  cmd.whisper(payload.player, 'For help please visit http://bit.ly/1MpD8TC');
};

module.exports = help;
