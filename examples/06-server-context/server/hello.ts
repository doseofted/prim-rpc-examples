export interface Auth {
	user: string | undefined
	setUser(name: string): void
}

const server = <T>(given: unknown): given is T => typeof window === "undefined"
/** Submit a form with an text input named "name" */
export function changeName(given: HTMLFormElement): void
export function changeName(given: { name: string }): void
export function changeName(this: Auth, given: unknown) {
	if (!server<{ name: string }>(given)) {
		return
	}
	return this.setUser(given.name)
}
changeName.rpc = true

/** Say hello to the name set previously (if not given: "stranger"). */
export function sayHello(): string
export function sayHello(this: Auth) {
	return `Hello ${this.user ?? "stranger"}.`
}
// Ensure function is exposed to client by adding the `.rpc` property
sayHello.rpc = true
