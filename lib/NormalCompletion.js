var Completion = require('./Completion')
var empty = require('./empty')

function NormalCompletion(argument) {
	return new Completion('normal', argument, empty)
}

module.exports = NormalCompletion