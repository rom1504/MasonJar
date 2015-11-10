const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var { cmd } = require('../tools');
var { VOTES_TO_UNBAN } = require('../../config');

var UnbanVote = new Schema({
  player: String,
  votes: Array,
  unbanned: { type: Boolean, default: false }
});

mongoose.model('UnbanVote', UnbanVote);
var UnbanVote = mongoose.model('UnbanVote');

const vote_to_unban = function(mc, payload, args) {
  args = args.toLowerCase();
  var query = UnbanVote.where({ player: args });
  query.findOne(function (err, vote) {
    if (err) return handleError(err);

    if (vote) {
      if ( vote.unbanned ) {
        cmd.whisper(
          mc,
          payload.player,
          `${args} is already unbanned.`
        );
      } else {
        if(vote.votes.indexOf(payload.player) > -1) {
          cmd.whisper(
            mc,
            payload.player,
            `You've already voted to unban: ${args}, ${VOTES_TO_UNBAN - vote.votes.length} vote(s) needed.`
          );
        }else {
          vote.votes.push(payload.player);
          if(vote.votes.length >= VOTES_TO_UNBAN) {
            vote.banned = true;
          }
          vote.save(function(){
            if(vote.votes.length >= VOTES_TO_UNBAN) {
              cmd.unban(args, VOTES_TO_UNBAN);
              cmd.say(`${args} unbanned automatically after ${VOTES_TO_UNBAN} votes!`);
            }
          });
        }
      }
    }else {
      var vote = new UnbanVote({
        player: args,
        votes: [payload.player],
        unbanned: false
      });
      vote.save(function(err){
        cmd.whisper(
          mc,
          payload.player,
          `You've voted to unban ${args}, ${VOTES_TO_UNBAN - 1} vote(s) until the unban passes.`
        );
      });
    }
  });

};

module.exports = vote_to_unban;
