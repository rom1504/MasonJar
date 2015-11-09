const API = require('./api/api.js'); API();

const wrap = require('minecraft-wrap');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/masonjar');

var { SERVER_JAR, MAX_PLAYERS, DEFAULT_OP } = require('./config');
var CONNECTED_PLAYERS = false;

var { setPlayers } = require('./modules/tools/db');

const mc = new wrap.Wrap(
  path.join(__dirname, SERVER_JAR),
  path.join(__dirname, 'server'),
  {
    minMem: '1024',
    maxMem: '1024',
    doneRegex: new RegExp(/ INFO\]: Done /)
  }
);

var { cleanup, banManager, spigotParser, command } = require('./modules');

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
        mc.writeServer(`op ${DEFAULT_OP}\n`);

        mc.writeServer('list\n');
        setInterval(() => {
          mc.writeServer('list\n');
        }, 5000);

        mc.on('line', function(line) {
          console.log(line);

          if(line.indexOf('<') === -1 && line.indexOf('players online') != -1) {
             CONNECTED_PLAYERS = parseInt(line.split(':')[3].split(' ')[3].split('/')[0]);
             setPlayers(CONNECTED_PLAYERS);
          }

          spigotParser(line, (results) => {

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
