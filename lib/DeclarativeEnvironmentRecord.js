var assert = require('assert')
var NormalCompletion = require('./NormalCompletion')
var TypeError = require('./TypeError')
var ReferenceError = require('./ReferenceError')
var empty = require('./empty')

function DeclarativeEnvironmentRecord() {
	this.binding = {}
}

DeclarativeEnvironmentRecord.prototype.HasBinding = function(N) {
	return this.binding.hasOwnProperty(N)
}

DeclarativeEnvironmentRecord.prototype.CreateMutableBinding = function(N, D) {
	assert(!this.binding.hasOwnProperty(N))
	this.binding[N] = newMutableBinding(N, D)
	return NormalCompletion(empty)
}

DeclarativeEnvironmentRecord.prototype.CreateImmutableBinding = function(N, S) {
	assert(!this.binding.hasOwnProperty(N))
	this.binding[N] = newIMmutableBinding(N, S)
	return NormalCompletion(empty)
}

DeclarativeEnvironmentRecord.prototype.InitializeBinding = function(N, V) {
	assert(this.binding.hasOwnProperty(N))
	var Record = this.binding[N]
	assert(Record.initialized === false)
	Record.value = V
	Record.initialized = true
	return NormalCompletion(empty)
}

DeclarativeEnvironmentRecord.prototype.SetMutableBinding = function(N, V, S) {
	if (!this.binding.hasOwnProperty(N)) {
		if (S === true) {
			throw new ReferenceError()
		}
		this.CreateMutableBinding(N, true)
		this.InitializeBinding(N, V)
		return NormalCompletion(empty)
	}
	var Record = this.binding[N]
	if (Record.strict) {
		S = true
	}
	if (Record.initialized === false) {
		throw new ReferenceError()
	}
	else if (Record.type === 'mutable') {
		Record.value = V
	}
	else {
		// This is an attempt to change the value of an immutable binding.
		// Won't working.
		if (S === true) {
			throw new TypeError()
		}
	}
	return NormalCompletion(empty)
}

DeclarativeEnvironmentRecord.prototype.GetBindingValue = function(N) {
	assert(this.binding.hasOwnProperty(N))
	var Record = this.binding[N]
	if (Record.initialized === false) {
		throw new ReferenceError()
	}
	return Record
}

DeclarativeEnvironmentRecord.prototype.DeleteBinding = function(N) {
	assert(this.binding.hasOwnProperty(N))
	var Record = this.binding[N]
	if (Record.canDelete === false) {
		return false
	}
	else {
		delete this.binding[N]
		return true		
	}
}

DeclarativeEnvironmentRecord.prototype.HasThisBinding = function(N) {
	return false
}

DeclarativeEnvironmentRecord.prototype.HasSuperBinding = function(N) {
	return false
}

DeclarativeEnvironmentRecord.prototype.WithBaseObject = function(N) {
	return false
}

function newMutableBinding(name, canDelete) {
	return {
		type: 'mutable',
		name: name,
		value: undefined,
		canDelete: canDelete,
		initialized: false,
	}
}

function newIMmutableBinding(name, strict) {
	return {
		type: 'immutable',
		name: name,
		value: undefined,
		strict: strict,
		initialized: false,
	}
}

module.exports = DeclarativeEnvironmentRecord