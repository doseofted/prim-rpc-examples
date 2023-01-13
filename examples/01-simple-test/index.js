// First, import needed Prim+RPC methods
import {
	createPrimClient,
	createPrimServer,
	testing,
} from "@doseofted/prim-rpc"
// now import your JavaScript code (or inline it into this file, if you like)
import * as module from "./hello"

// SECTION: start server code

// Let's call our function so we know what to expect.
const expected = module.sayHello("Backend", "Frontend") // expected === "Backend, meet Frontend."

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
