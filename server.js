// Dependencies goes here
var express = require('express');
var morgan = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');

// Nodemailer
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://jobcenter.id%40gmail.com:AptusPac14@smtp.gmail.com');

var app = express();

// Middleware for use in express
app.use(express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.use(bodyParser.json()); //needed for req.body
app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes goes here - to remove into /routes folder later
app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});



// express server - change port to whatever as needed
app.listen(process.env.PORT, function(err) {
    if (err) throw err;
    console.log("Server is running at port: " + process.env.PORT + " and IP: " + process.env.IP);

});