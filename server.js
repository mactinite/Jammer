'use strict';
var express = require('express');
var app = express();
var r = require('rethinkdb');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var bodyParser = require('body-parser');


app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
  extended: true
}));

var port = 3010;
app.listen(port, function () {
  console.log('server listening on port ' + port);
});

/* 
    ==================
          Routes      
    ==================
*/
var posts = require('./app/routes/posts');
app.use('/', posts);


passport.use(new GitHubStrategy({
  clientID: "1808dd1ef99c8682c796",
  clientSecret: "a01d81440641ced60eb90514b4973670210eafef",
  callbackURL: "http://127.0.0.1:3010/auth/github/callback"
}, function (accessToken, refreshToken, profile, cb) {
  console.log(profile);
  // r.connect({ host: 'localhost', port: 28015 }).then(function (c) {
  //   return r.db("Jammer").table("User").get('asdf');
  // })
  //   .then(function (cursor) {
  //     cursor.each(function (err, item) {
  //       console.log(item);
  //     });
  //   });
}));

app.get('/login',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/dbTest', function (req, res, next) {
  var connection = null;
  r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
    if (err) throw err;
    connection = conn;
    r.db('Jammer').table('User').get('asdf').
      run(connection, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result, null, 2));
      });
  });
});

