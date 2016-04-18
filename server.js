var express = require('express');
var app = express();
var r = require('rethinkdb');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;


app.use(express.static(__dirname));

var port = 3010;
app.listen(port, function () {
  console.log('server listening on port ' + port);
});

passport.use(new GitHubStrategy({
  clientID: "1808dd1ef99c8682c796",
  clientSecret: "a01d81440641ced60eb90514b4973670210eafef",
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    console.log(profile);
    done(null, profile);
  });
}));

app.post('/login', passport.authenticate('github'));

app.get("/auth/github/callback", function (req, res) {
  console.log(req.server);
  res.redirect("/test.html");
});