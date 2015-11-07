var { SERVER_JAR, MAX_PLAYERS } = require('../../config');

module.exports = {
  logger: function() {

  },
  say: function(mc, msg) {
    mc.writeServer(`say ${msg}\n`);
  },
  whisper: function(mc, player, msg) {
    mc.writeServer(`tell ${player} ${msg}\n`);
  },
  restart: function(mc) {
    mc.stopServer(() => {
      mc.startServer({
        motd: '8BitBlocks - MasonJar',
        'max-players': MAX_PLAYERS
      }, (error) => {
        if(error) {
          console.log(error);
        }
      });
    });
  },
  ban: function(mc, player, voteCount) {
    mc.writeServer(`ban ${player} vote2ban automated ban after ${voteCount} votes.\n`);
  },
  day: function(mc){
    mc.writeServer(`time set 0\n`);
    mc.writeServer(`weather set clear\n`);
  },
  unban: function(mc, player, voteCount) {
    mc.writeServer(`pardon ${player} vote2ban automated ban after ${voteCount} votes.\n`);
  },
  give: function(mc, items, player) {
    for(item in items) {
      if(typeof(items[item]) === 'object'){
        try {
          mc.writeServer(`give ${player} ${items[item].name} ${items[item].count}\n`);
        } catch(err) {
          console.log(`Something went wrong giving ${player} items: ${items}`);
        }
      } else{
        mc.writeServer(`give ${player} ${items[item]} 1\n`);
      }
    }
  }
};
