function LexicalEnvironment() {
	// EnvironmentRecord
	this.rec = null
	// Outer LexicalEnvironment
	this.outer = null
}

module.exports = LexicalEnvironment