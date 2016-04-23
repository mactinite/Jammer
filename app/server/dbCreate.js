var r = require('rethinkdb');


r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err;

    r.dbList().contains('Event_Calendar')
        .do(function(databaseExists) {
            return r.branch(
                databaseExists,
                { created: 0 },
                r.dbCreate('Event_Calendar')
            );
        }).run(conn, function(err, res) {
            if (err) throw err;
            console.log(res);
        });

    setTimeout(function() {
        r.db('Event_Calendar').tableList().contains('Events')
            .do(function(tableExists) {
                return r.branch(
                    tableExists,
                    { created: 0 },
                    r.db('Event_Calendar').tableCreate('Events')
                );
            }).run(conn, function(err, res) {
                if (err) throw err;
                console.log(res);
            });
    }, 0);

});
