/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
var MongoClient = require('mongodb');

var options = {
	url:			'mongodb://localhost:27017/',
	connect_opts:	{useNewUrlParser: true},
	name:			'reduxdb',
	collection:		'state'
};


var MongoDBStore = {

	configure: function(opts) {
		options.url = !opts.url ? options.url : opts.url;
		options.connect_opts = !opts.connect_opts ? options.connect_opts : opts.connect_opts;
		options.name = !opts.name ? options.name : opts.name;
		options.collection = !opts.collection ? options.collection : opts.collection;
	},


	getItem: function(key) {
		return new Promise (function(resolve, reject) {
			try {
				MongoClient.connect(options.url, options.connect_opts, function(err, client) {
					if (err) { throw err;}

					let db = client.db(options.name);
					if (db === null) {throw new Error('No DB!');}

					db.collection(options.collection, function(err, collection) {
						if (err) {throw err;}

						collection.findOne({key}, {bypassDocumentValidation: true}, function(err, result) {
							if (err) {throw err;}
							client.close();
							process.nextTick(function() {resolve(result);});
							});
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		},


	setItem: function(key, value) {
		return new Promise (function(resolve, reject) {
			try {

				MongoClient.connect(options.url, options.connect_opts, function(err, client) {
	  				if (err) {throw err;}

					let db = client.db(options.name);
					if (db === null) {throw new Error('No DB!');}

					db.collection(options.collection, function(err, collection) {
						if (err) {throw err;}

						collection.replaceOne({key}, {key, value}, {upsert: true}, function(err, result) {
							if (err) {throw err;}
		    				client.close();
							process.nextTick(function() {resolve();});
		  					});
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		},


	removeItem: function(key) {
		return new Promise (function(resolve, reject) {
			try {
				MongoClient.connect(options.url, options.connect_opts, function(err, client) {
					if (err) { throw err;}

					let db = client.db(options.name);
					if (db === null) {throw new Error('No DB!');}

					db.collection(options.collection, function(err, collection) {
						if (err) {throw err;}

						collection.findOneAndDelete({key}, function(err, result) {
							if (err) {throw err;}
							client.close();
							process.nextTick(function() {resolve();});
							});
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		}

	};

module.exports = MongoDBStore;
