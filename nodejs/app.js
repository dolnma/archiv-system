const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const ping = require("net-ping");
const nodemailer = require('nodemailer');

var con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "root",
    database: "archiv"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

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
    to: 'dolnma9@gmail.com',
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

// // router.post('/send', (req, res, next) => {
// //   var name = "Marek"
// //   var email = "dolnma9@gmail.com"
// //   var message = "Ahoj blázne"
// //   var content = `name: ${name} \n email: ${email} \n message: ${content} `
//
// //   var mail = {
// //     from: name,
// //     to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  //Change to email address that you want to receive messages on
// //     subject: 'New Message from Contact Form',
// //     text: content
// //   }
//
// //   transporter.sendMail(mail, (err, data) => {
// //     if (err) {
// //       res.json({
// //         msg: 'fail'
// //       })
// //     } else {
// //       res.json({
// //         msg: 'success'
// //       })
// //     }
// //   })
// // })
//
// // con.connect(function (err) {
// //   if (err) throw err;
// //   con.query("SELECT * FROM users", function (err, result, fields) {
// //     if (err) throw err;
// //     console.log(result);
// //   });
// // });

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


var sql = "SELECT id,ip FROM `servers` ORDER BY `id`";
con.query(sql, function (err, result) {
    if (err) throw err;

    var serversObj = JSON.stringify(result);
    var objCount = JSON.parse(serversObj);

    let count = 0;

    setInterval(function () {

        for (var i = 0; i < objCount.length; i++) {
            var obj = objCount[i];

            var target = obj['ip'];
            var serverId = obj['id'];
            var session = ping.createSession();

            session.pingHost(target, function (error, target) {

                var date = new Date().toISOString().slice(0, 19).replace('T', ' ');

                var message = target + " je aktivní";
                message.toString();

                if (error) {

                    // const throwNumbers = (count = 0) => {
                    //     console.log(count);
                    //     if (count++ < 10) {
                    //         throwNumbers(count);
                    //     } else {
                    //         console.log('max reached');
                    //     }
                    // };

                    count++;
                    console.log(count);

                    if (count > 20) {
                        count = 0;
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
                    }

                    console.log(target + ": " + error.toString() + date);

                    var sql = "INSERT INTO logs (server_id, message, status, date) VALUES ('1', '" + error.toString() + "', '0', '" + date + "')";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });
                } else {

                    console.log(message);
                    var sql = "INSERT INTO logs (server_id, message, status, date) VALUES ('" + serverId + "', '" + message + "', '1', '" + date + "')";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });
                }
            });

        }

    }, 2000);

});

app.listen(port, function () {
    var date = new Date();
    console.log('Example app listening on port 8080!' + date)
})

app.listen(8000, 'localhost', function () {
    console.log('Testovaci aplikaci on port 8080!')
});