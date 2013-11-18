var mongo = require('mongodb');
var express = require("express");

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('main page!');
});


app.get('/mongotest', function(request, response) {
    var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
    response.send('mongotest page!');
    mongo.Db.connect(mongoUri, function (err, db) {
      db.collection('mydocs', function(er, collection) {
        collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {});
      });
    });      
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

