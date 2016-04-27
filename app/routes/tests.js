module.exports = (function () {
    'use strict';
    var router = require('express').Router();

    router.get('/asdf', function (req, res) {
        console.log(req.body);
        console.log("hello");
        res.send("you da best");
    });

    return router;
})();