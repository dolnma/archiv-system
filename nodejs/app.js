const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const ping = require("net-ping");
const nodemailer = require('nodemailer');

var con = mysql.createConnection({
    host: "mysql",
    port: "3306",
    user: "root",
    password: "root",
    database: "archiv"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Pripojení k databázi úspěšné!");
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
    subject: 'Oznámení o výpadku serveru',
    text: 'Byl zjištěn výpadek archivního serveru. Zkontrolujte prosím dostupnost archivních systémů.'
};

const path = __dirname + '/views/';
const port = 8080;


app.use(express.static(path));
app.use('/', router);

let count = 0;

setInterval(function () {

let sql = "SELECT id,ip FROM `servers` ORDER BY `id`";
con.query(sql, function (err, result) {
    if (err) throw err;

    let serversObj = JSON.stringify(result);
    let objCount = JSON.parse(serversObj);

        for (let i = 0; i < objCount.length; i++) {
            let obj = objCount[i];

            let target = obj['ip'];
            let serverId = obj['id'];
            let session = ping.createSession();

            session.pingHost(target, function (error, target) {

                var date = new Date().toISOString().slice(0, 19).replace('T', ' ');

                var message = target + " je aktivní";
                message.toString();

                if (error) {

                    count++;
                    console.log(count);

                    if (count > 100) {
                        count = 0;

                        mailOptions = {
                            from: 'dolnma9@gmail.com',
                            to: 'dolnma9@gmail.com',
                            subject: 'Oznámení o výpadku serveru '+ target +'',
                            text: 'Byl zjištěn výpadek archivního serveru. Zkontrolujte prosím dostupnost archivních systémů.'
                        };

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

});

}, 10000);

app.listen(8000, 'localhost', function () {
    console.log('Systém pro sledování archivních serverů')
});