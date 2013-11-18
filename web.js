var mongo = require('mongodb');
var express = require("express");
var http = require('http');
var fs = require('fs');

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('main page!');
});


app.get('/importhuman', function(request, response) {
    var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
    
    var filename = __dirname+'/humannames.csv';
    console.log('reading '+filename);
    var readStream = fs.createReadStream(filename);
    readStream.on('open', function () {
      readStream.pipe(response);
    });
    readStream.on('error', function(err) {
      response.end(err);
    });

    //mongo.Db.connect(mongoUri, function (err, db) {
    //  db.collection('names', function(er, collection) {
    //    collection.insert({'name': 'myvalue'}, {safe: true}, function(er,rs) {});
    //  });
    //});      

    //response.send('imported human names');

});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

