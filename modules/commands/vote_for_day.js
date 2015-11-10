const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var { cmd } = require('../tools');
var { VOTES_FOR_DAY, MAX_PLAYERS } = require('../../config');

var DayVote = new Schema({
  timestamp: { type: Date, default: Date.now() },
  votes: Array,
  executed: { type: Boolean, default: false }
});

mongoose.model('DayVote', DayVote);
var DayVote = mongoose.model('DayVote');

const vote_for_day = function(mc, payload, args, options) {
  args = args.toLowerCase();

  var query = DayVote.where({ executed: false }).sort({'timestamp': 'desc'});
  query.findOne(function (err, day_vote) {
    if (err) return handleError(err);

    if(day_vote) {

      if(day_vote.votes.length / options.CONNECTED_PLAYERS.count >= VOTES_FOR_DAY) {
        cmd.whisper(mc, payload.player, `You voted for day successfully.`);

        cmd.day(mc);
        day_vote.executed = true;

      }else {

        if(day_vote.votes.indexOf(payload.player) > -1) {
          cmd.whisper(mc, payload.player, `You've already voted for day.  Percent is at ${day_vote.votes.length / options.CONNECTED_PLAYERS.count}, ${VOTES_FOR_DAY} or above needed.`);
        }else {
          day_vote.votes.push(payload.player);

          cmd.whisper(mc, payload.player, `You voted for day. Percent is at ${day_vote.votes.length / options.CONNECTED_PLAYERS.count}, ${VOTES_FOR_DAY} or above needed.`);

          if(day_vote.votes.length / options.CONNECTED_PLAYERS.count >= VOTES_FOR_DAY) {

            cmd.day(mc);
            day_vote.executed = true;

          }
        }

      }

      day_vote.save(function(){});
    }else {
      var day_vote = new DayVote({
        timestamp: Date.now(),
        votes: [payload.player],
        executed: false
      });
      day_vote.save(function(err){
        cmd.whisper(
          mc,
          payload.player,
          `You voted for day. Percent is at ${day_vote.votes.length / options.CONNECTED_PLAYERS.count}, ${VOTES_FOR_DAY} or above needed.`
        );
      });
    }
  });

};

module.exports = vote_for_day;
