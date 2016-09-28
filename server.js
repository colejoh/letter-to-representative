var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var logger = require('morgan');
var config = require('./config.js');
var lob = require('lob')(config.lobAPIKey);
var request = require('request');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(logger('dev'));


app.post('/api/', function(req, res) {
    var letter = req.body,
    fromFirstName = letter.firstName,
    fromLastName = letter.lastName,
    fromLineOne = letter.lineOne,
    fromLineTwo = letter.lineTwo,
    fromCity = letter.city,
    fromState = letter.state;

    var urlBase = 'https://www.googleapis.com/civicinfo/v2/representatives?address=';
    var api = '&key=' + config.googleAPIKey;
    var office = '&roles=legislatorLowerBody';
    var urledLineOne = fromLineOne.split(' ').join('+');


    if(typeof fromLineTwo !== 'undefined') {
        var urledLineTwo = fromLineTwo.split(' ').join('+');
        var builtAddress = urledLineOne + '+' + urledLineTwo + '+' + fromCity + '+' + fromState;
    } else {
        var builtAddress = urledLineOne + '+' + fromCity + '+' + fromState;
    }

    var query = urlBase + builtAddress + office + api;
    var rep = {};

    function setRep(parsedBody) {
        console.log(parsedBody);
    }

    function getRep(query, callback) {
        var parsedBody;
        request(query, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                parsedBody = JSON.parse(body);
                console.log(parsedBody);
            }
        });
        setRep(parsedBody);
    }

    getRep(query);


});




// app.require('./app/routes.js')(app);

app.listen(port);
console.log("listening on port " + port + "...");
