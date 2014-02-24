var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var counter = 0;
var app = express();
app.use(express.logger());



app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/name/:id', function(req,res){
  mongo.Db.connect(mongoUri, function (err, db) {
   db.collection('names', function(er, collection) {
       collection.findOne({"_id":new ObjectID(req.params.id)},function(err,data) {
            data.title = data.a + " - " +data.t;
            data.id = data._id;
           res.render('name', data);
       });
     });
  });

});
app.get('/rand/:gender',function(req,res){
  var name = random_name(req.gender,res);
});


var random_name = function(type,res){
  mongo.Db.connect(mongoUri, function (err, db) {
    var count = 1;
    db.collection('names', function(er, collection) {
      var q = {"type":type};
      collection.count(q,function(err,data) {
        if(!data){
          res.end();
          return false;
        }
        count = data;
        db.collection('names', function(er, collection) {
          var rnd = Math.floor(Math.random() * count) + 1;
          collection.find(q).limit(-1).skip(rnd).next(function(err,data) {
            if(!data){
              res.end();
              return false;
            }
            res.writeHead(302, {
              'Location': '/name/'+data._id
            });
            res.end();
            return false;
          });
        });
      });
    });
  });
}


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

