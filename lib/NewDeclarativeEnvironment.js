var LexicalEnvironment = require('./LexicalEnvironment')
var DeclarativeEnvironmentRecord = require('./DeclarativeEnvironmentRecord')

function NewDeclarativeEnvironment(E) {
	var env = new LexicalEnvironment()
	var envRec = new DeclarativeEnvironmentRecord()
	env.rec = envRec
	env.outer = E
	return env
}

module.exports = NewDeclarativeEnvironment