var Realm = require('./Realm')
var CreateIntrinsics = require('./CreateIntrinsics')

// https://tc39.github.io/ecma262/#sec-createrealm
function CreateRealm() {
	var realmRec = new Realm()
	CreateIntrinsics(realmRec)
	realmRec.GlobalObject = undefined
	realmRec.GlobalEnv = undefined
	realmRec.TemplateMap = undefined
}

module.exports = CreateRealm