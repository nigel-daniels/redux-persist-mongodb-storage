/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {MongoClient} from 'mongodb';

let options = {
	url: "mongodb://localhost/",
    connect_opts:	{},
    name: "redux-db",
    collection: "state-collection"
};

const MongoDBStore = {

	configure: (opts = options) => {
		this.URL = !process.env.MONGO_URL ? opts.url : process.env.MONGO_URL;
		this.ConnectOpts = !process.env.MONGO_CONNECT ? opts.connectopts : process.env.MONGO_CONNECT;
		this.Name = !process.env.MONGO_DB_NAME ? opts.name : process.env.MONGO_DB_NAME;
		this.Collection = !process.env.MONGO_COLLECTION ? opts.collection : process.env.MONGO_COLLECTION;
		},


	getItem: (key) => {
		return new Promise ((resolve, reject) => {
			try {
				MongoClient.connect(this.URL, this.ConnectOpts, function(err, client) {
					if (err) { throw err;}

					const db = client.db(this.Name);

					const collection = db.collection(this.Collection);

					collection.findOne({key}, {bypassDocumentValidation: true}, function(err, result) {
						if (err) {throw err;}
						client.close();
						process.nextTick(() => resolve(result));
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
				MongoClient.connect(this.URL, this.ConnectOpts, function(err, client) {
	  				if (err) { throw err;}

	  				const db = client.db(this.Name);

					const collection = db.collection(this.Collection);

	  				collection.replaceOne({key, value}, {bypassDocumentValidation: true, upsert: true}, function(err, result) {
						if (err) {throw err;}
	    				client.close();
						process.nextTick(() => resolve());
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
				MongoClient.connect(this.URL, this.ConnectOpts, function(err, client) {
					if (err) { throw err;}

					const db = client.db(this.Name);

					const collection = db.collection(this.Collection);

					collection.findOneandDelete({key}, {bypassDocumentValidation: true}, function(err, result) {
						if (err) {throw err;}
						client.close();
						process.nextTick(() => resolve());
						});
					});
				}
			catch (err)
				{reject(err);}
			});
		}

	}

export default MongoDBStore;
