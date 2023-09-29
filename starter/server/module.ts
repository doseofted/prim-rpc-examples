export function sayHello(x = "Backend", y = "Frontend") {
	return `${x}, meet ${y}.`
}
// This property signals to Prim+RPC that this function can be exposed
sayHello.rpc = true
