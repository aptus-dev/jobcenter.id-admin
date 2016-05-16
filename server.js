// Dependencies goes here
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');

// Custom files goes here
var secret = require('./config/secret');
var User = require('./models/user');

var app = express();

// Database connection goes here
mongoose.connect(secret.database, function(err) {
    if(err) { 
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

// Middleware for use in express
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({ url: secret.database, autoReconnect: true })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes goes here - to remove into /routes folder later
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// app.get('/register', function(req, res) {
//     res.sendFile(__dirname + '/public/register.html');
// });

// app.get('/login', function(req, res) {
//     res.sendFile(__dirname + '/public/pages-login.html');
// });

// express server - change port to whatever as needed
app.listen(process.env.PORT, function(err){
    if (err) throw err;
    console.log("Server is running at port: " + process.env.PORT + " and IP: " + process.env.IP );
    
});
