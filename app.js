var path                  = require('path'),
    mongoose              = require('mongoose'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User                  = require('./models/user'),
    express               = require('express'),
    app                   = express();

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