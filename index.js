module.exports = require('./node_modules/twitter-js-client/lib/Twitter');

var config = require('./config.json');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

// var config = {
//     "consumerKey": "S1hmoF1DBgMn57zlNtqLu2T7D",
//     "consumerSecret": "kyu5M4lW89dAhZtvxy8g3AhQvgDBZmkgUKwthP0klQUenC54ih",
//     "accessToken": "11866-BuBFmfS1RYfAazyQahRq7TUbdE9s4qauQJGFf6rveEla",
//     "accessTokenSecret": "VWRg02KYWg0So1wlWHaMafm1kHjBopzdKnFMpSEnbTraS"
// };

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

app.use(express.static('public'));

//post to retrieve user data
app.post('/twitter/user', function (req, res) {
	var username = req.body.username;
	var data = twitter.getUser({ screen_name: username}, function(error, response, body){
		res.status(404).send({
			"error" : "User Not Found"
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
})
.get('/twitter/trends', function (req, res) {
  var data = twitter.getCustomApiCall('/trends/place.json',{ id: '1'}, function(error, response, body){
    res.status(404).send({
      "error" : "Bad Trend Url"
    });
  }, function(data){
    res.send({
      result : {
        "trendData" : data
      }
    });
  });
});

var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});
