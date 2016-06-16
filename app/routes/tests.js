'use strict';
var r = require('rethinkdb');
var db = require('../../config/database');
var p = r.connect({ db: db.schema });
var router = require('express').Router();
module.exports = (function () {

    router.get('/', function (req, res) {
        res.render('test');
    });

    return router;
});
