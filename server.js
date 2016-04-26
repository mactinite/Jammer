'use strict';
var express = require('express');
var app = express();
var r = require('rethinkdb');
var passport = require('passport');
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github2').Strategy;



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

var auth = require('./app/auth/oauth')(passport, GitHubStrategy);
app.use('/', auth);





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

