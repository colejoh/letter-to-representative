var config = require('../config.js');
// var request = require('request');
var request = require('request-promise');

var letter = {
    create: function(req, res) {
        var letter = req.body,
        fromFirstName = letter.firstName,
        fromLastName = letter.lastName,
        fromLineOne = letter.lineOne,
        fromLineTwo = letter.lineTwo,
        fromCity = letter.city,
        fromState = letter.state;
        fromMessage = letter.message;

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


        var options = {
            methond: 'GET',
            uri: query
        }

        request(options).then(function(response){
            var rep = {};
            var parsed = JSON.parse(response);
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
            //res.send(rep);
            console.log(sendLetter(rep));
        }).catch(function(err) {
            res.send(err);
        });

        var sendLetter = function(rep) {
            //console.log(rep);

            return Lob.addresses.create({
                name: rep.name,
                address_line1: rep.lineOne,
                address_city: rep.city,
                address_state: re.state,
                address_zip: rep.zip,
                address_country: 'US',
              })
              .then(function (address) {
                return Lob.postcards.create({
                  description: 'Instagram Postcard Demo',
                  to: address.id,
                  front: '<html>{{message}}</html>',
                  message: req.body.message,
                  data: {
                    message: "Hi"
                  }
                });
              })
              .then(function (postcard) {
                res.render('complete', { url: postcard.url });
              })
              .catch(function (errors){
                res.render('complete', { error: errors.message });
              });

            // Lob.letters.create({
            //     description: 'Letter to Rep',
            //     to: {
            //         name: rep.name,
            //         address_line1: rep.lineOne,
            //         address_line2: rep.lineTwo,
            //         address_city: rep.city,
            //         address_state: rep.state,
            //         address_zip: rep.zip,
            //         address_country: 'US',
            //     },
            //     from: {
            //         name: fromFirstName + fromLastName,
            //         address_line1: fromLineOne,
            //         address_line2: fromLineTwo,
            //         address_city: fromCity,
            //         address_state: fromState,
            //         address_country: 'US',
            //     },
            //     file: '<html style="padding-top: 3in; margin: .5in;">{{message}}</html>',
            //     data: {
            //         message: fromMessage
            //     }
            // }, function(err, res) {
            //     console.log("HIT");
            //     console.log(err, res);
            // });
        };

    }

}

module.exports = letter;
