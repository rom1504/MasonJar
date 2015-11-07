var { vote_to_ban, vote_to_unban, starter_pack, help } = require('./commands');
var { cmd } = require('./tools');

var commands = {
  help: help,
  vote2ban: vote_to_ban,
  vote2unban: vote_to_unban,
  starter: starter_pack
};

const command = function(mc, payload, callback) {

  var commandName = payload.command.split('(')[0].replace('$', '');
  var args = payload.command.split('(')[1].replace(')', '');
  args = JSON.stringify(args.replace("'", "").replace('"', ''));

  if(commandName in commands) {

    try{

      var args = (function(){
        try{
          return JSON.parse(args);
        } catch(err) {
          return "noArgs";
        }
      })();

      commands[commandName](mc, payload, args);

      console.log(`${payload.player} dispatched command: ${payload.command}`);

    } catch(err){
      cmd.whisper(
        mc,
        payload.player,
        `Invalid command syntax.`
      );
      console.log(`${payload.player} failed to dispatch: ${payload.command}`, err);

    }

  }else {
    cmd.whisper(
      mc,
      payload.player,
      `Unknown command.`
    );
    console.log(`${payload.player} tried to dispatch an unknown command: ${payload.command}`);

  }

  callback({error: false});
};

module.exports = command;
