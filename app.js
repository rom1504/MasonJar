const wrap = require('minecraft-wrap');
const path = require('path');

var { SERVER_JAR } = require('./config');

const mc = new wrap.Wrap(
  path.join(__dirname, SERVER_JAR),
  path.join(__dirname, 'server')
);

var { cleanup, banManager } = require('./modules');

cleanup(() => {

  mc.startServer({
    motd: '8BitBlocks - MasonJar',
    'max-players': 120
  }, (error) => {

    if(error) {
      console.log(error);
      return;
    }else {
      console.log("🌎  Server Started!");

      const Ops = require('./server/ops.json') || [];
      const BannedPlayers = require('./server/banned-players.json') || [];

      setTimeout(function(){

        banManager(mc, BannedPlayers, () => {
          // Bans players after x amount of votes (determined in config)
          if(error) {
            console.log(error);
          }
        });

        mc.on('line', function(line) {
          console.log(line);
        });

        mc.writeServer('motd');

      },3000);

    }

  });

});
