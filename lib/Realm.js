// https://tc39.github.io/ecma262/#sec-code-realms
function Realm() {
	this.Intrinsics = null
	this.GlobalObject = null
	this.GlobalEnv = null
	this.TemplateMap = null
	this.HostDefined = null
}

module.exports = Realm