var MongoDBStore = require('../index');
var expect = require('chai').expect;

describe('MongoDBStore API', function() {

	var payload1 = {a: 1, b: 2, c: 3};
	var payload2 = {a: 4, b: 5, c: 6};

	it ('Can set item', function() {

		MongoDBStore.setItem('test1', payload1)
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can set another item', function() {

		MongoDBStore.setItem('test2', payload2)
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can get item', function() {

		MongoDBStore.getItem('test1')
			.then(function(doc) { expect(doc).to.equal(payload1); })
			.catch(function(err) { done(err); });
		});

	it ('Can change item', function() {

		MongoDBStore.setItem('test1', payload2)
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can get changed item', function() {

		MongoDBStore.getItem('test1')
			.then(function(doc) { expect(doc).to.equal(payload2); })
			.catch(function(err) { done(err); });
		});

	it ('Can remove item', function() {

		MongoDBStore.removeItem('test1')
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

	it ('Can cannot get removed item', function() {

		MongoDBStore.getItem('test1')
			.then(function(doc) { expect(doc).to.be.undefined(); })
			.catch(function(err) { done(err); });
		});

	it ('Can remove another item', function() {

		MongoDBStore.removeItem('test2')
			.then(function() { done(); })
			.catch(function(err) { done(err); });
		});

});
