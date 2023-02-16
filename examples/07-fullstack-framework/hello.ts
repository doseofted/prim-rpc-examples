/**
 * Define some function to be called from the client with Prim+RPC.
 * This one says hello.
 */
function sayHello(x: string, y: string) {
	return `${x}, meet ${y}.`
}

// Ensure function is exposed to client by adding the `.rpc` property
sayHello.rpc = true

// NOTE: Using default export with Nuxt since `import * as module from "@/hello.ts"`
// results in error when used with Prim+RPC
export default { sayHello }
