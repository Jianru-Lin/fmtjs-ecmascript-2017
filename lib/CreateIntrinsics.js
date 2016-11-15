var Record = require('./Record')
var ObjectCreate = require('./ObjectCreate')
var CreateBuiltinFunction = require('./CreateBuiltinFunction')

// https://tc39.github.io/ecma262/#sec-createintrinsics
function CreateIntrinsics(realmRec) {
	var intrinsics = new Record()
	realmRec.Intrinsics = intrinsics
	var objProto = ObjectCreate(null)
	intrinsics['%ObjectPrototype%'] = objProto
	var throwerSteps = null // WHAT?
	var thrower = CreateBuiltinFunction(realmRec, throwerSteps, null)
	var intrinsics['%ThrowTypeError%'] = thrower
	var noSteps = null // WHAT?
	var funcProto = CreateBuiltinFunction(realmRec, noSteps, objProto)
	intrinsics['%FunctionPrototype%'] = funcProto
	thrower.SetPrototypeOf(funcProto)
	AddRestrictedFunctionProperties(funcProto, realmRec)
	// STEP 13. WHAT?
	return intrinsics
}

module.exports = CreateIntrinsics