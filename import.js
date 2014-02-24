var mongo = require('mongodb');
var express = require("express");
var http = require('http');
var fs = require('fs');
var async = require("async")
     var i = 8844;
     var mnames = require("./humannames.js");
     var names  = mnames.names().names;
     var len = names.length;
     var mongoUri = "mongodb://heroku_app19585045:2a467h22aghopa25bp8e5823ia@ds033499.mongolab.com:33499/heroku_app19585045" || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
     var MongoClient = require('mongodb').MongoClient, format = require('util').format;

     async.whilst(function () {
  		return i <= len;
	},
	function (next) {
		console.log(names[i]);
  		MongoClient.connect(mongoUri, function(err, db) {
    			if(err) {console.log(err); return;}
    			db.collection('names').insert(names[i], {w:1}, function(err, objects) { db.close();});
  		i++;
                next();
		});
		
     }, function (err){  });

