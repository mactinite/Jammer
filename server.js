'use strict';
var express = require('express');
var app = express();
var flash = require('express-flash');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var path = require('path');
var uuid = require('uuid');
var RDBStore = require('express-session-rethinkdb')(session);
var client = require('./config/client').session;
var exphbs = require('express-handlebars');
var _ = require('lodash');
var logger = require('./app/logger');

var rdbStore = new RDBStore({
  connectOptions: {
    servers: [
      { host: '127.0.0.1', port: 28015 },
    ],
    db: 'Jammer',
    discovery: false,
    pool: true,
    buffer: 50,
    max: 1000,
    timeout: 20,
    timeoutError: 1000
  },
  table: 'session',
  sessionTimeout: 86400000,
  flushInterval: 60000,
  debug: true
});


//Looks in public directy for resource first, then defaults to root
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
  extended: true
}));

app.use(flash());

app.use(session({
  genid: function (req) {
    return uuid.v4();
  },
  secret: client.secret,
  cookie: {
    httpOnly: false,
    secure: false
  },
  resave: false,
  saveUninitialized: false,
}));

// Set locals here for templates
app.use(function (req, res, next) {
  res.locals.path = req.get('host');
  res.locals.session = req.session;
  res.locals.session.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.name = _.get(req.session, 'passport.user.github.name');
  next();
});

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

app.get('/', function(req, res){
  res.render('index');
});

var posts = require('./app/routes/posts')();
app.use('/api/', posts);

var auth = require('./app/routes/auth')(passport, GitHubStrategy);
app.use('/', auth);

var account = require('./app/routes/root')();
app.use('/account', account);

var tests = require('./app/routes/tests')();
app.use('/test', tests);

