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
  query.findOne(function (err, vote) {
    if (err) return handleError(err);

    if(vote) {

      if(vote.votes.length / options.CONNECTED_PLAYERS >= VOTES_FOR_DAY) {

        cmd.day(mc);
        vote.executed = true;

      }else {

        if(vote.votes.indexOf(payload.player) > -1) {
          cmd.whisper(mc, payload.player, `You've already voted for day.  Percent is at ${vote.votes.length / options.CONNECTED_PLAYERS}, ${VOTES_FOR_DAY} or above needed.`);
        }else {
          vote.votes.push(payload.player);
          cmd.whisper(mc, payload.player, `You voted for day. Percent is at ${vote.votes.length / options.CONNECTED_PLAYERS}, ${VOTES_FOR_DAY} or above needed.`);

          if(vote.votes.length / options.CONNECTED_PLAYERS >= VOTES_FOR_DAY) {

            cmd.day(mc);
            vote.executed = true;

          }
        }

      }

      vote.save(function(){});
    }else {
      var vote = new DayVote({
        timestamp: Date.now(),
        votes: [payload.player],
        executed: false
      });
      vote.save(function(err){
        cmd.whisper(
          mc,
          payload.player,
          `You voted for day. Percent is at ${vote.votes.length / options.CONNECTED_PLAYERS}, ${VOTES_FOR_DAY} or above needed.`
        );
      });
    }
  });

};

module.exports = vote_for_day;
