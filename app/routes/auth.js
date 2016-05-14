var router = require('express').Router();
var r = require('rethinkdb');
var db = require('../../config/database');
var p = r.connect({ db: db.schema });
var bodyParser = require('body-parser');
var User = require('../model/user');



module.exports = (function (passport, GitHubStrategy) {
    passport.use(new GitHubStrategy({
        clientID: "1808dd1ef99c8682c796",
        clientSecret: "a01d81440641ced60eb90514b4973670210eafef",
        callbackURL: "http://127.0.0.1:3010/auth/github/callback"
    }, function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        p.then(function (conn) { });
        r.connect({ host: 'localhost', port: 28015 }).then(function (c) {
            return r.db("Jammer").table("User").get('asdf');
        })
            .then(function (cursor) {
                cursor.each(function (err, item) {
                    console.log(item);
                });
            });
    }));

    router.get('/login',
        passport.authenticate('github', { scope: ['user:email'] }));

    router.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    router.post('/register', function (req, res) {
        var user = new User({
            local: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
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

    return router;
});