var config = require('../config.js');
var request = require('request-promise');
var Lob = require('lob')(config.lobAPIKey);

var letter = {
    create: function(req, res) {
        var repAddress = req.body.googleResponse.officials[0].address[0];
        var userAddress = req.body.googleResponse.normalizedInput;
        var userMessage = letter.message;
        var response = res;

        Lob.letters.create({
            description: 'Letter to Rep',
            to: {
                name: req.body.googleResponse.officials[0].name,
                address_line1: repAddress.line1,
                address_line2: repAddress.line2,
                address_city: repAddress.city,
                address_state: repAddress.state,
                address_zip: repAddress.zip,
                address_country: 'US',
            },
            from: {
                name: req.body.letter.firstName + " " + req.body.letter.lastName,
                address_line1: userAddress.line1,
                address_line2: userAddress.line2,
                address_city: userAddress.city,
                address_state: userAddress.state,
                address_zip: userAddress.zip,
                address_country: 'US',
            },
            file: '<html style="padding-top: 3in; margin: .5in;">{{message}}</html>',
            data: {
                message: letter.message,
            },
            color: true
        }, function(err, res) {
            response.send(res);
        });
    }
}

module.exports = letter;
