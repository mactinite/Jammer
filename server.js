var express = require('express');
 
var app = express();
app.use(express.static(__dirname));
 
var port = 8080;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});

app.get('/fff', function (req, res, next) {
  res.send('asdfS');
});