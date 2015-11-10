const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var { cmd } = require('../tools');
var { VOTES_FOR_RESTART, MAX_PLAYERS } = require('../../config');

var RestartVote = new Schema({
  timestamp: { type: Date, default: Date.now() },
  votes: Array,
  executed: { type: Boolean, default: false }
});

mongoose.model('RestartVote', RestartVote);
var RestartVote = mongoose.model('RestartVote');

const vote_for_day = function(mc, payload, args, options) {
  args = args.toLowerCase();

  var query = RestartVote.where({ executed: false }).sort({'timestamp': 'desc'});
  query.findOne(function (err, vote) {
    if (err) return handleError(err);

    if(vote) {

      if(vote.votes.length / options.CONNECTED_PLAYERS.count >= VOTES_FOR_RESTART) {
        cmd.whisper(mc, payload.player, `You voted for a restart successfully.`);

        cmd.restart(mc);
        vote.executed = true;

      }else {

        if(vote.votes.indexOf(payload.player) > -1) {
          cmd.whisper(mc, payload.player, `You've already voted for a restart.  Percent is at ${vote.votes.length / options.CONNECTED_PLAYERS.count}, ${VOTES_FOR_RESTART} or above needed.`);
        }else {
          vote.votes.push(payload.player);
          cmd.whisper(mc, payload.player, `You voted for a restart. Percent is at ${vote.votes.length / options.CONNECTED_PLAYERS.count}, ${VOTES_FOR_RESTART} or above needed.`);
          if(vote.votes.length / options.CONNECTED_PLAYERS.count >= VOTES_FOR_RESTART) {

            cmd.restart(mc);
            vote.executed = true;

          }
        }

      }

      vote.save(function(){});
    }else {
      var vote = new RestartVote({
        timestamp: Date.now(),
        votes: [payload.player],
        executed: false
      });
      vote.save(function(err){
        cmd.whisper(
          mc,
          payload.player,
          `You voted for a restart. Percent is at ${vote.votes.length / options.CONNECTED_PLAYERS.count}, ${VOTES_FOR_RESTART} or above needed.`
        );
      });
    }
  });

};

module.exports = vote_for_day;
