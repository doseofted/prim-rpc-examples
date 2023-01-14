/** This is an imaginary chat app to demonstrate Prim+RPC abilities. */
import events, { Emitter } from "mitt"

interface Message {
	message: string
	from: string
}
type MessageEvents = { send: string; message: Message }
function createChat(room: string) {
	const chat = events<MessageEvents>()
	chats[room] = chat
	return chat
}

const chats: Record<string, Emitter<MessageEvents>> = {}
// Context is provided over chosen the transport channel (see server for implementation)
type ChatContext = {
	setName?: (name: string) => void
	name?: string
}

/**
 * Join a chat. If chat doesn't exist then it will be created.
 *
 * @param room Name of chat that you want to join.
 * @param name Name attached to sender of message
 * @param onMessage Event handler when a message is received in chat
 * @returns whether chat was created or not
 */
export function joinChat(
	this: ChatContext,
	room: string,
	name: string,
	onMessage: (message: Message) => void
) {
	if (!name) {
		throw new Error("You must provide your name to join a chat.")
	}
	this?.setName(name)
	const chat = chats[room] ?? createChat(room)
	chat.on("message", onMessage)
	return !!chat
}

/**
 * Send a message to a joined chat channel. Must `joinChat()` first.
 */
export async function chat(this: ChatContext, room: string, message: string) {
	const joined = chats[room]
	const from = this?.name ?? "Anonymous"
	if (!joined) {
		throw new Error("Room does not exist")
	}
	joined.emit("message", { message, from })
}
