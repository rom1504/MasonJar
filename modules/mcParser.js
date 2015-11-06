const mcParser = function(line, callback) {
  var head = line
    .split(/:(?=[^\]]*(?:\[|$))/g)[0]
      .split(/ (\[[a-zA-Z:0-9 \/]*\:?\]|[<>a-z])+/g);

  var tail = line
    .split(/:(?=[^\]]*(?:\[|$))/g)[1]
      .split('>');

  var command = (tail[1]) ? tail[1]
    .substr(1,tail[1].length)
      .split('$') : false;

  var payload = {
    time: head[0].replace(/\[|\]/g,''),
    type: (head[1]) ? head[1].split('/')[1].replace(/\[|\]/g,'') : false,
    player: (tail[0].indexOf("<") > -1) ?
      tail[0].replace(/\ |\</g,'') : false || false,
    command: (command && command[0] === "" && command.length > 1) ?
      command[1].split(' ')[0] : false,
    message: (command && command[0] === "" && command.length > 1) ?
      false : (tail[1]) ? tail[1].replace(/^\s+|\s+$/g,'') : false
  };

  callback(payload);
};

module.exports = mcParser;
