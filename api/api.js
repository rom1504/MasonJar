const express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());

var { basic, player, players, factions } = require('./modules');

const passport = require('passport');

var API = function() {
  app.get('/', function (req, res) {
    res.json({
      routes: [
        {
          name: 'basic',
          desc: 'Basic information like active player count.'
        },
        {
          name: 'player/:playername',
          desc: 'Get public data on a listed player (case sensitive).'
        },
        {
          name: 'players/:limit',
          desc: 'Get all players sorted by time online time.'
        },
        {
          name: 'factions/:limit',
          desc: 'Get a list of all factions, sorted by power'
        }

      ]
    });
  });

  app.get('/basic', function(req, res){
    basic(req, res);
  });

  app.get('/player/:player', function(req, res){
    player(req, res);
  });

  app.get('/players/:limit', function(req, res){
    players(req, res);
  });

  app.get('/factions/:limit', function(req, res){
    factions(req, res);
  });
  
  app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    
    // I have no idea if this works
    res.redirect('/users/' + req.user.username);
  });


  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('MasonJar API listening at http://%s:%s', host, port);
  });
};

module.exports = API;
