'use strict';
var r = require('rethinkdb');
var db = require('../../config/database');
var p = r.connect({ db: db.schema });
var router = require('express').Router();
module.exports = (function () {

    router.get('/asdf', function (req, res) {
        console.log(req.body);
        req.session.name = Date.now();
        res.send(req.session);
    });

    return router;
});