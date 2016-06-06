'use strict';
var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var path = require('path');
var uuid = require('uuid');
var RDBStore = require('express-session-rethinkdb')(session);

var rdbStore = new RDBStore({
  connectOptions: {
    servers: [
      { host: '127.0.0.1', port: 28015 },
    ],
    db: 'Jammer',
    discovery: false,
    pool: false,
    buffer: 50,
    max: 1000,
    timeout: 20,
    timeoutError: 1000
  },
  table: 'session',
  sessionTimeout: 86400000,
  flushInterval: 60000,
  debug: false
});


//Looks in public directy for resource first, then defaults to root
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
  extended: true
}));


app.use(session({
  genid: function () { uuid.v4(); },
  secret: 'Jammer is the jam',
  cookie: {httpOnly: false},
  resave: false,
  saveUninitialized: true,
  store: rdbStore
}))

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(passport.initialize());

app.use(passport.session());

var port = 3010;
app.listen(port, function () {
  console.log('server listening on port ' + port);
});

/* 
    ==================
          Routes      
    ==================
*/

var posts = require('./app/routes/posts')();
app.use('/api/', posts);

var auth = require('./app/routes/auth')(passport, GitHubStrategy);
app.use('/', auth);

var tests = require('./app/routes/tests')();
app.use('/test', tests);

app.get('/jamPosts', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/test.html'));
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

