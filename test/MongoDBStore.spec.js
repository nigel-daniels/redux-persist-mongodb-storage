//var MongoDBStore = require('../index');
import MongoDBStore from '../index';
import {expect} from 'chai';

describe('MongoDBStore API', function() {

	let options = {
		url:			'mongodb://localhost:27017/',
		name:			'testdb',
		collection:		'stuff'
	};

	let payload1 = {a: 1, b: 2, c: 3};
	let payload2 = {a: 4, b: 5, c: 6};

	it ('Can configure', function(done) {
		MongoDBStore.configure(options);
		done();
	});

	it ('Can set item', function(done) {

		MongoDBStore.setItem('test1', payload1)
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can set another item', function(done) {

		MongoDBStore.setItem('test2', payload2)
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can get item', function(done) {

		MongoDBStore.getItem('test1')
			.then(function(doc) {
				expect(doc.value).to.include(payload1);
				done();
				})
			.catch(function(err) { done(err); });
		});

	it ('Can change item', function(done) {

		MongoDBStore.setItem('test1', payload2)
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can get changed item', function(done) {

		MongoDBStore.getItem('test1')
			.then(function(doc) {
				expect(doc.value).to.include(payload2);
				done();
				})
			.catch(function(err) { done(err); });
		});

	it ('Can remove item', function(done) {

		MongoDBStore.removeItem('test1')
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can cannot get removed item', function(done) {

		MongoDBStore.getItem('test1')
			.then(function(doc) {
				expect(doc).to.be.null;
				done();
				})
			.catch(function(err) { done(err); });
		});

	it ('Can remove another item', function(done) {

		MongoDBStore.removeItem('test2')
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

});
