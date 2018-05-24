/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import MongoClient from 'mongodb';

let options = {
	url:			'mongodb://localhost:27017/',
	connect_opts:	{useNewUrlParser: true},
	name:			'reduxdb',
	collection:		'state'
};


const MongoDBStore = {

	configure: (opts) => {
		options.url = !opts.url ? options.url : opts.url;
		options.connect_opts = !opts.connect_opts ? options.connect_opts : opts.connect_opts;
		options.name = !opts.name ? options.name : opts.name;
		options.collection = !opts.collection ? options.collection : opts.collection;
	},


	getItem: (key) => {
		return new Promise ((resolve, reject) => {
			try {
				MongoClient.connect(options.url, options.connect_opts, function(err, client) {
					if (err) { throw err;}

					let db = client.db(options.name);
					if (db === null) {throw new Error('No DB!');}

					db.collection(options.collection, (err, collection) => {
						if (err) {throw err;}

						collection.findOne({key}, {bypassDocumentValidation: true}, function(err, result) {
							if (err) {throw err;}
							client.close();
							process.nextTick(() => resolve(result));
							});
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		},


	setItem: (key, value) => {
		return new Promise ((resolve, reject) => {
			try {

				MongoClient.connect(options.url, options.connect_opts, (err, client) => {
	  				if (err) {throw err;}

					let db = client.db(options.name);
					if (db === null) {throw new Error('No DB!');}

					db.collection(options.collection, (err, collection) => {
						if (err) {throw err;}

						collection.replaceOne({key}, {key, value}, {upsert: true}, function(err, result) {
							if (err) {throw err;}
		    				client.close();
							process.nextTick(() => resolve());
		  					});
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		},


	removeItem: (key) => {
		return new Promise ((resolve, reject) => {
			try {
				MongoClient.connect(options.url, options.connect_opts, function(err, client) {
					if (err) { throw err;}

					let db = client.db(options.name);
					if (db === null) {throw new Error('No DB!');}

					db.collection(options.collection, (err, collection) => {
						if (err) {throw err;}

						collection.findOneAndDelete({key}, function(err, result) {
							if (err) {throw err;}
							client.close();
							process.nextTick(() => resolve());
							});
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		}

	};

export default MongoDBStore;
