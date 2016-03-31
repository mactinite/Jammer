var express = require('express');
var app = express();
var r = require('rethinkdb');
var passport = require('passport');
var local = require('passport-local').Strategy;


app.use(express.static(__dirname));
 
var port = 3010;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
