// First, import needed Prim+RPC methods
import {
	createPrimClient,
	createPrimServer,
	testing,
} from "@doseofted/prim-rpc"

// SECTION: start server code

/**
 * Define any kind of function to be used with Prim+RPC.
 * This function is used from the server and will just say hello.
 *
 * @param {string} x
 * @param {string} y
 * @returns a nice greeting
 */
function sayHello(x, y) {
	return `${x}, meet ${y}.`
}

// We'll assign an "rpc" property to the function so Prim+RPC knows it's safe to call this function
sayHello.rpc = true

// Let's call our function so we know what to expect.
const expected = sayHello("Backend", "Frontend") // expected === "Backend, meet Frontend."

// We'll create a module that will hold this function to be used directly with Prim+RPC
// (this could be imported from somewhere else but we'll use the function we just defined)
const module = { sayHello }

// Let's create Prim+RPC plugins so the server and client can communicate with each other
const plugins = testing.createPrimTestingPlugins()

// We'll extract the server-side plugins to be used with Prim+RPC
const { callbackHandler, methodHandler } = plugins

// Now we pass the module and plugins to Prim+RPC server
createPrimServer({
	module,
	callbackHandler,
	methodHandler,
})

// !SECTION: end server code

// SECTION: start client code

// Next up is the client. Let's extract the client-side plugins.
const { callbackPlugin, methodPlugin } = plugins

// Now we'll pass those plugins to the Prim+RPC client
// Given "@type" comment is optional and just helps with code-editor suggestions
/** @type {import("@doseofted/prim-rpc").PromisifiedModule<typeof module>} */
const backend = createPrimClient({
	callbackPlugin,
	methodPlugin,
})

// We're done! Let's call our function from the client
const greeting = await backend.sayHello("Backend", "Frontend")

// Now we can log output and compare with expected result from the server
console.log(greeting, greeting === expected)

// !SECTION: end client code
