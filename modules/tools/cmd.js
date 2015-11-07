module.exports = {
  say: function(mc, msg) {
    mc.writeServer(`say ${msg}\n`);
  },
  whisper: function(mc, player, msg) {
    mc.writeServer(`whisper ${player} ${msg}\n`);
  },
  give: function(mc, items, player) {
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
  }
};
