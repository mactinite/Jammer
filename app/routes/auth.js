var router = require('express').Router();
var r = require('rethinkdb');
var db = require('../../config/database');
var client = require('../../config/client').github;
var p = r.connect({ db: db.schema });
var bodyParser = require('body-parser');
var User = require('../model/user');
var bcrypt = require('bcryptjs');
var uuid = require('uuid');



module.exports = (function (passport, GitHubStrategy) {
    passport.use(new GitHubStrategy({
        clientID: client.clientID,
        clientSecret: client.clientSecret,
        callbackURL: client.callbackURL
    }, function (accessToken, refreshToken, profile, cb) {
        var user = new User({
            github: {
                id: uuid.v4(),
                token: accessToken,
                name: profile.displayName,
                email: profile.emails[0].value,
                profileImgURI: profile._json.gravatar_id || profile._json.avatar_url
            }
        });
        user.saveAll().then(function (result) {
            p.then(function (conn) {
                r.table(db.table.user).insert(result).run(conn, function (err, response) {
                    if (err) throw err;
                });
            }).error(function (error) {
                throw error;
            });
        });
        return cb(null, user);
    }));

    router.get('/login',
        passport.authenticate('github', { scope: ['user:email'] }));

    router.get('/auth/github/callback',
        passport.authenticate('github', { sucessRedirect: '/test', failureRedirect: '/login', failureFlash: true }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.send(req.session);
        });

    router.post('/register', function (req, res) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        var user = new User({
            local: {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
        });
        user.saveAll().then(function (result) {
            p.then(function (conn) {
                r.table(db.table.user).insert(result).run(conn, function (err, response) {
                    if (err) throw err;
                    res.send(result);
                });
            }).error(function (error) {
                throw error;
            });
        });
    });

    router.get('/sessionTest', function (req, res) {
        res.send(req.session);
    });

    return router;
});