var config = require('../config.js');
var request = require('request-promise');

var representative = {
    create: function(req, res) {
        var letter = req.body,
            fromLineOne = letter.lineOne,
            fromLineTwo = letter.lineTwo,
            fromCity = letter.city,
            fromState = letter.state;

        // Query build
        var urlBase = 'https://www.googleapis.com/civicinfo/v2/representatives?address=',
            api = '&key=' + config.googleAPIKey,
            office = '&roles=legislatorLowerBody',
            urledLineOne = fromLineOne.split(' ').join('+');


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
            res.send(parsed);
        }).catch(function(err) {
            res.send(err);
        });
    }
};

module.exports = representative;
