var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var logger = require('morgan');
var config = require('./config.js');
var lob = require('lob')(config.lobAPIKey);
var request = require('request');
var letter = require('./app/letter.js');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(logger('dev'));


app.post('/api/', letter.create);




// app.require('./app/routes.js')(app);

app.listen(port);
console.log("listening on port " + port + "...");
