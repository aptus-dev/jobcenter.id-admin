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

// // Mailgun details
// var Mailgun = require('mailgun-js');
// var api_key = 'pubkey-05685053792b24137cca1724178974b0';
// var domain = 'jobcenter.id'
// var from_who = 'jobcenter.id@gmail.com'


// Routes goes here - to remove into /routes folder later
app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});

// contact us route using nodemailer
app.post('/contact', function(req, res) {
    
    var name = req.body.name;
    var from = req.body.email;
    var contact = req.body.contact;
    var message = req.body.comment;
    var to = 'fargobie@gmail.com';
    
    //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
    var smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "fargobie@gmail.com",
            pass: "yaqhtrmawodljxkf"
        }
    });
    
    //Mail options
    var mailOpts = {
        from: from,
        to: to, 
        subject: 'new message from '+name+' ('+contact+')!',
        text: message
    };

    smtpTrans.sendMail(mailOpts, function(error, response) {
        //Email not sent
        if (error) {
            console.log(error);
        }
        //Yay!! Email sent
        else {
            console.log('Message sent: ' + response);
        }
    });
});



// // Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// // The index redirects here
// app.get('/submit/:mail', function(req,res) {

//     //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
//     var mailgun = new Mailgun({apiKey: api_key, domain: domain});

//     var data = {
//     //Specify email data
//       from: from_who,
//     //The email to contact
//       to: req.params.mail,
//     //Subject and text data  
//       subject: 'Hello from Mailgun',
//       html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
//     }

//     //Invokes the method to send emails given the above data with the helper library
//     mailgun.messages().send(data, function (err, body) {
//         //If there is an error, render the error page
//         if (err) {
//             res.render('error', { error : err});
//             console.log("got an error: ", err);
//         }
//         //Else we can greet    and leave
//         else {
//             //Here "submitted.jade" is the view file for this landing page 
//             //We pass the variable "email" from the url parameter in an object rendered by Jade
//             res.render('submitted', { email : req.params.mail });
//             console.log(body);
//         }
//     });

// });

// app.get('/validate/:mail', function(req,res) {
//     var mailgun = new Mailgun({apiKey: api_key, domain: domain});

//     var members = [
//       {
//         address: req.params.mail
//       }
//     ];
// //For the sake of this tutorial you need to create a mailing list on Mailgun.com/cp/lists and put its address below
//     mailgun.lists('NAME@MAILINGLIST.COM').members().add({ members: members, subscribed: true }, function (err, body) {
//       console.log(body);
//       if (err) {
//             res.send("Error - check console");
//       }
//       else {
//         res.send("Added to mailing list");
//       }
//     });

// })

// app.get('/invoice/:mail', function(req,res){
//     //Which file to send? I made an empty invoice.txt file in the root directory
//     //We required the path module here..to find the full path to attach the file!
//     var path = require("path");
//     var fp = path.join(__dirname, 'invoice.txt');
//     //Settings
//     var mailgun = new Mailgun({apiKey: api_key, domain: domain});

//     var data = {
//       from: from_who,
//       to: req.params.mail,
//       subject: 'An invoice from your friendly hackers',
//       text: 'A fake invoice should be attached, it is just an empty text file after all',
//       attachment: fp
//     };


//     //Sending the email with attachment
//     mailgun.messages().send(data, function (error, body) {
//         if (error) {
//             res.render('error', {error: error});
//         }
//             else {
//             res.send("Attachment is on its way");
//             console.log("attachment sent", fp);
//             }
//         });
// })


// express server - change port to whatever as needed
app.listen(process.env.PORT, function(err) {
    if (err) throw err;
    console.log("Server is running at port: " + process.env.PORT + " and IP: " + process.env.IP);

});