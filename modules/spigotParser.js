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
    var re = new RegExp(/\> \#.*\(.*\)/g);

    if(re.test(line)) {

      var dispatchedCommand = line
        .match(/\> \#.*\(.*\)/g)[0]
        .substr(2, line.match(/\> \#.*\(.*\)/g)[0].length);

      var command = dispatchedCommand
        .split('(')[0]
        .replace('#', '');

      var args = dispatchedCommand
        .split('(')[1]
        .split(')')[0]
        .replace("'", "")
        .replace('"', '');

      return {command, args};

    }else {
      return false;
    }

  })();

  var message = (function() {
    if( !command && player ) {
      return line.replace(/\[.*]: <.*>/g, "");
    }else {
      return false;
    }
  })();

  console.log(command);
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
