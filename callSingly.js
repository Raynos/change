//***Created by Rohit arora***
//***Dated July 28th, 2012***
//***event: hack for change***
//***location: San Francisco***

// USAGE: node app.js <clientID> <clientSecret> [exampleHost] [apiHost]

var express = require('express');
var querystring = require('querystring');
var request = require('request');
var sprintf = require('sprintf').sprintf;
var OAuth2 = require('oauth').OAuth2;
//server.js code starts
var http = require('http');
var util = require('util');
//var querystring = require('querystring');
var mongo = require('mongodb');

var hostMongo = '127.0.0.1';
var portMongo = 27017;
var collection;
var Db = mongo.Db;
var Server = mongo.Server;

var Connection = mongo.Connection;

var http = require('http');
fs = require('fs');

var db= new mongo.Db('lobbyMan', new mongo.Server(hostMongo,portMongo,{}));

// The port that this express app will listen on
var port = 5000;

// Your client ID and secret from http://dev.singly.com/apps
var clientId = process.argv[2] || '263a8ff0e1f1a4f81c9c6e0fa70646bb';
var clientSecret = process.argv[3] || 'e7008dd306810095dfd8b69401c5dbcb';

var hostBaseUrl = process.argv[4] || 'http://localhost:' + port;
var apiBaseUrl = process.argv[5] || 'https://api.singly.com';

// Pick a secret to secure your session storage
var sessionSecret = '42';

var usedServices = [
  'LinkedIn'
];

var oa = new OAuth2(clientId, clientSecret, apiBaseUrl);

// A convenience method that takes care of adding the access token to requests
function getProtectedResource(path, session, callback) {
  oa.getProtectedResource(apiBaseUrl + path, session.access_token, callback);
}

// Given the name of a service and the array of profiles, return a link to that
// service that's styled appropriately (i.e. show a link or a checkmark).
function getLink(prettyName, profiles, token) {
  var service = prettyName.toLowerCase();

  // If the user has a profile authorized for this service
  if (profiles && profiles[service] !== undefined) {
    // Return a unicode checkmark so that the user doesn't try to authorize it again
    return sprintf('<span class="check">&#10003;</span> <a href="%s/services/%s?access_token=%s">%s</a>', apiBaseUrl, service, token, prettyName);
  }

  // This flow is documented here: http://dev.singly.com/authorization
  var queryString = querystring.stringify({
    client_id: clientId,
      redirect_uri: sprintf('%s/callback', hostBaseUrl),
      service: service
  });

  return sprintf('<a href="%s/oauth/authorize?%s">%s</a>',
      apiBaseUrl,
      queryString,
      prettyName);
}

// Create an HTTP server
var app = express.createServer();

// Setup for the express web framework
app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: sessionSecret
  }));
  app.use(app.router);
});

// We want exceptions and stracktraces in development
app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

// ... but not in production
app.configure('production', function() {
  app.use(express.errorHandler());
});

// Use ejs instead of jade because HTML is easy
app.set('view engine', 'ejs');

	
app.get('/', function(req, res) {
  var i;
  var services = [];

  // For each service in usedServices, get a link to authorize it
  for (i = 0; i < usedServices.length; i++) {
    services.push({
      name: usedServices[i],
      link: getLink(usedServices[i], req.session.profiles, req.session.access_token)
    });
  }

  // Render out views/index.ejs, passing in the array of links and the session
  res.render('index', {
    services: services,
    session: req.session
  });
});

app.get('/callback', function(req, res) {
  var data = {
    client_id: clientId,
  client_secret: clientSecret,
  code: req.param('code')
  };

  // Exchange the OAuth2 code for an access_token
  request.post({
    uri: sprintf('%s/oauth/access_token', apiBaseUrl),
    body: querystring.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, function (err, resp, body) {
    try {
      body = JSON.parse(body);
    } catch(parseErr) {
      return res.send(parseErr, 500);
    }

    // Save the access_token for future API requests
    req.session.access_token = body.access_token;

    // Fetch the user's service profile data
    getProtectedResource('/profiles', req.session, function(err, profilesBody) {
      try {
        profilesBody = JSON.parse(profilesBody);
      } catch(parseErr) {
        return res.send(parseErr, 500);
      }

      req.session.profiles = profilesBody;

	  getProtectedResource('/services/linkedin/self', req.session, function(err, linkedinSelf) {
		try {
	        linkedinSelf = JSON.parse(linkedinSelf);
	      } catch(parseErr) {
	        return res.send(parseErr, 500);
	      }
	      
			// Save linkedinSelf to mongodb
			
//		  exports.addSelfInfo(linkedinSelf);
		exports.addSelfInfo(linkedinSelf);
	
	      console.log('linkedin', util.inspect(linkedinSelf));
	
	      res.redirect('/');
	  });
    });
  });
});

db.open( function(error, client) {
	if (error) throw error;

	collection = new mongo.Collection(client, 'profile');

	app.listen(port);

	console.log(sprintf('Listening at %s using API endpoint %s.', hostBaseUrl, apiBaseUrl));
});


//};


exports.addSelfInfo = function (data) {
	var str;
	new Db ('lobbyMan', new Server(hostMongo,portMongo, {})).open(function (error, client) {
		if (error) throw error;
		var collection = new mongo.Collection(client, 'profile');
		collection.insert(data, {safe:true}, function(err, objects) {
	    	if (err) console.warn(err.message);
			console.log(objects);
			// str=data;
	    	if (err && err.message.indexOf('E11000 ') !== -1) {
	      		// this _id was already inserted in the database
	    	}
	  });
	});
};
