var mongo = require('mongodb');
var express = require("express");
var http = require('http');
var fs = require('fs');
var counter = 0;
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('main page!');
});


app.get('/importdata', function(request, response) {
    var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
    
    var filename = __dirname+'/humannames.csv';
    console.log('reading '+filename);
    var input = fs.createReadStream(filename);
    readLines(input, addnew);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

function readLines(input, addnew) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      addnew(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      addnew(remaining);
    }
  });
}

function addnew(data) {
  data = data.split(";");
  console.log(data);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('names', function(er, collection) {
      collection.insert({'name': data[1]}, {safe: true}, function(er,rs) {});
      });
  });    
}


    
