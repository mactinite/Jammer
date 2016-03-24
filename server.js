var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var fs = require('fs');



app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(express.static(__dirname));

var port = 8080;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});


app.get('/Event', function(req, res, next) {
    //var id = req.body.id;
    var content = fs.readFileSync("Data/events.json");
    var json = JSON.parse(content);
    res.set('Content-Type','application/json')
    res.send(json);
});
