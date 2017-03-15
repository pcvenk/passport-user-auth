var path     = require('path');
var mongoose = require('mongoose');

var express  = require('express');
var app      = express();

//mongoose connection
mongoose.connect('mongodb://localhost/userAuth');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('home');
});

app.get('/secret', function(req, res){
    res.render('secret');
});

app.listen(3000, function(){
   console.log('Server listening on port 3000');
});