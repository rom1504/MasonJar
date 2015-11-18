const {
  SERVER_JAR, MAX_PLAYERS, LOGFILE, USING_ESSENTIALS, UPDATE_TIMER
} = require('../../config');

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const exec = require('child_process').exec;

var LogMsg = new Schema({
  timestamp: { type: Date, default: Date.now() },
  msg: String
});

mongoose.model('LogMsg', LogMsg);
var LogMsg = mongoose.model('LogMsg');

var mc;

module.exports = {
  init: function(Minecraft) {
    mc = Minecraft;
  },
  logger: function(msg) {
    var msg = new LogMsg({
      timestamp: Date.now(),
      msg: msg
    });
    msg.save(function(err){
      if(err) {
        console.log(err);
      }
    });
  },
  say: function(msg) {
    mc.writeServer(`say ${msg}\n`);
  },
  whisper: function(player, msg) {
    console.log(player);
    if(USING_ESSENTIALS){
      mc.writeServer(`whisper ${player} ${msg}\n`);
    }else {
      mc.writeServer(`tell ${player} ${msg}\n`);
    }
  },
  update: function(payload) {
    mc.stopServer(() => {

      exec('../../update.sh', (err, stdout, stderr) => {
        if(err) {
          console.log(err);
        }
        console.log(stdout);
      });
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
  restart: function() {
    var timer = UPDATE_TIMER;
    this.say(mc, `Server restarting in ${timer / 1000 / 60} minute(s)!`);
    var restartTimer = setInterval(function(){
      timer = timer - 60000;
      this.say(mc, `Server restarting in ${timer / 1000 / 60} minute(s)!`);
    }, 60000);

    setTimeout(function(){
      clearInterval(restartTimer);
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
    }, UPDATE_TIMER);

  },
  ban: function(player, voteCount) {
    mc.writeServer(`ban ${player} vote2ban automated ban after ${voteCount} votes.\n`);
    this.logger(`banned ${player} with vote2ban automated ban after ${voteCount} votes.`);
  },
  day: function(){
    mc.writeServer(`time set 0\n`);
    mc.writeServer(`weather set clear\n`);
  },
  unban: function(player, voteCount) {
    mc.writeServer(`pardon ${player} vote2ban automated unban after ${voteCount} votes.\n`);
    this.logger(`pardoned ${player} with vote2ban automated unban after ${voteCount} votes.`);
  },
  give: function(items, player) {
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
    this.logger(`gave ${player} ${JSON.stringify(items)}`);

  }
};
