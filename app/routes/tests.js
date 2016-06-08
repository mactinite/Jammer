'use strict';
var r = require('rethinkdb');
var db = require('../../config/database');
var p = r.connect({ db: db.schema });
var router = require('express').Router();
module.exports = (function () {

    router.get('/asdf', function (req, res) {
        res.send(req.session);
    });

    router.post('/logout', function(req, res){
        req.logout();
        res.redirect('/test.html');
    });

    return router;
});