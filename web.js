var mongo = require('mongodb');
var express = require("express");

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('main page!');
});


app.get('/importhuman', function(request, response) {
    var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
    response.send('importing human names');
    var fs = require('fs'),
    readline = require('readline');
    var rd = readline.createInterface({
        input: fs.createReadStream('//Users/tayyar/Dropbox/Scripts/node-projects/getname/humannames.csv'),
        output: process.stdout,
        terminal: false
    });

    rd.on('line', function(line) {
        console.log(line);
    });

    mongo.Db.connect(mongoUri, function (err, db) {
      db.collection('names', function(er, collection) {
        collection.insert({'name': 'myvalue'}, {safe: true}, function(er,rs) {});
      });
    });      
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

