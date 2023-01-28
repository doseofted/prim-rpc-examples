import path from "node:path"
import Fastify from "fastify"
import cors from "@fastify/cors"
import staticHost from "@fastify/static"

const fastify = Fastify()
await fastify.register(cors)

const root = path.join(new URL("", import.meta.url).pathname, "..", "dist")
if (process.env.npm_lifecycle_event === "start") {
	await fastify.register(staticHost, { root })
}

function sayHello() {
	return "Hello from server!"
}

fastify.get("/api", (request, reply) => {
	const message = sayHello()
	reply.send(message)
})

// NOTE: Prim+RPC server setup will go here

const address = await fastify.listen({ port: 3001 })
console.log("Server available at", address)
