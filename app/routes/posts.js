var router = require('express').Router();
var r = require('rethinkdb');
var db = require('../../config/database');
var p = r.connect({ db: db.schema });

module.exports = (function () {

    //Get jam posts with optional time range parameter
    router.get('/jamPosts', function (req, res, next) {
        p.then(function (conn) {
            if (req.body.date !== undefined) {
                //TODO: Get filter by date working
                r.table(db.table.jam)
                    .filter((r.row["startDate"] - new Date().getDate()) > 0)
                    .run(conn, function (err, result) {
                        if (err) throw err;
                        res.send(JSON.stringify(result, null, 2));
                    });
            }

            else {
                r.table(db.table.jam).get('asdf')
                    .run(conn, function (err, result) {
                        if (err) throw err;
                        //res.send(db.connect());
                        res.send(JSON.stringify(result, null, 2));
                    });
            }

        }).error(function (error) {
            throw error;
        });
        // r.connect(db.db, function (err, conn) {
        //     if (err) throw err;
        //     if (req.body.date !== undefined) {
        //         //TODO: Get filter by date working
        //         r.table(db.table.jam)
        //             .filter((r.row["startDate"] - new Date().getDate()) > 0)
        //             .run(conn, function (err, result) {
        //                 if (err) throw err;
        //                 res.send(JSON.stringify(result, null, 2));
        //             });
        //     }
        //     else {
        //         r.table(db.table.jam).get('asdf')
        //             .run(conn, function (err, result) {
        //                 if (err) throw err;
        //                 res.send(JSON.stringify(result, null, 2));
        //             });
        //     }
        // });
    });

    return router;
})();