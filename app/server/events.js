var r = require('rethinkdb');

function streamEvents(){
r.connect({host: 'localhost', port: 28015 }).then(function(c) {
  return r.db("Event_Calendar").table("Events").changes().run(c);
})
.then(function(cursor) {
  cursor.each(function(err, item) {
    console.log(item);
  });
});
}