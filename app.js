const wrap = require('minecraft-wrap');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/masonjar');

var { SERVER_JAR, MAX_PLAYERS } = require('./config');
var CONNECTED_PLAYERS = false;

const mc = new wrap.Wrap(
  path.join(__dirname, SERVER_JAR),
  path.join(__dirname, 'server')
);

var { cleanup, banManager, mcParser, command } = require('./modules');

cleanup(() => {

  mc.startServer({
    motd: '8BitBlocks - MasonJar',
    'max-players': MAX_PLAYERS
  }, (error) => {

    if(error) {
      console.log(error);
      return;
    }else {
      console.log("🌎  Server Started!");

      const Ops = require('./server/ops.json') || [];
      const BannedPlayers = require('./server/banned-players.json') || [];

      setTimeout(function(){

        mc.writeServer('list\n');
        setInterval(() => {
          mc.writeServer('list\n');
        }, 5000);

        mc.on('line', function(line) {

          if(line.indexOf('<') === -1 && line.indexOf('players online') != -1) {
             CONNECTED_PLAYERS = parseInt(line.split(':')[3].split(' ')[3].split('/')[0]);
          }

          mcParser(line, (results) => {

            if(results.command) {

              command(mc, results, (res) => {
                if(res.error) {
                  console.log(error);
                }
              }, {
                CONNECTED_PLAYERS
              });

            }

          });
        });

      },3000);

    }

  });

});
