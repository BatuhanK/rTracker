var mysqlHelper = require('./mysqlHelper.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var httpPort = require('config').get('httpPort');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();

router.get('/users', function (req, res) {
   mysqlHelper.getLastUsers(function (err, users) {
        if (err) {
            res.status(500).jsonp({ err: "Bir hata oluştu !" });
        } else {
            res.status(200).jsonp({ users : users });
        }
    });
});


app.use('/api', router);


app.listen(httpPort);
console.log("### REST API SERVER STARTED: " + httpPort);