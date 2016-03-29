var r = require('rethinkdb');

r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err;
    
    var events = r.db('Event_Calendar').table('Events');
    
    // setTimeout(function() {
    //     r.db('Event_Calendar').table('Events').insert(
    //         { 
    //             "id": 3,
    //             "name": "SakuraCon",
    //             "description": "Anime Convention",
    //             "location": "Washington State Convention Center",
    //             "startDate": "2016-03-24T17:42:25.902Z",
    //             "endDate": "2016-03-24T17:42:25.902Z",
    //             "attending": [
    //             {
    //                 "name": "Justin",
    //                 "status": "Attending"
    //             },
    //             {
    //                 "name": "Matt",
    //                 "status": "Tentative"
    //             }
    //             ]
    //         }
    //         ).run(conn, function(err, res) {
    //         if (err) throw err;
    //         console.log(res);
    //     });
    // }, 0);
    
    // r.db('Event_Calendar').table('Events').getAll().run(conn, function(err, res){
    //     if(err) throw err;
    //     console.log(res);
    // })

setTimeout(function(){
    events.filter({"description": "Anime Convention"}).orderBy('description').run(conn, function(err, result) {
    if (err) throw err;
    console.log(result);
    });
}, 0);  


});
