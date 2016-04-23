var r = require('rethinkdb');

function streamEvents() {
    r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
        if (err) throw err;

        var events = r.db('Event_Calendar').table('Events');

        setTimeout(function() {
            events.filter({ "description": "Anime Convention" }).orderBy('description').run(conn, function(err, result) {
                if (err) throw err;
                console.log(result);
            });
        }, 0);


    });
}


