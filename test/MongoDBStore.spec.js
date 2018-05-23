var MongoDBStore = require('../src/index');
var expect = require('chai').expect;

describe('MongoDBStore API', () => {

	var payload = {a: 1, b: 2, c: 3};

	it ('Has setItem', () => {
		var result1 = false;

		MongoDBStore.setItem('test', payload)
			.then(function() {
				console.log('setItem ok');
				this.result1 = true;
				})
			.catch(function(err) {
				console.log(err.message);
				});

		expect(result1).to.be.true();
	});

/*
	it ('Has getItem', () => {
		var result2 = null;
		var _this = this;

		MongoDBStore.getItem('test')
			.then((doc) => {
				console.log(' getItem ok = ' + doc);
				_this.result2 = doc;
				})
			.catch((err) => {
				console.log(err.message);
				});

		expect(result2).to.equal(payload);
	});
*/

});
