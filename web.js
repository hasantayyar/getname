var mongo = require('mongodb');
var express = require("express");
var http = require('http');
var fs = require('fs');
var async = require("async")
var counter = 0;
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('main page!');
});


app.get('/importdata', function(request, response) {
     var i =0;
     var mnames = require("./humannames.js");
     var names  = mnames.names();
     var len = names.length;
     var mongoUri = "mongodb://tayyar:123450@ds053658.mongolab.com:53658/heroku_app19585045" || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
     var MongoClient = require('mongodb').MongoClient, format = require('util').format;

     async.whilst(function () {
  		return i <= len;
	},
	function (next) {
  		MongoClient.connect(mongoUri, function(err, db) {
    			if(err) throw err;
    			db.collection('names').insert({name: date[1]}, {w:1}, function(err, objects) {});
  		i++;
                next();
		});
		
     }, function (err){  });


});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
