var { vote_to_ban } = require('./commands');

var commands = {
  vote2ban: vote_to_ban
};

const command = function(mc, payload, callback) {
  console.log(`${payload.player} dispatched command: ${payload.command}`);
  mc.writeServer(`say ${payload.player} dispatched command: ${payload.command}`);

  var commandName = payload.command.split('(')[0].replace('$', '');
  var args = payload.command.split('(')[1].replace(')', '');

  commands[commandName](JSON.parse(args));

  callback({error: false});
};

module.exports = command;
