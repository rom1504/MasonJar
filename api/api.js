const express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());

var { basic } = require('./modules');

var API = function() {
  app.get('/', function (req, res) {
    res.json({
      routes: [
        {
          name: 'basic',
          desc: 'Basic information like active player count.'
        },
        {
          name: 'banlist',
          desc: 'List of all banned players.'
        }
      ]
    });
  });

  app.get('/basic', function(req, res){
    basic(req, res);
  });

  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('MasonJar API listening at http://%s:%s', host, port);
  });
};

module.exports = API;
