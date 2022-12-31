import { createPrimServer } from "@doseofted/prim-rpc"
import { createMethodHandler } from "@doseofted/prim-rpc-plugins/fastify"
import { createCallbackHandler } from "@doseofted/prim-rpc-plugins/ws"
import Fastify from "fastify"
import cors from "@fastify/cors"
import { WebSocketServer } from "ws"

function sayHello(x: string, y: string) {
	return `${x}, meet ${y}.`
}
sayHello.rpc = true
export const module = { sayHello }

const fastify = Fastify()
await fastify.register(cors)
const wss = new WebSocketServer({ server: fastify.server })

createPrimServer({
	module: { sayHello },
	methodHandler: createMethodHandler({ fastify }),
	callbackHandler: createCallbackHandler({ wss }),
})

const address = await fastify.listen({ port: 3001 })
console.log("Serving", address)
