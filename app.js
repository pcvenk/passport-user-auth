var path                  = require('path'),
    mongoose              = require('mongoose'),
    bodyParser            = require('body-parser'),
    session               = require('express-session'),
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

//MIDDLEWARE SETUP

//Express session
app.use(session({
    secret: 'Express-passport-user-auth',
    resave: false,
    saveUninitialized: false
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Body-parser
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
   res.render('home');
});

app.get('/secret', function(req, res){
    res.render('secret');
});

//===========
//Auth routes
//===========

app.get('/register', function(req, res){
   res.render('register');
});

app.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }

        passport.authenticate('local')(req, res, function(){
           res.redirect('/secret');
        });


    })
});

app.listen(3000, function(){
   console.log('Server listening on port 3000');
});