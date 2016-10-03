var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var port = 8080;

var config = require('./config.js');
var letter = require('./app/letter.js');
var representative = require('./app/representative.js');



// Sets up angular app
app.use(express.static(__dirname + '/public'));

// bodyParser to use for parsing JSON requests
app.use(bodyParser.json());

// Logs requests
app.use(logger('dev'));

/******************
       ROUTES
 ******************/
app.post('/api/representative', representative.create);
app.post('/api/letter', letter.create);

// Starts server
app.listen(port);
console.log("listening on port " + port + "...");
