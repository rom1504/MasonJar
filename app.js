const wrap = require('minecraft-wrap');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/masonjar');

var { SERVER_JAR } = require('./config');

const mc = new wrap.Wrap(
  path.join(__dirname, SERVER_JAR),
  path.join(__dirname, 'server')
);

var { cleanup, banManager, mcParser, command } = require('./modules');

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

        mc.on('line', function(line) {
          mcParser(line, (results) => {

            if(results.command) {

              command(mc, results, (res) => {
                if(res.error) {
                  console.log(error);
                }
              });

            }

          });
        });

      },3000);

    }

  });

});
