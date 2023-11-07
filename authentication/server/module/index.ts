import bcrypt from "bcryptjs"
import * as session from "./session"
import { db } from "./database"
import { createAccountSchema, loginSchema } from "./schema"
import type { CreateAccountOptions, LoginOptions } from "./schema"
import type { ServerContext } from "../context"

export function greeting(this: ServerContext) {
	const user = this.loggedIn()
	return `Hello ${user.name}!`
}
greeting.rpc = true

export async function createAccount(this: ServerContext, options: CreateAccountOptions) {
	let { email, name, password } = createAccountSchema.parse(options)
	const exists = db.data.users.find((user) => user.email === email)
	if (exists) throw new Error("Account already exists")
	password = await bcrypt.hash(password, 12)
	db.data.users.push({ email, name, password })
	await db.write()
	const id = await session.create(email)
	this.createSession(id)
}
createAccount.rpc = true

export async function login(this: ServerContext, options: LoginOptions) {
	const { email, password } = loginSchema.parse(options)
	const user = db.data.users.find((user) => user.email === email)
	if (!user) throw new Error("Please create an account first")
	const correct = await bcrypt.compare(password, user.password)
	if (!correct) throw new Error("Check your password")
	const id = await session.create(email)
	this.createSession(id)
}
login.rpc = true

export async function logout(this: ServerContext) {
	const id = this.destroySession()
	await session.remove(id)
}
logout.rpc = true

const index = () => "Hello from the API!"
index.rpc = true
export default index
