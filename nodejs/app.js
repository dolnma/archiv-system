const express = require('express');
const app = express();
const router = express.Router();
var mysql = require('mysql');
var ping = require("net-ping");
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'dmshopcz@gmail.com',
        pass: 'Alfa123456'
    }
});

let mailOptions = {
    from: 'dolnma9@gmail.com',
    to: 'receivers.email@domain.com',
    subject: 'Test',
    text: 'Hello World!'
};

router.get('/send', function (req, res) {

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });

});

// router.post('/send', (req, res, next) => {
//   var name = "Marek"
//   var email = "dolnma9@gmail.com"
//   var message = "Ahoj blázne"
//   var content = `name: ${name} \n email: ${email} \n message: ${content} `

//   var mail = {
//     from: name,
//     to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  //Change to email address that you want to receive messages on
//     subject: 'New Message from Contact Form',
//     text: content
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         msg: 'fail'
//       })
//     } else {
//       res.json({
//         msg: 'success'
//       })
//     }
//   })
// })

// con.connect(function (err) {
//   if (err) throw err;
//   con.query("SELECT * FROM users", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

const path = __dirname + '/views/';
const port = 8080;

router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
});

router.get('/', function (req, res) {
    res.sendFile(path + 'index.html');
});

router.get('/sharks', function (req, res) {
    res.sendFile(path + 'sharks.html');
});

router.get("/url", (req, res, next) => {
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        res.json([result]);
    });
});

router.get("/ping", (req, res, next) => {
    var target = "192.168.31.89";
    var session = ping.createSession();


    session.pingHost(target, function (error, target) {
        if (error)
            res.json("offline");
        else
            res.json("online");
    });


});

app.use(express.static(path));
app.use('/', router);

var target = "192.168.31.89";
var session = ping.createSession();

setInterval(function(str1, str2) {
    session.pingHost(target, function (error, target) {
        var date = new Date();
        if (error)
            console.log(target + ": " + error.toString() + date);
        else
            console.log(target + ": Alive" + date);
    });
}, 1000);

app.listen(port, function () {
    var date = new Date();
    console.log('Example app listening on port 8080!' + date)
})

app.listen(8000, 'localhost', function () {
    console.log('Testovaci aplikace on port 8080!')
})