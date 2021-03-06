const spigotParser = function(line, callback) {
  var lineType = line
    .split(']:')[0]
    .substr(
      line.split(']:')[0].length - 4, line.split(']:')[0].length
    );

  var player = (function(){
    if(line.indexOf('INFO]: <') > -1){
      var p = line.split('INFO]: <')[1].split('>')[0];
      if(p.indexOf(' ') > -1) {
        p = p.split(' ')[1];
      }
      return p;
    }else {
      return false;
    }
  })();

  var command = (function(){
    var re = new RegExp(/\[.* INFO]: .* issued mycmd command .* \/api/g);

    if(re.test(line)) {
	  
      var player = line.split(':')[3].split(' ')[1];
      
      var command = line
      	.split('/api')[1]
      	.split(')')[0]
      	.substr(
            1, 
            line
  				.split('/api')[1]
      			.split(')')[0].length -1);
      
      var args = command.split('(')[1];
       
      command = command.split('(')[0];
        
      if(!args){
        args = 'noargs';
      }
  	  return {
        player,
        command,
        args
      };
    }else {
      return false;
    }

  })();

  if(command && command.player){
    player = command.player;
  }

  var message = (function() {
    if( !command && player ) {
      return line.replace(/\[.*]: <.*>/g, "");
    }else {
      return false;
    }
  })();

  var payload = {
    time: Date.now(),
    type: lineType,
    message: message,
    player: player,
    command: (command) ? command : false
  };

  callback(payload);
};

module.exports = spigotParser;
