var config = require('../config.js');
var request = require('request-promise');
var Lob = require('lob')(config.lobAPIKey);
var fs = require('fs')

var letter = {
    create: function(req, res) {
        var repAddress = req.body.googleResponse.officials[0].address[0];
        var userAddress = req.body.googleResponse.normalizedInput;
        var userMessage = req.body.letter.message;
        var response = res;

        // Splits message into parts since lob api can only take data of 500 characters
        // This is such a hack, I know
        var messageArr = userMessage.match(/.{1,499}/g);
        var messageObj = {};
        for(var i = 0; i < messageArr.length; i++) {
            var str = "message_" + i;
            messageObj[str] = messageArr[i];
        }
        //Fills remaining spots
        for(var j = i; j < 20; j++) {
            var str = "message_" + j;
            messageObj[str] = "<div style='display:none'>.</div>";
        }
        console.log(messageObj);

        var template = fs.readFileSync('./app/templates/templates.letter.html').toString();

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
            file: template,
            data: messageObj,
            color: true
        }, function(err, res) {
            if(err != null) {
                console.log(err);
                response.send(err);
            } else {
                console.log(res);
                response.send(res);
            }
        });
    }
}

module.exports = letter;
