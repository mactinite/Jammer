var express = require('express');
var app = express();
var r = require('rethinkdb');


app.use(express.static(__dirname));
 
var port = 3010;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});

app.get('/Events', function (req, res, next) {
  res.send('asdfS');
});

