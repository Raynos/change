//***Created by Rohit arora***
//***Dated July 28th 2012***
//***event: hack for change***
//***location: San Francisco***


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
	
	app.get('/webservice/list.json', function(req, res) {
		//if method is GET and URL is /webservice, output list of contactInfo
					exports.getContactInfo(function(body) {
						//body will hold our output
						res.writeHead(200, {
							'Content-Length': body.length,
							'Content-Type': 'text/plain'
						});
						res.end(body);		
					});
	});

	app.post('/webservice/create.json', function(req, res) {
		//if method is POST and URL is webservice/ add selfInfo to the array
					var selfInfo='';
					req.on('data', function(data, selfInfo){
						console.log(data.toString('utf-8'));
						selfInfo=exports.addSelfInfo(data.toString('utf-8'));
						//data is type of Buffer and must be converted to string with encoding UTF-8 first
						//adds activity to the array
					})
					console.log(util.inspect(selfInfo, true, null));
					console.log(util.inspect(webservice, true, null));
					//debugging output into the terminal
					res.writeHead(200, {'Content-Type': 'text/plain'});
					//sets the right header and status code		
					res.end(selfInfo);
					//out put selfInfo, should add object id
	});
	
		exports.addSelfInfo(JSON.stringify({"name":"Andrey"}));
		
exports.getContactInfo = function(callback) {
	new Db ('lobbyMan', new Server(hostMongo,portMongo, {})).open(function (error, client) {
		if (error) throw error;
		var collection = new mongo.Collection(client, 'profile');
		collection.find({}, {limit:100}).toArray(function(err, docs) {
	    	console.dir(docs);
			webservice=docs;

			callback(JSON.stringify(webservice));
		});
	});	
};
		
exports.addSelfInfo = function (data) {
	var str;
	new Db ('hiringBoost', new Server(host,port, {})).open(function (error, client) {
		if (error) throw error;
		var collection = new mongo.Collection(client, 'contacts');
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