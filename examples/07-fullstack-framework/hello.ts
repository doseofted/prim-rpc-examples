/**
 * Define some function to be called from the client with Prim+RPC.
 * This one says hello.
 */
function sayHello(x: string, y: string) {
	return `${x}, meet ${y}.`
}

// Ensure function is exposed to client by adding the `.rpc` property
sayHello.rpc = true

// NOTE: namespace import of this file fails with Nuxt/Prim+RPC so we need to use default import
export default { sayHello }
