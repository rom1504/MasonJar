const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var { cmd } = require('../tools');
var { VOTES_TO_BAN } = require('../../config');

var BanVote = new Schema({
  player: String,
  votes: Array,
  banned: { type: Boolean, default: false }
});

mongoose.model('BanVote', BanVote);
var BanVote = mongoose.model('BanVote');

const vote_to_ban = function(mc, payload, args) {
  args = args.toLowerCase();
  var query = BanVote.where({ player: args });
  query.findOne(function (err, vote) {
    if (err) return handleError(err);

    if (vote) {
      if ( vote.banned ) {
        cmd.whisper(
          payload.player,
          `${args} is already banned.`
        );
      } else {
        if(vote.votes.indexOf(payload.player) > -1) {
          cmd.whisper(
            payload.player,
            `You've already voted to ban: ${args}, ${VOTES_TO_BAN - vote.votes.length} vote(s) needed.`
          );
        }else {
          vote.votes.push(payload.player);
          if(vote.votes.length >= VOTES_TO_BAN) {
            vote.banned = true;
          }
          vote.save(function(){
            if(vote.votes.length >= VOTES_TO_BAN) {
              cmd.ban(args, VOTES_TO_BAN);
              cmd.say(`${args} banned automatically after ${VOTES_TO_BAN} votes!`);
            }
          });
        }
      }
    }else {
      var vote = new BanVote({
        player: args,
        votes: [payload.player],
        banned: false
      });
      vote.save(function(err){
        cmd.whisper(
          mc,
          payload.player,
          `You've voted to ban ${args}, ${VOTES_TO_BAN - 1} vote(s) until the ban passes.`
        );
      });
    }
  });

};

module.exports = vote_to_ban;
