import crypto from "node:crypto"
import { db } from "./database"

export async function create(email: string) {
	const id = crypto.randomBytes(16).toString("base64")
	db.data.sessions.push({ email, id })
	await db.write()
	return id
}

export async function remove(session: string) {
	const sessionIndex = db.data.sessions.findIndex(({ id }) => id === session)
	db.data.sessions.splice(sessionIndex, 1)
	await db.write()
}

export function given(session: string) {
	const found = db.data.sessions.find(({ id }) => id === session)
	if (!found) throw new Error("Login required")
	const user = db.data.users.find(({ email }) => email == found.email)
	if (!user) throw new Error("User does not exist for session")
	const { email, name } = user
	return { email, name }
}
