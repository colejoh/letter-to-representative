var config = require('../config.js');
var request = require('request-promise');

var representative = {
    create: function(req, res) {
        var address = req.body;
        //res.send(address);

        var letter = req.body,
        fromFirstName = letter.firstName,
        fromLastName = letter.lastName,
        fromLineOne = letter.lineOne,
        fromLineTwo = letter.lineTwo,
        fromCity = letter.city,
        fromState = letter.state;
        fromMessage = letter.message;

        // Query build
        var urlBase = 'https://www.googleapis.com/civicinfo/v2/representatives?address=';
        var api = '&key=' + config.googleAPIKey;
        var office = '&roles=legislatorLowerBody';
        var urledLineOne = fromLineOne.split(' ').join('+');


        // Logic for determining if there is a second line to the address
        if(typeof fromLineTwo !== 'undefined') {
            var urledLineTwo = fromLineTwo.split(' ').join('+');
            var builtAddress = urledLineOne + '+' + urledLineTwo + '+' + fromCity + '+' + fromState;
        } else {
            var builtAddress = urledLineOne + '+' + fromCity + '+' + fromState;
        }

        var query = urlBase + builtAddress + office + api;


        var options = {
            methond: 'GET',
            uri: query
        }

        request(options).then(function(response){
            var rep = {};
            var parsed = JSON.parse(response);
            var from = parsed.normalizedInput;
            rep.title = parsed.offices[0].name;
            rep.name = parsed.officials[0].name;
            var address = parsed.officials[0].address[0];
            rep.lineOne = address.line1;
            rep.lineTwo = address.line2;
            rep.city = address.city;
            rep.state = address.state;
            rep.zip = address.zip;
            rep.website = parsed.officials[0].urls[0];
            rep.photo = parsed.officials[0].photoUrl;
            rep.social = parsed.officials[0].channels;
            res.send(parsed);
        }).catch(function(err) {
            res.send(err);
        });
    }
};

module.exports = representative;
