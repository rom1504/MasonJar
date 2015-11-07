var { vote_to_ban } = require('./commands');

var commands = {
  vote2ban: vote_to_ban
};

const command = function(mc, payload, callback) {

  var commandName = payload.command.split('(')[0].replace('$', '');
  var args = payload.command.split('(')[1].replace(')', '');

  if(commandName in commands) {

    try{
      commands[commandName](
        JSON.parse(
          args
        )
      );

      console.log(`${payload.player} dispatched command: ${payload.command}`);
      mc.writeServer(`say ${payload.player} dispatched command: ${payload.command}\n`);

    } catch(err){

      console.log(`${payload.player} failed to dispatch: ${payload.command}`);

    }

  }else {

    console.log(`${payload.player} tried to dispatch an unknown command: ${payload.command}`);

  }

  callback({error: false});
};

module.exports = command;
