var assert = require('chai').assert
var NewDeclarativeEnvironment = require('../lib/NewDeclarativeEnvironment')

describe('#NewDeclarativeEnvironment()', function() {
	it('call without error', function() {
		var ret = NewDeclarativeEnvironment()
		assert.isObject(ret)
	})
})