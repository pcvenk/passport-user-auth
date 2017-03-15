var path    = require('path');
var express = require('express');
var app     = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('home');
});

app.listen(3000, function(){
   console.log('Server listening on port 3000');
});