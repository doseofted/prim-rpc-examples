import { serialize, parse, type CookieSerializeOptions } from "cookie"
import * as session from "./module/session"

const options: CookieSerializeOptions = { httpOnly: true, sameSite: "none", secure: true }

/** Returned context can be accessed from our functions used with Prim+RPC */
export const contextTransform = (req: Request, res?: ResponseInit & { headers: Headers }) => ({
	createSession(id: string) {
		const sessionCookie = serialize("session", id, options)
		res?.headers.set("set-cookie", sessionCookie)
	},
	destroySession() {
		const cookie = parse(req.headers.get("cookie") ?? "")
		const { session } = cookie
		const emptySessionCookie = serialize("session", "", options)
		res?.headers.set("set-cookie", emptySessionCookie)
		return session
	},
	loggedIn() {
		const { session: id } = parse(req.headers.get("cookie") ?? "")
		return session.given(id)
	},
})
export type ServerContext = ReturnType<typeof contextTransform>
