const mcParser = function(line, callback) {

  var recordArray = line.split(']:');

  var timeStamp = recordArray[0].split('] [')[0].replace('[','');
  var messageLevel = recordArray[0].split('] [')[1].split('/')[1];

  var outObject = {
    'time': timeStamp,
    'type': messageLevel,
    'player': false,
    'command': false,
    'message': false
  };

  if( (recordArray[1].indexOf('> $') > 0) && (recordArray[1].startsWith(' <')) ){

    outArray = (recordArray[1].replace('<','').replace('> ','\t').replace(')',')\t')).split('\t')

    outObject.player = outArray[0].trim();
    outObject.command = outArray[1].trim();

  } else {

    if(recordArray[1].indexOf('<', 0) > 0) {
      outObject.player = recordArray[1].split('>')[0].replace('<','').trim();
      outObject.message = recordArray[1].split('>')[1].trim();
    }else {
      outObject.message = recordArray[1].trim();
    }

  }


  callback(outObject);
};

module.exports = mcParser;
