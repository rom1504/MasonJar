const API = require('./api/api.js'); API();

const wrap = require('minecraft-wrap');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/masonjar');

var {
  SERVER_JAR, MAX_PLAYERS, DEFAULT_OP, USING_ESSENTIALS, CACHE_TIMER
} = require('./config');
var CONNECTED_PLAYERS = {count: 0};

var { mainLoop, lineParser } = require('./modules/dispatchers');

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

        mainLoop(mc);
        setInterval(function() {
          mainLoop(mc)
        }, CACHE_TIMER);

        mc.on('line', function(line) {
          lineParser(mc, line, (players) => {
            CONNECTED_PLAYERS = players;
          });

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
