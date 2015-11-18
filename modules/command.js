var {
  vote_to_ban, vote_to_unban, starter_pack, vote_for_day, help, vote_for_restart,
  update
} = require('./commands');

var { cmd } = require('./tools');

var commands = {
  help,
  vote2ban: vote_to_ban,
  vote2unban: vote_to_unban,
  starter: starter_pack,
  vote4restart: vote_for_restart,
  vote4day: vote_for_day,
  update
};

const command = function(mc, payload, callback, options) {

  var commandName = payload.command.command;
  var args = payload.command.args;

  if(commandName in commands) {

    try{

      commands[commandName](mc, payload, args, {
        CONNECTED_PLAYERS: options.CONNECTED_PLAYERS
      });

      console.log(`${payload.player} dispatched command: ${payload.command.command}`);

    } catch(err){
      cmd.whisper(
        payload.player,
        `Invalid command syntax.`
      );
      console.log(`${payload.player} failed to dispatch: ${payload.command.command}`, err);

    }

  }else {
    cmd.whisper(
      payload.player,
      `Unknown command.`
    );
    console.log(`${payload.player} tried to dispatch an unknown command: ${payload.command}`);

  }

  callback({error: false});
};

module.exports = command;
