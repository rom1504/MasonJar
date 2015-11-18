const mongoInit = require('./modules/init/mongoInit.js'); mongoInit();
const API = require('./api/api.js'); API();

const CronJob = require('cron').CronJob;

const wrap = require('minecraft-wrap');
const path = require('path');

var {
  SERVER_JAR, MAX_PLAYERS, DEFAULT_OPS, USING_ESSENTIALS, CACHE_TIMER, MAIN_CRON,
  USING_FACTIONS, MINECRAFT
} = require('./config');

var CONNECTED_PLAYERS = {count: 0};

var Crons = require('./modules/crons');
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

var cmd = require('./modules/tools/cmd.js');
cmd.init(mc);

new CronJob(MAIN_CRON, function() {
  if( USING_FACTIONS ) {
    //Crons.factions();
  }
}, null, true, 'America/New_York');

cleanup(() => {

  mc.startServer({
    motd: MINECRAFT.motd,
    'max-players': MAX_PLAYERS,
    'enable-command-block': true
  }, (error) => {

    if(error) {
      console.log(error);
      return;
    }else {
      console.log("🌎  Server Started!");

      const Ops = require('./server/ops.json') || [];
      const BannedPlayers = require('./server/banned-players.json') || [];

      setTimeout(function(){
        DEFAULT_OPS.map(function(player){
          mc.writeServer(`op ${player}\n`);
        });

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
