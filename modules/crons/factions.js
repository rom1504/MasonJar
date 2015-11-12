const mongoose = require('mongoose');
const path = require('path');
const walk = require('walk');
const util = require('util');
const jsonfile = require('jsonfile');

var FACTIONS_PLAYERS = path.join(__dirname, '../../server/mstore/factions_mplayer');
var FACTIONS_FACTIONS = path.join(__dirname, '../../server/mstore/factions_faction');

var Faction = mongoose.model('Faction');

const factions = function() {
  var FACTIONS = {};

  var walker  = walk.walk(FACTIONS_PLAYERS, { followLinks: false });

  walker.on('file', function(root, stat, next) {
      if(stat.name.match(/.*-.*-.*-.*-.*\.json/)){
        jsonfile.readFile(`${FACTIONS_PLAYERS}/${stat.name}`, function(err, obj) {
          if(obj.factionId) {
            jsonfile.readFile(`${FACTIONS_FACTIONS}/${obj.factionId}.json`, function(err, faction_obj) {

              var UUID = stat.name.split('.')[0];
              var oldFactionData = FACTIONS[obj.factionId];
              console.log(UUID);
              console.log(oldFactionData);
              FACTIONS[obj.factionId] = {
                power: (oldFactionData && oldFactionData.power) ?
                  oldFactionData.power += obj.power : obj.power,
                id: obj.factionId,
                updatedAt: Date.now(),
                name: faction_obj.name,
                description: faction_obj.description
              };
            });
          }
        });
      }
      next();
  });

  walker.on('end', function() {
    for (FACTION in FACTIONS) {
      var f = FACTIONS[FACTION];
      var query = Faction
        .find({'factionId': f.id})
        .sort({'updatedAt': 'desc'});

      query.findOne(function (err, fact) {
        if (err) return handleError(err);
        if(fact) {
          console.log(fact);
          fact.power = f.power;
          fact.name = f.name;
          fact.description = f.description;
          fact.save(function(err){
            if(err) console.log(err);
          });
        }else {
          var faction = new Faction({
            power: f.power,
            factionId: f.id,
            name: f.name,
            description: f.description
          });
          faction.save(function(err){
            if(err) console.log(err);
          });
        }
      });
    }

  });
};
module.exports = factions;
