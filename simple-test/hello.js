/**
 * Define any kind of function to be used with Prim+RPC.
 * This function is used from the server and will just say hello.
 *
 * @param {string} x
 * @param {string} y
 * @returns a nice greeting
 */
export function sayHello(x, y) {
	return `${x}, meet ${y}.`
}

// We'll assign an "rpc" property to the function so Prim+RPC knows it's safe to call this function
sayHello.rpc = true
