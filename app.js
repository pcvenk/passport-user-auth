'use strict';

let path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user'),
    express = require('express'),
    app = express();

//mongoose connection
mongoose.connect('mongodb://localhost/userAuth');
let db = mongoose.connection;
    db.on('error', (error) => console.warn(error));
    db.once('open', () => console.log('Good to go'));

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

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Body-parser
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => res.render('home'));


app.get('/secret', isLoggedIn, (req, res) => res.render('secret'));

//===========
//Auth routes
//===========

app.get('/register', (req, res) => res.render('register'));

app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }

        passport.authenticate('local')(req, res, () => {
            res.render('secret', {user: user});
        });


    })
});

app.get('/login',(req, res) => res.render('login'));

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/secret',
//     failureRedirect: '/login'
// }), function (req, res) {
//     res.render('secret', {user: req.user});
// });

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    res.render('secret', {user: req.user});
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if(req.user) {
        // console.log(req.user);
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});