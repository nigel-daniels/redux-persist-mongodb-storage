/**
 * Copyright 2018 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
import {MongoClient} from 'mongodb';
import db_config from 'db.json';

export class MongoDBStore {

	constructor() {
		this.URL = !process.env.MONGO_URL ? db_config.url : process.env.MONGO_URL;
		this.ConnectOpts = !process.env.MONGO_CONNECT ? db_config.connectopts : process.env.MONGO_CONNECT;
		this.Name = !process.env.MONGO_DB_NAME ? db_config.name : process.env.MONGO_DB_NAME;
		this.Collection = !process.env.MONGO_COLLECTION ? db_config.collection : process.env.MONGO_COLLECTION;
		}


	getItem(key) {
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
		}

	setItem(key, value) {
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
		};

	removeItem(key) {
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
