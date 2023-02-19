// This is the context that we expect the method handler to provide to our module
// This will be provided over each function's `this` object
export interface SimpleFastifyContext {
	user: string | undefined
	setUser(name: string): void
}

// this is a simple server-side utility ot ensure that we work with correct type
// when sorting multiple function signatures in TypeScript
const server = <T>(given: unknown): given is T => typeof window === "undefined"

// NOTE: we can submit the form element from the client to get an object with its input values
/** Submit a form with an text input named "name" */
export function changeName(given: HTMLFormElement): void
export function changeName(given: { name: string }): void
export function changeName(this: SimpleFastifyContext, given: unknown) {
	if (!server<{ name: string }>(given)) {
		return
	}
	return this.setUser(given.name)
}
changeName.rpc = true

/** Say hello to the name set previously (if not given: "stranger"). */
export function sayHello(): string
export function sayHello(this: SimpleFastifyContext) {
	return `Hello ${this.user ?? "stranger"}.`
}
// Ensure function is exposed to client by adding the `.rpc` property
sayHello.rpc = true
