/**
 * Define some function to be called from the client with Prim+RPC.
 * This one says hello.
 */
export function sayHello(x: string, y: string) {
	return `${x}, meet ${y}.`
}

// Ensure function is exposed to client by adding the `.rpc` property
sayHello.rpc = true
